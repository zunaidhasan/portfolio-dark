export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  details: string;
  stack: string[];
  status: 'Flagship' | 'Active' | 'Shipping' | 'Research';
  href: string;
  index: string;
};

export const projects: Project[] = [
  {
    id: 'deshvox',
    name: 'DeshVox',
    tagline: "Bangladesh's first AI-powered cloud call center platform.",
    description:
      'Bilingual (Bangla + English) AI receptionist, bulk voice campaigns, smart IVR, and real-time analytics. Built for Bangladeshi businesses adopting intelligent voice automation.',
    details:
      'A full voice-AI SaaS: human-quality Bangla receptionists that answer, route, and qualify calls 24/7, plus campaign broadcasting and a live operations dashboard.',
    stack: ['Next.js', 'FastAPI', 'Retell AI', 'ElevenLabs', 'Supabase', 'Prisma'],
    status: 'Flagship',
    href: 'https://github.com/zunaidhasan',
    index: '01',
  },
  {
    id: 'legalmate',
    name: 'LegalMate AI',
    tagline: 'Bangla-first smart legal document assistant & AI legal chatbot.',
    description:
      'Understands legal queries in Bangla and English, drafts and explains documents, and grounds answers in legal corpora with retrieval-augmented generation.',
    details:
      'A RAG pipeline over Bangla legal text with a conversational interface, turning dense legal language into clear, actionable guidance for everyday people.',
    stack: ['Python', 'Claude API', 'OpenRouter', 'RAG', 'Streamlit'],
    status: 'Active',
    href: 'https://github.com/zunaidhasan',
    index: '02',
  },
  {
    id: 'maatigyan',
    name: 'MaatiGyan',
    tagline: 'Free soil health reports for smallholder farmers, over WhatsApp.',
    description:
      'Personalized soil health insights delivered in Bangla through WhatsApp, fusing satellite imagery, machine learning, and retrieval-augmented generation.',
    details:
      'Farmers send a location, get back a clear Bangla report with crop-specific recommendations. No app, no forms, just a message.',
    stack: ['Python', 'ML', 'RAG', 'WhatsApp API', 'Satellite Imagery'],
    status: 'Shipping',
    href: 'https://github.com/zunaidhasan',
    index: '03',
  },
  {
    id: 'fiverr-assistant',
    name: 'Fiverr Smart Assistant',
    tagline: 'AI proposal generator, project matcher, and deal intelligence for freelancers.',
    description:
      'Writes tailored proposals, matches freelancers to the right projects, and surfaces deal intelligence, turning hours of manual work into minutes.',
    details:
      'A workflow tool that reads a buyer request, drafts a pitch in the freelancer\'s voice, and scores the opportunity so effort goes where it converts.',
    stack: ['Python', 'LLM Pipelines', 'RAG', 'Automation'],
    status: 'Active',
    href: 'https://github.com/zunaidhasan',
    index: '04',
  },
  {
    id: 'pharmacare',
    name: 'PharmaCare',
    tagline: 'AI-assisted medicine information & care guidance.',
    description:
      'A medication intelligence tool that explains prescriptions, flags interactions, and offers plain-language care guidance, designed for accessibility in everyday language.',
    details:
      'Built to make pharmaceutical information approachable: scan or search a medicine, get clear usage, side effects, and interaction context in return.',
    stack: ['React', 'TypeScript', 'LLM', 'Tailwind'],
    status: 'Shipping',
    href: 'https://github.com/zunaidhasan',
    index: '05',
  },
];

export const skills = [
  'Claude API',
  'OpenAI',
  'ElevenLabs',
  'Retell AI',
  'Next.js',
  'FastAPI',
  'React',
  'TypeScript',
  'Tailwind',
  'Framer Motion',
  'PyTorch',
  'LangChain',
  'Supabase',
  'Pinecone',
  'RAG',
];

export const socials = {
  email: 'connect.zunaid@gmail.com',
  linkedin: 'https://linkedin.com/in/zunaid-ishan',
  github: 'https://github.com/zunaidhasan',
  location: 'Dhaka, Bangladesh',
};
