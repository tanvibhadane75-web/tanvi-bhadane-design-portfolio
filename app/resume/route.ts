import { NextResponse } from 'next/server';
import { profile, resume } from '@/lib/content';

export async function GET() {
  const lines: [string, string][] = [
    [profile.name, ''],
    ['', ''],
    ['Email', profile.email],
    ['Phone', profile.phone],
    ['Location', profile.location],
    ['GitHub', profile.github],
    ['LinkedIn', profile.linkedin],
    ['', ''],
    ['EDUCATION', ''],
    ...resumeLines('education'),
    ['', ''],
    ['INTERNSHIP', ''],
    ...resumeLines('experience'),
    ['', ''],
    ['LEADERSHIP & ACTIVITIES', ''],
    ...resumeLines('leadership'),
    ['', ''],
    ['ACHIEVEMENTS', ''],
    ...resumeLines('achievements'),
  ];

  const text = lines.map(([a, b]) => (b ? `${a}: ${b}` : a)).join('\n');

  return new NextResponse(text, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': 'attachment; filename="Tanvi-Bhadane-Resume.txt"',
    },
  });
}

function resumeLines(key: 'education' | 'experience' | 'leadership' | 'achievements') {
  const lines: [string, string][] = [];
  for (const item of resume[key]) {
    lines.push([[item.title, item.place].filter(Boolean).join(' — '), item.detail], ['', '']);
  }
  return lines;
}
