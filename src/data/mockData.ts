// Mock Data for Elevato Platform

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  tutor: Tutor;
  category: Category;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  studentCount: number;
  duration: string;
  lessonsCount: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  previewVideo: string;
  isTrending?: boolean;
  isFeatured?: boolean;
  lastUpdated: string;
  whatYouLearn: string[];
  requirements: string[];
  curriculum: CurriculumSection[];
}

export interface CurriculumSection {
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isPreview: boolean;
  videoUrl?: string;
}

export interface Tutor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  bio: string;
  rating: number;
  studentCount: number;
  courseCount: number;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  courseCount: number;
  color: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  salary: string;
  requiredSkills: string[];
  requiredCourses: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  postedDate: string;
  isLocked?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  jobTitle: string;
  company: string;
  courseCompleted: string;
  quote: string;
  rating: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  enrolledCourses: string[];
  completedCourses: string[];
  certificates: string[];
}

// Categories
export const categories: Category[] = [
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    slug: 'digital-marketing',
    icon: 'TrendingUp',
    courseCount: 24,
    color: 'from-teal-500 to-cyan-500',
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    slug: 'ai-machine-learning',
    icon: 'Brain',
    courseCount: 18,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'web-dev',
    name: 'Web Development',
    slug: 'web-development',
    icon: 'Code',
    courseCount: 32,
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: 'social-media',
    name: 'Social Media',
    slug: 'social-media',
    icon: 'Share2',
    courseCount: 15,
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'graphic-design',
    name: 'Graphic Design',
    slug: 'graphic-design',
    icon: 'Palette',
    courseCount: 21,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'video-editing',
    name: 'Video Production',
    slug: 'video-production',
    icon: 'Video',
    courseCount: 12,
    color: 'from-yellow-500 to-orange-500',
  },
];

// Tutors
export const tutors: Tutor[] = [
  {
    id: 'tutor-1',
    name: 'Janet Wanjiku',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop',
    title: 'Digital Marketing Expert',
    bio: 'Former Head of Marketing at Safaricom with 10+ years of experience in digital strategy, SEO, and performance marketing across East Africa.',
    rating: 4.9,
    studentCount: 12500,
    courseCount: 8,
  },
  {
    id: 'tutor-2',
    name: 'Dr. Samuel Ochieng',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    title: 'AI Research Scientist',
    bio: 'PhD in Machine Learning from MIT, currently leading AI initiatives at IBM Research Africa. Passionate about bringing AI education to Kenya.',
    rating: 4.9,
    studentCount: 8900,
    courseCount: 5,
  },
  {
    id: 'tutor-3',
    name: 'Mary Njeri',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop',
    title: 'Full Stack Developer',
    bio: 'Senior Engineer at Microsoft with expertise in React, Node.js, and cloud architecture. Building the next generation of Kenyan developers.',
    rating: 4.8,
    studentCount: 15600,
    courseCount: 12,
  },
  {
    id: 'tutor-4',
    name: 'David Kamau',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    title: 'Creative Director',
    bio: 'Award-winning creative director with clients including Coca-Cola Africa and Kenya Airways. Founder of Nairobi Design Studio.',
    rating: 4.7,
    studentCount: 6700,
    courseCount: 6,
  },
];

// Courses
export const courses: Course[] = [
  {
    id: 'course-1',
    slug: 'complete-digital-marketing-masterclass',
    title: 'Complete Digital Marketing Masterclass 2024',
    shortDescription: 'Master SEO, social media, Google Ads, and analytics to grow any business online.',
    description: 'This comprehensive course covers everything you need to know about digital marketing in the Kenyan and East African context. From understanding local consumer behavior to mastering Google Ads for the regional market, you\'ll learn practical skills that employers are actively seeking.',
    tutor: tutors[0],
    category: categories[0],
    price: 7500,
    originalPrice: 12000,
    rating: 4.8,
    reviewCount: 1234,
    studentCount: 5600,
    duration: '12.5 hours',
    lessonsCount: 45,
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
    previewVideo: 'https://player.vimeo.com/external/368320203.hd.mp4?s=38f6e51ec5f4b7aaac0c9d0a2c3b2e8a&profile_id=175',
    isTrending: true,
    isFeatured: true,
    lastUpdated: 'December 2024',
    whatYouLearn: [
      'Create and execute comprehensive digital marketing strategies',
      'Master SEO techniques for Kenyan and African markets',
      'Run profitable Google Ads and Facebook Ads campaigns',
      'Build engaging social media presence for any brand',
      'Analyze marketing data and optimize for conversions',
      'Understand M-Pesa integration for e-commerce marketing',
    ],
    requirements: [
      'No prior marketing experience required',
      'Basic computer skills and internet access',
      'Willingness to learn and practice',
    ],
    curriculum: [
      {
        title: 'Introduction to Digital Marketing',
        lessons: [
          { id: 'l1', title: 'Welcome & Course Overview', duration: '5:30', isPreview: true },
          { id: 'l2', title: 'The Digital Marketing Landscape in Kenya', duration: '12:45', isPreview: true },
          { id: 'l3', title: 'Setting Up Your Marketing Toolkit', duration: '18:20', isPreview: false },
        ],
      },
      {
        title: 'Search Engine Optimization (SEO)',
        lessons: [
          { id: 'l4', title: 'SEO Fundamentals', duration: '15:00', isPreview: false },
          { id: 'l5', title: 'Keyword Research for African Markets', duration: '22:30', isPreview: false },
          { id: 'l6', title: 'On-Page Optimization Techniques', duration: '25:15', isPreview: false },
          { id: 'l7', title: 'Building Quality Backlinks', duration: '20:00', isPreview: false },
        ],
      },
      {
        title: 'Social Media Marketing',
        lessons: [
          { id: 'l8', title: 'Facebook Marketing Masterclass', duration: '30:00', isPreview: false },
          { id: 'l9', title: 'Instagram for Business Growth', duration: '28:00', isPreview: false },
          { id: 'l10', title: 'Twitter/X Strategy for Brands', duration: '18:00', isPreview: false },
          { id: 'l11', title: 'TikTok Marketing Essentials', duration: '22:00', isPreview: false },
        ],
      },
    ],
  },
  {
    id: 'course-2',
    slug: 'ai-machine-learning-business',
    title: 'AI & Machine Learning for Business',
    shortDescription: 'Learn to implement AI solutions in real business scenarios with ChatGPT, Claude, and more.',
    description: 'Discover how to leverage artificial intelligence to transform business operations. This course is designed for professionals who want to understand AI without deep technical knowledge, focusing on practical applications.',
    tutor: tutors[1],
    category: categories[1],
    price: 12000,
    originalPrice: 18000,
    rating: 4.9,
    reviewCount: 856,
    studentCount: 3200,
    duration: '18 hours',
    lessonsCount: 52,
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
    previewVideo: 'https://player.vimeo.com/external/368320203.hd.mp4?s=38f6e51ec5f4b7aaac0c9d0a2c3b2e8a&profile_id=175',
    isTrending: true,
    isFeatured: true,
    lastUpdated: 'December 2024',
    whatYouLearn: [
      'Understand AI fundamentals and machine learning concepts',
      'Use ChatGPT and Claude for business automation',
      'Build AI-powered workflows without coding',
      'Implement AI in marketing, sales, and operations',
      'Create custom AI solutions for Kenyan businesses',
      'Evaluate AI tools and vendors for your organization',
    ],
    requirements: [
      'Basic understanding of business operations',
      'No programming experience required',
      'Curiosity about AI and automation',
    ],
    curriculum: [
      {
        title: 'AI Fundamentals',
        lessons: [
          { id: 'l1', title: 'What is Artificial Intelligence?', duration: '10:00', isPreview: true },
          { id: 'l2', title: 'Machine Learning Explained Simply', duration: '15:00', isPreview: true },
          { id: 'l3', title: 'AI in the African Context', duration: '12:00', isPreview: false },
        ],
      },
      {
        title: 'Practical AI Tools',
        lessons: [
          { id: 'l4', title: 'Mastering ChatGPT for Business', duration: '25:00', isPreview: false },
          { id: 'l5', title: 'Advanced Prompting Techniques', duration: '30:00', isPreview: false },
          { id: 'l6', title: 'Claude for Document Analysis', duration: '22:00', isPreview: false },
        ],
      },
    ],
  },
  {
    id: 'course-3',
    slug: 'full-stack-web-development-bootcamp',
    title: 'Full Stack Web Development Bootcamp',
    shortDescription: 'Go from zero to building complete web applications with React, Node.js, and databases.',
    description: 'The most comprehensive web development course designed for the Kenyan job market. Learn the exact skills that top tech companies like Safaricom, Cellulant, and international firms are hiring for.',
    tutor: tutors[2],
    category: categories[2],
    price: 15000,
    originalPrice: 25000,
    rating: 4.8,
    reviewCount: 2145,
    studentCount: 8900,
    duration: '40 hours',
    lessonsCount: 120,
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop',
    previewVideo: 'https://player.vimeo.com/external/368320203.hd.mp4?s=38f6e51ec5f4b7aaac0c9d0a2c3b2e8a&profile_id=175',
    isTrending: true,
    isFeatured: true,
    lastUpdated: 'December 2024',
    whatYouLearn: [
      'Build responsive websites with HTML, CSS, and JavaScript',
      'Create dynamic web apps with React and TypeScript',
      'Develop backend APIs with Node.js and Express',
      'Work with databases like PostgreSQL and MongoDB',
      'Deploy applications to the cloud',
      'Integrate M-Pesa payments into web applications',
    ],
    requirements: [
      'No prior coding experience required',
      'A computer with internet access',
      'Dedication to practice coding daily',
    ],
    curriculum: [
      {
        title: 'HTML & CSS Foundations',
        lessons: [
          { id: 'l1', title: 'Your First Web Page', duration: '15:00', isPreview: true },
          { id: 'l2', title: 'CSS Styling Basics', duration: '20:00', isPreview: true },
          { id: 'l3', title: 'Responsive Design', duration: '25:00', isPreview: false },
        ],
      },
      {
        title: 'JavaScript Essentials',
        lessons: [
          { id: 'l4', title: 'JavaScript Fundamentals', duration: '30:00', isPreview: false },
          { id: 'l5', title: 'DOM Manipulation', duration: '25:00', isPreview: false },
          { id: 'l6', title: 'Async JavaScript', duration: '28:00', isPreview: false },
        ],
      },
    ],
  },
  {
    id: 'course-4',
    slug: 'social-media-management-kenyan-brands',
    title: 'Social Media Management for Kenyan Brands',
    shortDescription: 'Create engaging content and grow massive followings for businesses in Kenya.',
    description: 'Learn how to manage social media accounts professionally for Kenyan businesses. From content creation to community management, this course covers everything you need to become a sought-after social media manager.',
    tutor: tutors[0],
    category: categories[3],
    price: 5500,
    originalPrice: 8000,
    rating: 4.7,
    reviewCount: 987,
    studentCount: 4500,
    duration: '8 hours',
    lessonsCount: 28,
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop',
    previewVideo: 'https://player.vimeo.com/external/368320203.hd.mp4?s=38f6e51ec5f4b7aaac0c9d0a2c3b2e8a&profile_id=175',
    isFeatured: true,
    lastUpdated: 'November 2024',
    whatYouLearn: [
      'Create viral content for Kenyan audiences',
      'Build and manage content calendars',
      'Grow organic followers on all major platforms',
      'Handle crisis communication professionally',
      'Measure and report social media ROI',
      'Work with Kenyan influencers effectively',
    ],
    requirements: [
      'Active social media user',
      'Basic smartphone and computer skills',
      'Creativity and willingness to experiment',
    ],
    curriculum: [
      {
        title: 'Social Media Strategy',
        lessons: [
          { id: 'l1', title: 'Understanding Your Audience', duration: '12:00', isPreview: true },
          { id: 'l2', title: 'Platform Selection Strategy', duration: '15:00', isPreview: true },
        ],
      },
    ],
  },
  {
    id: 'course-5',
    slug: 'professional-graphic-design',
    title: 'Professional Graphic Design Masterclass',
    shortDescription: 'Master Figma, Photoshop, and Illustrator to create stunning visual designs.',
    description: 'Become a professional graphic designer with skills that are in high demand. This course covers industry-standard tools and techniques used by top design agencies in Kenya.',
    tutor: tutors[3],
    category: categories[4],
    price: 9500,
    originalPrice: 15000,
    rating: 4.8,
    reviewCount: 654,
    studentCount: 3800,
    duration: '25 hours',
    lessonsCount: 68,
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=450&fit=crop',
    previewVideo: 'https://player.vimeo.com/external/368320203.hd.mp4?s=38f6e51ec5f4b7aaac0c9d0a2c3b2e8a&profile_id=175',
    lastUpdated: 'November 2024',
    whatYouLearn: [
      'Master Figma for UI/UX design',
      'Create professional logos and brand identities',
      'Design social media graphics and marketing materials',
      'Photo editing and manipulation in Photoshop',
      'Create vector illustrations in Illustrator',
      'Build an impressive design portfolio',
    ],
    requirements: [
      'No prior design experience needed',
      'Computer capable of running design software',
      'Creative mindset',
    ],
    curriculum: [
      {
        title: 'Design Fundamentals',
        lessons: [
          { id: 'l1', title: 'Principles of Good Design', duration: '18:00', isPreview: true },
          { id: 'l2', title: 'Color Theory Essentials', duration: '20:00', isPreview: true },
        ],
      },
    ],
  },
  {
    id: 'course-6',
    slug: 'video-production-storytelling',
    title: 'Video Production & Storytelling',
    shortDescription: 'Learn to shoot, edit, and produce professional videos for brands and social media.',
    description: 'From smartphone filming to professional editing, learn video production skills that will make you invaluable to any business or content creator.',
    tutor: tutors[3],
    category: categories[5],
    price: 8500,
    originalPrice: 12000,
    rating: 4.6,
    reviewCount: 432,
    studentCount: 2100,
    duration: '15 hours',
    lessonsCount: 42,
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=450&fit=crop',
    previewVideo: 'https://player.vimeo.com/external/368320203.hd.mp4?s=38f6e51ec5f4b7aaac0c9d0a2c3b2e8a&profile_id=175',
    lastUpdated: 'October 2024',
    whatYouLearn: [
      'Professional video shooting techniques',
      'Master video editing in Premiere Pro and DaVinci',
      'Create engaging short-form content for TikTok and Reels',
      'Audio recording and editing for video',
      'Motion graphics and visual effects basics',
      'Build a video production business',
    ],
    requirements: [
      'Smartphone or camera for practice',
      'Computer for video editing',
      'Basic creativity',
    ],
    curriculum: [
      {
        title: 'Video Fundamentals',
        lessons: [
          { id: 'l1', title: 'Camera Settings Explained', duration: '15:00', isPreview: true },
          { id: 'l2', title: 'Composition and Framing', duration: '18:00', isPreview: true },
        ],
      },
    ],
  },
  {
    id: 'course-7',
    slug: 'data-analytics-business-intelligence',
    title: 'Data Analytics & Business Intelligence',
    shortDescription: 'Transform data into actionable insights with Excel, SQL, and Power BI.',
    description: 'Data analytics is one of the most in-demand skills in Kenya. Learn to collect, analyze, and visualize data to drive business decisions.',
    tutor: tutors[1],
    category: categories[1],
    price: 10500,
    originalPrice: 16000,
    rating: 4.7,
    reviewCount: 567,
    studentCount: 2800,
    duration: '20 hours',
    lessonsCount: 55,
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
    previewVideo: 'https://player.vimeo.com/external/368320203.hd.mp4?s=38f6e51ec5f4b7aaac0c9d0a2c3b2e8a&profile_id=175',
    lastUpdated: 'December 2024',
    whatYouLearn: [
      'Advanced Excel for data analysis',
      'SQL for database querying',
      'Data visualization with Power BI',
      'Statistical analysis fundamentals',
      'Create executive dashboards',
      'Present data insights effectively',
    ],
    requirements: [
      'Basic Excel knowledge helpful',
      'Analytical mindset',
      'Access to Microsoft Excel',
    ],
    curriculum: [
      {
        title: 'Excel Mastery',
        lessons: [
          { id: 'l1', title: 'Advanced Excel Functions', duration: '25:00', isPreview: true },
          { id: 'l2', title: 'Pivot Tables Deep Dive', duration: '30:00', isPreview: false },
        ],
      },
    ],
  },
  {
    id: 'course-8',
    slug: 'e-commerce-mpesa-integration',
    title: 'E-commerce & M-Pesa Integration',
    shortDescription: 'Build and launch online stores with seamless M-Pesa payment integration.',
    description: 'Learn to build successful e-commerce businesses in Kenya with a focus on M-Pesa integration, the backbone of Kenyan digital payments.',
    tutor: tutors[2],
    category: categories[2],
    price: 11000,
    originalPrice: 17000,
    rating: 4.9,
    reviewCount: 789,
    studentCount: 4200,
    duration: '16 hours',
    lessonsCount: 48,
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop',
    previewVideo: 'https://player.vimeo.com/external/368320203.hd.mp4?s=38f6e51ec5f4b7aaac0c9d0a2c3b2e8a&profile_id=175',
    isTrending: true,
    lastUpdated: 'December 2024',
    whatYouLearn: [
      'Set up online stores with WooCommerce and Shopify',
      'Integrate M-Pesa STK Push payments',
      'Handle M-Pesa payment callbacks',
      'Build custom checkout experiences',
      'Manage inventory and orders',
      'Scale e-commerce operations',
    ],
    requirements: [
      'Basic web development knowledge',
      'Understanding of HTTP and APIs',
      'Access to M-Pesa business account (for testing)',
    ],
    curriculum: [
      {
        title: 'E-commerce Foundations',
        lessons: [
          { id: 'l1', title: 'E-commerce in Kenya Overview', duration: '12:00', isPreview: true },
          { id: 'l2', title: 'Choosing Your Platform', duration: '18:00', isPreview: true },
        ],
      },
    ],
  },
];

// Jobs
export const jobs: Job[] = [
  {
    id: 'job-1',
    title: 'Social Media Manager',
    company: 'TechHub Nairobi',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    location: 'Nairobi (Hybrid)',
    type: 'Full-time',
    salary: 'KES 60,000 - 80,000/month',
    requiredSkills: ['Social Media Management', 'Content Creation', 'Analytics'],
    requiredCourses: ['course-4'],
    description: 'We are looking for a creative Social Media Manager to join our growing team. You will be responsible for managing our social media presence across all platforms.',
    responsibilities: [
      'Develop and execute social media strategy',
      'Create engaging content for all platforms',
      'Monitor and respond to community engagement',
      'Analyze metrics and prepare reports',
    ],
    requirements: [
      'Proven social media management experience',
      'Strong content creation skills',
      'Understanding of Kenyan digital landscape',
    ],
    postedDate: '2 days ago',
  },
  {
    id: 'job-2',
    title: 'Junior Web Developer',
    company: 'Safaricom PLC',
    companyLogo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop',
    location: 'Nairobi',
    type: 'Full-time',
    salary: 'KES 80,000 - 120,000/month',
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React'],
    requiredCourses: ['course-3'],
    description: 'Join Kenya\'s leading telecommunications company as a Junior Web Developer. Work on cutting-edge projects that impact millions of Kenyans.',
    responsibilities: [
      'Develop responsive web applications',
      'Collaborate with UI/UX designers',
      'Write clean, maintainable code',
      'Participate in code reviews',
    ],
    requirements: [
      'Strong foundation in web technologies',
      'Familiarity with React or similar frameworks',
      'Problem-solving mindset',
    ],
    postedDate: '5 days ago',
  },
  {
    id: 'job-3',
    title: 'Digital Marketing Specialist',
    company: 'Kenya Airways',
    companyLogo: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=100&h=100&fit=crop',
    location: 'Nairobi',
    type: 'Contract',
    salary: 'KES 100,000 - 150,000/month',
    requiredSkills: ['SEO', 'Google Ads', 'Social Media Marketing'],
    requiredCourses: ['course-1'],
    description: 'Kenya Airways is seeking a Digital Marketing Specialist to drive our online presence and customer acquisition.',
    responsibilities: [
      'Plan and execute digital marketing campaigns',
      'Manage SEO and SEM initiatives',
      'Optimize conversion funnels',
      'Report on campaign performance',
    ],
    requirements: [
      'Proven digital marketing experience',
      'Google Ads certification preferred',
      'Strong analytical skills',
    ],
    postedDate: '1 week ago',
  },
  {
    id: 'job-4',
    title: 'AI Solutions Architect',
    company: 'IBM Research Africa',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop',
    location: 'Nairobi',
    type: 'Full-time',
    salary: 'KES 200,000 - 350,000/month',
    requiredSkills: ['Machine Learning', 'Python', 'AI Strategy'],
    requiredCourses: ['course-2'],
    description: 'Help shape the future of AI in Africa. We are looking for an AI Solutions Architect to design and implement AI solutions for enterprise clients.',
    responsibilities: [
      'Design AI/ML solutions for clients',
      'Lead technical AI implementations',
      'Advise on AI strategy and adoption',
      'Mentor junior team members',
    ],
    requirements: [
      'Strong understanding of AI/ML concepts',
      'Experience with AI implementation',
      'Excellent communication skills',
    ],
    postedDate: '3 days ago',
  },
  {
    id: 'job-5',
    title: 'Graphic Designer',
    company: 'Ogilvy Africa',
    companyLogo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop',
    location: 'Nairobi',
    type: 'Full-time',
    salary: 'KES 70,000 - 100,000/month',
    requiredSkills: ['Adobe Creative Suite', 'Figma', 'Brand Design'],
    requiredCourses: ['course-5'],
    description: 'Join one of Africa\'s leading advertising agencies as a Graphic Designer. Work on campaigns for major brands across the continent.',
    responsibilities: [
      'Create visual designs for campaigns',
      'Collaborate with creative teams',
      'Develop brand identities',
      'Produce print and digital materials',
    ],
    requirements: [
      'Strong portfolio demonstrating creativity',
      'Proficiency in design software',
      'Understanding of brand design principles',
    ],
    postedDate: '4 days ago',
  },
  {
    id: 'job-6',
    title: 'E-commerce Developer',
    company: 'Jumia Kenya',
    companyLogo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop',
    location: 'Nairobi (Remote)',
    type: 'Full-time',
    salary: 'KES 120,000 - 180,000/month',
    requiredSkills: ['JavaScript', 'E-commerce Platforms', 'M-Pesa Integration'],
    requiredCourses: ['course-3', 'course-8'],
    description: 'Build and improve the leading e-commerce platform in Africa. Work on payment integrations, checkout flows, and more.',
    responsibilities: [
      'Develop e-commerce features',
      'Integrate payment gateways',
      'Optimize checkout experience',
      'Build internal tools',
    ],
    requirements: [
      'Experience with e-commerce development',
      'Understanding of M-Pesa integration',
      'Strong JavaScript skills',
    ],
    postedDate: '1 day ago',
  },
];

// Testimonials
export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'David Kimani',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    jobTitle: 'Web Developer',
    company: 'Microsoft',
    courseCompleted: 'Full Stack Web Development Bootcamp',
    quote: 'I went from zero coding knowledge to landing a job at Microsoft in just 6 months! The course was practical and the job board connected me directly with employers.',
    rating: 5,
  },
  {
    id: 'test-2',
    name: 'Grace Wanjiru',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop',
    jobTitle: 'Social Media Manager',
    company: 'Equity Bank',
    courseCompleted: 'Social Media Management for Kenyan Brands',
    quote: 'The skills I learned helped me manage Equity Bank\'s social media. The certification was recognized by my employer and I got a 40% salary increase!',
    rating: 5,
  },
  {
    id: 'test-3',
    name: 'Brian Otieno',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    jobTitle: 'Digital Marketing Lead',
    company: 'NCBA Bank',
    courseCompleted: 'Complete Digital Marketing Masterclass',
    quote: 'Elevato transformed my career. The practical approach to digital marketing, especially for Kenyan markets, was exactly what I needed to stand out.',
    rating: 5,
  },
];

// Mock User
export const mockUser: User = {
  id: 'user-1',
  name: 'John Mwangi',
  email: 'john.mwangi@email.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  enrolledCourses: ['course-1', 'course-3'],
  completedCourses: ['course-4'],
  certificates: ['course-4'],
};

// Stats
export const platformStats = {
  totalStudents: 15000,
  totalCourses: 50,
  jobsPlaced: 320,
  tutors: 25,
};
