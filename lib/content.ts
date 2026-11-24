export const profile = {
  name: 'Tanvi Bhadane',
  firstName: 'Tanvi',
  role: 'Engineering graduate — technology, data & design',
  email: 'tanvibhadane75@gmail.com',
  phone: '+91 9356933719',
  linkedin: 'https://www.linkedin.com/in/tanvi-bhadane',
  github: 'https://github.com/tanvibhadane75-web',
  location: 'Pune, India',
};

export const hero = {
  heading: 'A little about me',
  intro: [
    "Hi, I'm Tanvi Bhadane.",
    "I'm an engineering graduate interested in technology, data and design. I enjoy exploring ideas, understanding problems and creating things that bring together logic and creativity.",
  ],
  status:
    'Currently learning data analytics, exploring UI/UX and looking for opportunities to grow, create and learn.',
  sideNote: 'currently exploring → data analytics & ui/ux',
};

export const aboutNotes = [
  {
    label: 'education',
    text: 'B.Tech in Electronics & Telecommunication Engineering — VIIT, Pune.',
    style: 'note-terracotta' as const,
    rotate: '-rotate-2',
  },
  {
    label: 'also education',
    text: 'Diploma in Information Technology — Government Polytechnic, Nashik.',
    style: 'note-yellow' as const,
    rotate: 'rotate-1',
  },
  {
    label: 'experience',
    text: 'Interned as a web development intern — built and shipped real, working things for real people.',
    style: 'paper' as const,
    rotate: '-rotate-2',
  },
  {
    label: 'curiosity no. 1',
    text: 'Data analytics. I like asking questions of messy data until it answers clearly.',
    style: 'note-pink' as const,
    rotate: 'rotate-3',
  },
  {
    label: 'curiosity no. 2',
    text: 'UI/UX and product design — starting every build from the person using it.',
    style: 'note-blue' as const,
    rotate: 'rotate-1',
  },
  {
    label: 'the way i work',
    text: 'Technical problem-solving, patiently. Understand first, then build.',
    style: 'paper' as const,
    rotate: '-rotate-2',
  },
  {
    label: 'design head',
    text: 'Design Head at Institute to Industry Connect (I2IC) — led design initiatives and mentored the team.',
    style: 'note-orange' as const,
    rotate: 'rotate-2',
  },
  {
    label: 'outside the screen',
    text: 'NSS Volunteer — community service, awareness campaigns and environmental initiatives.',
    style: 'note-lime' as const,
    rotate: '-rotate-3',
  },
];

export type DoodleKind = 'strings' | 'ukulele' | 'portrait' | 'palette' | 'sun' | 'book' | 'sparkle';

export const beyond = {
  heading: 'A few things that make me, me.',
  groups: [
    {
      id: 'music',
      label: 'Music',
      annotation: 'Somewhere between a melody and a sketch...',
      items: ['Singing', 'Playing the ukulele'],
      doodle: 'strings' as DoodleKind,
    },
    {
      id: 'art',
      label: 'Art',
      annotation: 'Pencil, paper, patience.',
      items: ['Drawing portraits', 'Sketching', 'Painting'],
      doodle: 'portrait' as DoodleKind,
    },
    {
      id: 'moments',
      label: 'Little moments',
      annotation: 'Collecting little moments.',
      items: [
        'Capturing beautiful sunrises and sunsets',
        'Reading books, especially mythology',
        'Exploring creative things',
      ],
      doodle: 'sun' as DoodleKind,
    },
  ],
  closing: 'Stories, mythology and imagination.',
};

export const currently = [
  {
    index: '01',
    title: 'Learning data analytics',
    text: 'Exploring Python, SQL, data cleaning and visualisation.',
    note: 'slowly but surely',
  },
  {
    index: '02',
    title: 'Exploring UI/UX',
    text: 'Learning about design, visual hierarchy, layouts and user experiences.',
    note: 'every screen is a small argument',
  },
  {
    index: '03',
    title: 'Looking for opportunities',
    text: 'Interested in starting my professional journey in technology, data and design-related roles.',
    note: 'open to ideas',
  },
];

export const skills = [
  {
    group: 'Development',
    note: 'where things get built',
    items: ['Python', 'SQL', 'HTML', 'CSS', 'PHP', 'FastAPI', 'Next.js'],
  },
  {
    group: 'Data & Analytics',
    note: 'where things make sense',
    items: ['Pandas', 'NumPy', 'Matplotlib', 'Data Cleaning', 'Data Analysis', 'PostgreSQL', 'MySQL'],
  },
  {
    group: 'Design',
    note: 'where things feel right',
    items: ['Figma', 'Canva', 'UI Design', 'Typography', 'Layout & Visual Design'],
  },
  {
    group: 'Tools',
    note: 'the quiet helpers',
    items: ['Git', 'GitHub', 'VS Code', 'Excel', 'PowerPoint'],
  },
];

export type Project = {
  number: string;
  title: string;
  description: string;
  contribution: string;
  tags: string[];
  link: string;
  linkLabel: string;
  size: 'large' | 'medium' | 'small';
  coverNote: string;
  coverImage: string;
};

export const projects: Project[] = [
  {
    number: '01',
    title: 'AI Recruiting Agent',
    description:
      'A recruitment assistant that supports resume parsing, candidate skill matching and job description generation.',
    contribution:
      'Designed the end-to-end flow and built the application with Python REST APIs, FastAPI and a Next.js interface backed by Supabase and PostgreSQL.',
    tags: ['Python', 'FastAPI', 'Next.js', 'Supabase', 'PostgreSQL'],
    link: 'https://github.com/tanvibhadane75-web',
    linkLabel: 'View on GitHub',
    size: 'large',
    coverNote: 'a thoughtful match, made easier',
    coverImage: '/project-covers/ai-recruiting.png',
  },
  {
    number: '02',
    title: 'Document Generator',
    description:
      'An application developed to automate Bonafide Certificates, Leaving Certificates and Form 15A generation using student roll numbers.',
    contribution:
      'Built the full web application and database, automating a repetitive college administrative workflow end to end.',
    tags: ['HTML', 'CSS', 'Bootstrap', 'PHP', 'MySQL'],
    link: 'https://github.com/tanvibhadane75-web',
    linkLabel: 'View on GitHub',
    size: 'medium',
    coverNote: 'less repetition, more room to focus',
    coverImage: '/project-covers/document-generator.png',
  },
  {
    number: '03',
    title: 'Smart Biomedical Waste Management System',
    description:
      'A system designed to support biomedical waste tracking, categorisation, QR-based tracking and reporting.',
    contribution:
      'Designed the tracking flow across hospitals, with role-based dashboards for admins, hospital staff and drivers.',
    tags: ['QR Tracking', 'PostgreSQL', 'Dashboards'],
    link: 'https://github.com/tanvibhadane75-web',
    linkLabel: 'View on GitHub',
    size: 'medium',
    coverNote: 'making every handoff count',
    coverImage: '/project-covers/biomedical-waste.png',
  },
  {
    number: '04',
    title: 'CampBurger — Food Ordering App',
    description:
      'A UI/UX project focused on a food ordering experience, including menu navigation, cart and checkout.',
    contribution:
      'Designed a clean, simple mobile ordering flow with a focus on smooth navigation between menu, cart and checkout.',
    tags: ['Figma', 'UI/UX', 'Mobile'],
    link: 'https://github.com/tanvibhadane75-web',
    linkLabel: 'View design',
    size: 'small',
    coverNote: 'a little more delight in every order',
    coverImage: '/project-covers/campburger.png',
  },
];

export const resume = {
  education: [
    {
      title: 'B.Tech — Electronics & Telecommunication Engineering',
      place: 'Vishwakarma Institute of Information Technology, Pune',
      detail: 'CGPA 8.03',
    },
    {
      title: 'Diploma — Information Technology',
      place: 'Government Polytechnic, Nashik',
      detail: '',
    },
  ],
  experience: [
    {
      title: 'Data Analyst Intern',
      place: 'VidyaOps Labs Private Limited',
      detail: 'Cleaned and analysed business data and built dashboards.',
    },
    {
      title: 'Full Stack Web Developer Intern',
      place: 'Creator Research Pvt. Ltd.',
      detail: 'Built and shipped working web features.',
    },
  ],
  leadership: [
    {
      title: 'Design Head',
      place: 'Institute to Industry Connect (I2IC)',
      detail: 'Aug 2024 – Aug 2025 · Led design initiatives, created visual content, mentored team members.',
    },
    {
      title: 'NSS Volunteer',
      place: 'National Service Scheme',
      detail: 'Sep 2023 – Sep 2025 · Community service, awareness campaigns, environmental initiatives.',
    },
    {
      title: 'Volunteer',
      place: 'Regional Industry Summit 2024 (DSCI, IFCCI, IGCC)',
      detail: 'Hyatt Regency Pune — industry-academia event.',
    },
  ],
  achievements: [
    { title: '1st Prize — VISHWACON 2024', place: 'AGRITECH Conclave (International Conference, VIT Pune)', detail: 'IoT Smart Cow Management — real-time livestock monitoring using RFID and ESP8266.' },
  ],
};

export const contact = {
  heading: "Have something in mind? Let's connect.",
  closingNote: 'Thanks for reading this far — it means a lot.',
};
