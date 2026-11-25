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
  heading: "Hello, I'm Tanvi!",
  intro: [
    "Hello, I'm Tanvi!",
    'A curious mind, a creative heart.',
    'I\'m an Electronics and Telecommunication engineering graduate drawn to design, technology and creative problem-solving. I enjoy understanding a challenge and turning ideas into clear, useful digital experiences.',
  ],
  status:
    'Currently learning data analytics, exploring UI/UX and looking for opportunities to grow, create and learn.',
  sideNote: 'currently exploring → data analytics & ui/ux',
};

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
    group: 'Design',
    note: 'where things feel right',
    items: ['Figma', 'Canva', 'UI Design', 'Typography', 'Layout', 'Visual Design'],
  },
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
    group: 'Tools',
    note: 'the quiet helpers',
    items: ['Git', 'GitHub', 'VS Code', 'Excel', 'PowerPoint'],
  },
];

export type Project = {
  slug: string;
  number: string;
  title: string;
  description: string;
  contribution: string;
  tags: string[];
  link?: string;
  linkLabel?: string;
  futureScope?: string;
  size: 'large' | 'medium' | 'small';
  coverNote: string;
  coverImage: string;
};

export const projects: Project[] = [
  {
    slug: 'ai-recruiting-agent',
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
    slug: 'campburger-food-ordering',
    number: '02',
    title: 'CampBurger — Food Ordering App',
    description:
      'A UI/UX project focused on a food ordering experience, including menu navigation, cart and checkout.',
    contribution:
      'Designed a clean, simple mobile ordering flow with a focus on smooth navigation between menu, cart and checkout.',
    tags: ['Figma', 'UI/UX', 'Mobile'],
    link: 'https://www.figma.com/design/6dlNjMgQ3ocnTB9AhGPBCf/Camp-Burger',
    linkLabel: 'View in Figma',
    size: 'small',
    coverNote: 'a little more delight in every order',
    coverImage: '/project-covers/campburger.png',
  },
  {
    slug: 'biomedical-waste-management',
    number: '03',
    title: 'Smart Biomedical Waste Management System',
    description:
      'Problem solved: Hospitals needed a reliable, traceable way to track biomedical waste instead of handling it manually. What we did: Developed a web-based portal for biomedical waste tracking across hospitals, using QR codes and a PostgreSQL database to store and manage data.',
    contribution:
      'Built role-based dashboards for administrators, hospital staff and drivers.',
    futureScope:
      'Add real-time alerts, compliance reports and analytics, and scale the portal to more hospitals.',
    tags: ['Python', 'REST APIs', 'PostgreSQL', 'QR Code Integration', 'Vercel'],
    size: 'medium',
    coverNote: 'making every handoff count',
    coverImage: '/project-covers/biomedical-waste.png',
  },
  {
    slug: 'document-generator',
    number: '04',
    title: 'Document Generator',
    description:
      'An application developed to automate Bonafide Certificates, Leaving Certificates and Form 15A generation using student roll numbers.',
    contribution:
      'Built the full web application and database, automating a repetitive college administrative workflow end to end.',
    tags: ['HTML', 'CSS', 'Bootstrap', 'PHP', 'MySQL'],
    link: 'https://github.com/Student-section-project/DocumentGenerator',
    linkLabel: 'View on GitHub',
    size: 'medium',
    coverNote: 'less repetition, more room to focus',
    coverImage: '/project-covers/document-generator.png',
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
};

export const achievements = [
  {
    title: '1st Prize — AGRITECH Conclave, VISHWACON 2024',
    place: 'International Conference, VIT Pune',
    detail: 'Awarded for developing an IoT-based Smart Cow Management System using RFID and ESP8266 for real-time livestock monitoring.',
    link: 'https://drive.google.com/drive/folders/1tG0uOb93VRGdlj6I4SdWpd1Lzx9tUyIy',
    linkLabel: 'View certificate',
  },
];

export const extracurricularActivities = [
  {
    title: 'Institute to Industry Connect (I2IC)',
    place: 'Design Lead · Aug 2024 – Aug 2025',
    detail: '',
    link: 'https://drive.google.com/drive/folders/14wdhiFQqTvImUAysPUN7NcKWKJSci0D_',
    linkLabel: 'View certificate',
  },
  {
    title: 'National Service Scheme (NSS)',
    place: 'Volunteer · Sep 2023 – Sep 2025',
    detail: '',
  },
  {
    title: 'Regional Industry Summit 2024',
    place: 'Volunteer · DSCI, IFCCI, IGCC · Hyatt Regency Pune',
    detail: '',
    link: 'https://drive.google.com/drive/folders/1_BWDL-IEHLx5IOc1-s9U_rHMgDujkx3s',
    linkLabel: 'View certificate',
  },
];

export const contact = {
  heading: "Have something in mind? Let's connect.",
  closingNote: 'Thanks for reading this far — it means a lot.',
};
