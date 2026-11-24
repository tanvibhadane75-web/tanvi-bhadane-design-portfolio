import { NextResponse } from 'next/server';
import { achievements, extracurricularActivities, profile, resume } from '@/lib/content';

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
    ...resumeLines(resume.education),
    ['', ''],
    ['INTERNSHIP', ''],
    ...resumeLines(resume.experience),
    ['', ''],
    ['ACHIEVEMENTS', ''],
    ...resumeLines(achievements),
    ['', ''],
    ['EXTRACURRICULAR ACTIVITIES', ''],
    ...resumeLines(extracurricularActivities),
  ];

  const text = lines.map(([a, b]) => (b ? `${a}: ${b}` : a)).join('\n');

  return new NextResponse(text, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': 'attachment; filename="Tanvi-Bhadane-Resume.txt"',
    },
  });
}

function resumeLines(items: { title: string; place: string; detail: string; link?: string }[]) {
  const lines: [string, string][] = [];
  for (const item of items) {
    lines.push([[item.title, item.place].filter(Boolean).join(' — '), item.detail], ['', '']);
    if (item.link) lines.push([item.link, ''], ['', '']);
  }
  return lines;
}
