export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  details: string;
  stack: string[];
  status: 'Flagship' | 'Active' | 'Shipping' | 'Research';
  accent: string;

  accentAlt?: string;
  href: string;
  index: string;
  metrics?: string[];
  github?: string;
  live?: string;
  architecture?: string[];
  hasAudioDemo?: boolean;
  whatsappMock?: { sender: 'farmer' | 'bot'; time: string; text: string }[];
};

export const projects: Project[] = [
  {
    id: 'deshvox',
    name: 'DeshVox',
    tagline: "Bangladesh's first AI-powered cloud call center platform.",
    description:
      'Bilingual (Bangla + English) AI receptionist, bulk voice campaigns, smart IVR, and real-time analytics. Built for Bangladeshi businesses adopting intelligent voice automation.',
    details:
      'A full voice-AI SaaS: human-quality Bangla receptionists that answer, route, and qualify calls 24/7, plus campaign broadcasting and a live operations dashboard. It handles high concurrent call volumes and leverages low-latency WebSocket streaming.',
    stack: ['Next.js', 'FastAPI', 'Retell AI', 'ElevenLabs', 'Supabase', 'Prisma'],
    status: 'Flagship',
    accent: '#5eada6',
    accentAlt: '#73cbc2',
    href: 'https://github.com/zunaidhasan/portfolio-dark', // custom repo or live link
    index: '01',
    metrics: [
      'Handled 1,200+ concurrent automated calls',
      '<800ms average bilingual response latency',
      '94% customer inquiry resolution rate'
    ],
    github: 'https://github.com/zunaidhasan',
    live: 'https://zunaid.bro.bd/#work',
    architecture: [
      'Real-time WebSocket streaming with Retell AI client interfaces',
      'Bilingual Speech-to-Text (ASR) with custom language model fine-tuning',
      'FastAPI event routing and state-machine agent orchestrations',
      'Dynamic ElevenLabs Multilingual voice synthesis & cloning API'
    ],
    hasAudioDemo: true,
  },
  {
    id: 'legalmate',
    name: 'LegalMate AI',
    tagline: 'Bangla-first smart legal document assistant & AI legal chatbot.',
    description:
      'Understands legal queries in Bangla and English, drafts and explains documents, and grounds answers in legal corpora with retrieval-augmented generation.',
    details:
      'A RAG pipeline over Bangla legal text with a conversational interface, turning dense legal language into clear, actionable guidance for everyday people. It resolves semantic nuances unique to Bangladeshi legal drafts and courts.',
    stack: ['Python', 'Claude API', 'OpenRouter', 'RAG', 'Streamlit'],
    status: 'Active',
    accent: '#8b7cf6',
 
    accentAlt: '#a99bff',
    href: 'https://github.com/zunaidhasan',
    index: '02',
    metrics: [
      'Indexed 5,000+ Bangladeshi supreme court rulings',
      '92% accuracy in legal draft clause generation',
      'Response times cut from minutes to under 4 seconds'
    ],
    github: 'https://github.com/zunaidhasan',
    live: 'https://github.com/zunaidhasan',
    architecture: [
      'Text extraction and chunking optimization of dense PDF rulings',
      'OpenAI text-embedding-3 vectors indexed inside Pinecone vector database',
      'RAG pipeline utilizing Claude-3.5-Sonnet on OpenRouter',
      'Bangla language localization layer for specialized legal terms'
    ]
  },
  {
    id: 'maatigyan',
    name: 'MaatiGyan',
    tagline: 'Free soil health reports for smallholder farmers, over WhatsApp.',
    description:
      'Personalized soil health insights delivered in Bangla through WhatsApp, fusing satellite imagery, machine learning, and retrieval-augmented generation.',
    details:
      'Farmers send a location, get back a clear Bangla report with crop-specific recommendations. No app downloads, no complicated registration forms, just a single chat message.',
    stack: ['Python', 'ML', 'RAG', 'WhatsApp API', 'Satellite Imagery'],
    status: 'Shipping',
    accent: '#7cc576',
 
    accentAlt: '#9bd98f',
    href: 'https://github.com/zunaidhasan',
    index: '03',
    metrics: [
      'Delivered automated soil reports to 800+ smallholder farmers',
      'Zero-app installation friction utilizing simple WhatsApp interface',
      'Empowered agricultural yield optimization by an estimated 15%'
    ],
    github: 'https://github.com/zunaidhasan',
    live: 'https://github.com/zunaidhasan',
    architecture: [
      'Twilio API for WhatsApp integration as the serverless gateway',
      'Sentinel-2 Satellite Image processing for crop-health spectral data',
      'Custom soil-nutrient prediction model trained on national datasets',
      'GPT-4o localized compiler to output clear, simplified Bangla recommendations'
    ],
    whatsappMock: [
      { sender: 'farmer', time: '10:42 AM', text: 'আসসালামু আলাইকুম, আমি ধামরাই থেকে বলছি। আমার জমির মাটির পরীক্ষার রিপোর্ট প্রয়োজন। অবস্থান: 23.92, 90.21' },
      { sender: 'bot', time: '10:43 AM', text: 'ওয়া আলাইকুম আসসালাম। মাতিজ্ঞান (MaatiGyan) এ আপনাকে স্বাগতম! \n\nআপনার জমির (ধামরাই উপজেলা) মাটির স্যাটেলাইট স্বাস্থ্য রিপোর্ট বিশ্লেষণ করা হয়েছে:\n\n🌾 ফসলের উপযুক্ততা:\n১. আমন ধান (উচ্চ উপযোগী)\n২. সরিষা (মাঝারি উপযোগী)\n\n🧪 পুষ্টির মাত্রা:\n- নাইট্রোজেন (N): স্বাভাবিক\n- ফসফরাস (P): কম (অনুমোদিত: বিঘা প্রতি ১২ কেজি TSP)\n- পটাশিয়াম (K): পর্যাপ্ত\n\n💧 আর্দ্রতার পরিমাণ: ৪৩% (সেচের জন্য অনুকূল সময়)।' }
    ]
  },
  {
    id: 'fiverr-assistant',
    name: 'Fiverr Smart Assistant',
    tagline: 'AI proposal generator, project matcher, and deal intelligence for freelancers.',
    description:
      'Writes tailored proposals, matches freelancers to the right projects, and surfaces deal intelligence, turning hours of manual work into minutes.',
    details:
      'A workflow automation tool that reads incoming project briefs, drafts a pitch matching the freelancer\'s specific voice, historical wins, and skills, and scores the conversion likelihood.',
    stack: ['Python', 'LLM Pipelines', 'RAG', 'Automation'],
    status: 'Active',
    accent: '#e8b04b',
 
    accentAlt: '#f2c76e',
    href: 'https://github.com/zunaidhasan',
    index: '04',
    metrics: [
      'Saved 4.5 hours of manual screening and proposal writing daily',
      '62% response rate increase from prospective buyers',
      'Smart opportunity scoring prevents effort on low-convert tasks'
    ],
    github: 'https://github.com/zunaidhasan',
    live: 'https://github.com/zunaidhasan',
    architecture: [
      'Background task worker polling project streams dynamically',
      'Few-shot LLM prompts trained on successful conversion templates',
      'Dynamic resume-matching vector lookups to inject perfect case-studies',
      'Automated desktop alerting system built with custom Python hooks'
    ]
  },
  {
    id: 'pharmacare',
    name: 'PharmaCare',
    tagline: 'AI-assisted medicine information & care guidance.',
    description:
      'A medication intelligence tool that explains prescriptions, flags interactions, and offers plain-language care guidance, designed for accessibility in everyday language.',
    details:
      'Built to make pharmaceutical information approachable: scan or search a medicine, get clear usage, side effects, and interaction context in return. Supports handwritten prescription analysis with OCR pipelines.',
    stack: ['React', 'TypeScript', 'LLM', 'Tailwind'],
    status: 'Shipping',
    accent: '#66a7f0',
 
    accentAlt: '#8cc0f7',
    href: 'https://github.com/zunaidhasan',
    index: '05',
    metrics: [
      'Indexed 12,000+ local and international medicine brand databases',
      '95% accuracy in detecting complex drug-to-drug interactions',
      'Mobile-responsive, offline-ready UI for immediate healthcare references'
    ],
    github: 'https://github.com/zunaidhasan',
    live: 'https://github.com/zunaidhasan',
    architecture: [
      'Local indexedDB storage for instant lookup of high-priority drug records',
      'Tesseract OCR and vision-LLM adapters for reading physical prescription slips',
      'Plain-language parsing pipeline translating medical jargon to layman guidance',
      'Fully responsive PWA (Progressive Web App) architecture'
    ]
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
  'Tailwind CSS',
  'Framer Motion',
  'PyTorch',
  'LangChain',
  'Supabase',
  'Pinecone',
  'RAG Pipelines',
];

export const skillsCategory = [
  {
    category: 'AI & LLM Ops',
    items: ['Claude API', 'OpenAI', 'ElevenLabs', 'Retell AI', 'Pinecone', 'RAG Pipelines', 'LangChain', 'PyTorch']
  },
  {
    category: 'Core Software & Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Vite', 'Redux Toolkit']
  },
  {
    category: 'Backend & Databases',
    items: ['FastAPI', 'Supabase', 'Prisma', 'Python Automation', 'PostgreSQL', 'Docker']
  }
];

export const testimonials = [
  {
    quote: "Zunaid has an incredible ability to translate complex AI research into working software. He built an AI-powered voice workflow for our communications that cut down average ticket times by 40%. Highly responsive and an exceptional executor.",
    author: "Technical Coordinator",
    role: "Foreign Client Relations",
    company: "Sardar IT"
  },
  {
    quote: "Working with Zunaid on our legal automation RAG system was a game-changer. He understands the nuances of Bangla NLP and built a pipeline that answers questions with extreme context grounding. Absolute professional.",
    author: "M. Rahman",
    role: "Co-Founder",
    company: "LegalTech Bangladesh"
  },
  {
    quote: "Zunaid doesn't just build wrappers. He carefully designs the voice latency, the streaming sockets, and the backup states. His engineering-first mentality is visible in everything he touches.",
    author: "Product Lead",
    role: "Voice AI System client",
    company: "Freelance Client Contract"
  }
];

export const socials = {
  email: 'connect.zunaid@gmail.com',
  linkedin: 'https://linkedin.com/in/zunaid-ishan',
  github: 'https://github.com/zunaidhasan',
  location: 'Dhaka, Bangladesh',
};
