'use client';

import { useCallback, useLayoutEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent, type PointerEvent } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { wallPhotos, type WallPhoto } from '@/lib/photo-wall';

type Position = { x: number; y: number };
type Layout = 'desktop' | 'mobile';
type Positions = Record<string, Position>;

const DRAG_THRESHOLD = 6;
const KEYBOARD_STEP = 2;

const sizeClasses: Record<WallPhoto['size'], string> = {
  large: 'w-[8.5rem] md:w-[clamp(11rem,20vw,15rem)]',
  medium: 'w-[7.5rem] md:w-[clamp(9.5rem,15vw,12rem)]',
  small: 'w-[6.75rem] md:w-[clamp(8rem,12vw,10rem)]',
  wide: 'w-[10.5rem] md:w-[clamp(12rem,22vw,17rem)]',
};

const aspectClasses: Record<WallPhoto['aspect'], string> = {
  portrait: 'aspect-[4/5]',
  square: 'aspect-square',
  landscape: 'aspect-[16/9]',
};

function subscribeToLayout(callback: () => void) {
  const query = window.matchMedia('(min-width: 768px)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

function useLayout(): Layout {
  return useSyncExternalStore(
    subscribeToLayout,
    () => (window.matchMedia('(min-width: 768px)').matches ? 'desktop' : 'mobile'),
    () => 'desktop',
  );
}

function initialPositions(layout: Layout): Positions {
  return Object.fromEntries(wallPhotos.map((photo) => [photo.id, photo[layout]]));
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

export function PhotoWall() {
  const layout = useLayout();
  const [positionsByLayout, setPositionsByLayout] = useState<Record<Layout, Positions>>(() => ({
    desktop: initialPositions('desktop'),
    mobile: initialPositions('mobile'),
  }));
  const [order, setOrder] = useState(() => wallPhotos.map((photo) => photo.id));
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [activePhoto, setActivePhoto] = useState<WallPhoto | null>(null);

  const wallRef = useRef<HTMLDivElement>(null);
  const photoRefs = useRef(new Map<string, HTMLDivElement>());
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dragRef = useRef<{ id: string; pointerId: number; startX: number; startY: number; originLeft: number; originTop: number; moved: boolean } | null>(null);

  const positions = positionsByLayout[layout];

  const setPosition = useCallback(
    (id: string, position: Position) => {
      setPositionsByLayout((current) => ({ ...current, [layout]: { ...current[layout], [id]: position } }));
    },
    [layout],
  );

  const clampToWall = useCallback((id: string, left: number, top: number): Position | null => {
    const wall = wallRef.current;
    const photo = photoRefs.current.get(id);
    if (!wall || !photo) return null;
    const clampedLeft = clamp(left, 0, wall.clientWidth - photo.offsetWidth);
    const clampedTop = clamp(top, 0, wall.clientHeight - photo.offsetHeight);
    return { x: (clampedLeft / wall.clientWidth) * 100, y: (clampedTop / wall.clientHeight) * 100 };
  }, []);

  useLayoutEffect(() => {
    const wall = wallRef.current;
    if (!wall) return;

    const keepPhotosInside = () => {
      setPositionsByLayout((current) => {
        let changed = false;
        const next = { ...current[layout] };
        for (const photo of wallPhotos) {
          const element = photoRefs.current.get(photo.id);
          const position = next[photo.id];
          if (!element || !position) continue;
          const clamped = clampToWall(photo.id, (position.x / 100) * wall.clientWidth, (position.y / 100) * wall.clientHeight);
          if (clamped && (Math.abs(clamped.x - position.x) > 0.05 || Math.abs(clamped.y - position.y) > 0.05)) {
            next[photo.id] = clamped;
            changed = true;
          }
        }
        return changed ? { ...current, [layout]: next } : current;
      });
    };

    keepPhotosInside();
    const observer = new ResizeObserver(keepPhotosInside);
    observer.observe(wall);
    return () => observer.disconnect();
  }, [layout, clampToWall]);

  function bringToFront(id: string) {
    setOrder((current) => [...current.filter((item) => item !== id), id]);
  }

  function openPhoto(photo: WallPhoto) {
    setActivePhoto(photo);
    dialogRef.current?.showModal();
  }

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>, id: string) {
    if (event.button !== 0) return;
    const photo = photoRefs.current.get(id);
    if (!photo) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originLeft: photo.offsetLeft,
      originTop: photo.offsetTop,
      moved: false,
    };
    bringToFront(id);
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.moved) {
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
      drag.moved = true;
      setDraggingId(drag.id);
    }
    const next = clampToWall(drag.id, drag.originLeft + dx, drag.originTop + dy);
    if (next) setPosition(drag.id, next);
  }

  function handlePointerUp(event: PointerEvent<HTMLButtonElement>, photo: WallPhoto) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setDraggingId(null);
    if (!drag.moved) openPhoto(photo);
  }

  function handlePointerCancel() {
    dragRef.current = null;
    setDraggingId(null);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, id: string) {
    const deltas: Record<string, [number, number]> = {
      ArrowLeft: [-KEYBOARD_STEP, 0],
      ArrowRight: [KEYBOARD_STEP, 0],
      ArrowUp: [0, -KEYBOARD_STEP],
      ArrowDown: [0, KEYBOARD_STEP],
    };
    const delta = deltas[event.key];
    const wall = wallRef.current;
    if (!delta || !wall) return;
    event.preventDefault();
    bringToFront(id);
    const current = positions[id];
    const next = clampToWall(id, ((current.x + delta[0]) / 100) * wall.clientWidth, ((current.y + delta[1]) / 100) * wall.clientHeight);
    if (next) setPosition(id, next);
  }

  return (
    <div className="relative">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div className="photo-wall-hint font-hand text-xl">Pick up a memory and move it around <span aria-hidden="true">✿</span></div>
        <p id="photo-wall-help" className="sr-only">
          Drag a photograph to move it. On a keyboard, focus a photograph and use the arrow keys to move it, or press Enter to enlarge it.
        </p>
      </div>

      <div
        ref={wallRef}
        className="photo-wall relative h-[46rem] w-full rounded-sm md:h-[41rem]"
        role="group"
        aria-label="Scrapbook wall of photographs of Tanvi"
        aria-describedby="photo-wall-help"
      >
        <WallDoodles />

        {wallPhotos.map((photo) => {
          const position = positions[photo.id];
          const isDragging = draggingId === photo.id;
          return (
            <div
              key={photo.id}
              ref={(element) => {
                if (element) photoRefs.current.set(photo.id, element);
                else photoRefs.current.delete(photo.id);
              }}
              className={`absolute ${sizeClasses[photo.size]}`}
              style={{ left: `${position.x}%`, top: `${position.y}%`, zIndex: order.indexOf(photo.id) + 1 }}
            >
              <ScrapbookPhoto
                photo={photo}
                isDragging={isDragging}
                onPointerDown={(event) => handlePointerDown(event, photo.id)}
                onPointerMove={handlePointerMove}
                onPointerUp={(event) => handlePointerUp(event, photo)}
                onPointerCancel={handlePointerCancel}
                onKeyDown={(event) => handleKeyDown(event, photo.id)}
                onKeyboardOpen={() => openPhoto(photo)}
              />
            </div>
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        className="photo-lightbox"
        aria-label={activePhoto ? `Enlarged photo: ${activePhoto.alt}` : 'Enlarged photo'}
        onClose={() => setActivePhoto(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        {activePhoto ? (
          <figure className="photo-lightbox-frame relative">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="absolute -right-3 -top-3 z-10 grid size-11 place-items-center rounded-full bg-[#34312f] text-[#f5efe5] shadow-lg transition-colors hover:bg-[#b77c64] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E9D18E]"
              aria-label="Close photo and return to the scrapbook wall"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
            <div className="relative h-[min(72svh,42rem)] w-[min(86vw,40rem)] bg-[#d5cec5]">
              <Image src={activePhoto.src} alt={activePhoto.alt} fill sizes="(max-width: 768px) 86vw, 640px" className="object-contain" />
            </div>
            {activePhoto.caption ? (
              <figcaption className="pt-3 text-center font-hand text-xl text-[#34312f]">{activePhoto.caption}</figcaption>
            ) : null}
          </figure>
        ) : null}
      </dialog>
    </div>
  );
}

type ScrapbookPhotoProps = {
  photo: WallPhoto;
  isDragging: boolean;
  onPointerDown: (event: PointerEvent<HTMLButtonElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLButtonElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLButtonElement>) => void;
  onPointerCancel: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  onKeyboardOpen: () => void;
};

export function ScrapbookPhoto({ photo, isDragging, onPointerDown, onPointerMove, onPointerUp, onPointerCancel, onKeyDown, onKeyboardOpen }: ScrapbookPhotoProps) {
  const dragTilt = photo.rotation >= 0 ? 3 : -3;
  return (
    <button
      type="button"
      className={`wall-photo group block w-full text-left ${isDragging ? 'is-dragging' : ''}`}
      style={{ '--rot': `${photo.rotation}deg`, '--drag-tilt': `${dragTilt}deg` } as React.CSSProperties}
      aria-label={`${photo.alt}. Drag to move, press Enter to enlarge.`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onKeyDown={onKeyDown}
      onClick={(event) => {
        if (event.detail === 0) onKeyboardOpen();
      }}
      onDragStart={(event) => event.preventDefault()}
    >
      <PhotoAttachment photo={photo} />
      <span className={`wall-photo-frame block bg-[#fffaf1] ${photo.torn ? 'torn-edge' : 'paper-edge'} ${photo.size === 'small' ? 'p-2 pb-3' : 'p-2.5 pb-4 md:p-3 md:pb-5'}`}>
        <span className={`relative block overflow-hidden bg-[#d5cec5] ${aspectClasses[photo.aspect]}`}>
          <Image src={photo.src} alt="" fill draggable={false} sizes="(max-width: 768px) 45vw, 260px" className="pointer-events-none select-none object-cover" />
        </span>
        {photo.caption ? (
          <span className="block pt-2 text-center font-hand text-sm leading-tight text-[#34312f] md:text-lg">{photo.caption}</span>
        ) : null}
      </span>
      {photo.label ? (
        <span className={`wall-label wall-tone-${photo.label.tone} note-edge absolute -bottom-3 left-3 rotate-[-4deg] px-2.5 py-1 font-hand text-sm leading-none text-[#34312f] md:text-base`}>
          {photo.label.text}
        </span>
      ) : null}
    </button>
  );
}

function PhotoAttachment({ photo }: { photo: WallPhoto }) {
  switch (photo.attachment) {
    case 'tape':
      return <span className={`wall-tape wall-tone-${photo.accent}`} aria-hidden="true" />;
    case 'pin':
      return <span className={`wall-pin wall-tone-${photo.accent}`} aria-hidden="true" />;
    case 'clip':
      return <span className="paper-clip -top-4 right-5" aria-hidden="true" />;
    case 'corners':
      return (
        <span aria-hidden="true">
          <span className={`wall-corner wall-corner-tl wall-tone-${photo.accent}`} />
          <span className={`wall-corner wall-corner-tr wall-tone-${photo.accent}`} />
          <span className={`wall-corner wall-corner-bl wall-tone-${photo.accent}`} />
          <span className={`wall-corner wall-corner-br wall-tone-${photo.accent}`} />
        </span>
      );
  }
}

function WallDoodles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <span className="flower-sticker absolute left-[46%] top-[56%] rotate-12" />
      <span className="absolute left-[18%] top-[6%] font-hand text-3xl text-[#E9D18E]">✦</span>
      <span className="absolute right-[4%] top-[3%] font-hand text-2xl text-[#D9AEB2]">✿</span>
      <span className="absolute bottom-[6%] left-[6%] font-hand text-3xl text-[#A8B8A0]">✳</span>
      <span className="absolute bottom-[10%] right-[8%] font-hand text-2xl text-[#A9BBD0]">☆</span>
      <span className="absolute left-[62%] top-[24%] hidden font-hand text-2xl text-[#C8B6D8] md:block">✧</span>
      <svg className="absolute bottom-[18%] right-[22%] hidden h-14 w-24 text-[#D9B7A5] md:block" viewBox="0 0 96 56" fill="none">
        <path d="M4 44c14-26 30-30 40-14s26 14 34-6 14-12 14-12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 5" />
      </svg>
    </div>
  );
}
