// Mock Data for Mwanzo Platform

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
  youtubePreviewId?: string;
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
  youtubeId?: string;
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
  specialties: string[];
  experience: string;
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
  postedBy?: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  applicantName: string;
  applicantEmail: string;
  applicantAvatar: string;
  resumeUrl: string;
  coverLetter: string;
  appliedDate: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
  completedCourses: string[];
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
  role: 'student' | 'business';
  enrolledCourses: string[];
  completedCourses: string[];
  certificates: string[];
  companyName?: string;
  postedJobs?: string[];
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

// Tutors with Kenyan-focused profiles
export const tutors: Tutor[] = [
  {
    id: 'tutor-1',
    name: 'Janet Wanjiku',
    avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=200&h=200&fit=crop&crop=face',
    title: 'Digital Marketing Expert',
    bio: 'Former Head of Marketing at Safaricom with 10+ years of experience in digital strategy, SEO, and performance marketing across East Africa. I have helped over 200 Kenyan businesses grow their online presence.',
    rating: 4.9,
    studentCount: 12500,
    courseCount: 8,
    specialties: ['SEO', 'Google Ads', 'Social Media Marketing', 'Content Strategy'],
    experience: '10+ years in Digital Marketing',
  },
  {
    id: 'tutor-2',
    name: 'Dr. Samuel Ochieng',
    avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=200&h=200&fit=crop&crop=face',
    title: 'AI Research Scientist',
    bio: 'PhD in Machine Learning from MIT, currently leading AI initiatives at IBM Research Africa in Nairobi. Passionate about democratizing AI education across Kenya and making it accessible to everyone.',
    rating: 4.9,
    studentCount: 8900,
    courseCount: 5,
    specialties: ['Machine Learning', 'ChatGPT', 'Python', 'Data Science'],
    experience: '8+ years in AI Research',
  },
  {
    id: 'tutor-3',
    name: 'Mary Njeri',
    avatar: 'https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?w=200&h=200&fit=crop&crop=face',
    title: 'Full Stack Developer',
    bio: 'Senior Engineer at Microsoft with expertise in React, Node.js, and cloud architecture. Building the next generation of Kenyan developers one student at a time. Started coding at Jomo Kenyatta University.',
    rating: 4.8,
    studentCount: 15600,
    courseCount: 12,
    specialties: ['React', 'Node.js', 'TypeScript', 'Cloud Architecture'],
    experience: '7+ years in Software Development',
  },
  {
    id: 'tutor-4',
    name: 'David Kamau',
    avatar: 'https://images.unsplash.com/photo-1507152927220-f21f4c1e2c3e?w=200&h=200&fit=crop&crop=face',
    title: 'Creative Director',
    bio: 'Award-winning creative director with clients including Coca-Cola Africa and Kenya Airways. Founder of Nairobi Design Studio. I believe every Kenyan has creative potential waiting to be unlocked.',
    rating: 4.7,
    studentCount: 6700,
    courseCount: 6,
    specialties: ['Figma', 'Adobe Suite', 'Brand Design', 'UI/UX'],
    experience: '12+ years in Design',
  },
];

// Courses with category-relevant YouTube preview videos
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
    thumbnail: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&h=450&fit=crop',
    previewVideo: 'https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4',
    youtubePreviewId: 'bixR-KIJKYM',
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
          { id: 'l1', title: 'Welcome & Course Overview', duration: '5:30', isPreview: true, youtubeId: 'bixR-KIJKYM' },
          { id: 'l2', title: 'The Digital Marketing Landscape in Kenya', duration: '12:45', isPreview: true, youtubeId: 'nU-IIXBWlS4' },
          { id: 'l3', title: 'Setting Up Your Marketing Toolkit', duration: '18:20', isPreview: false, youtubeId: '8aGhZQkoFbQ' },
        ],
      },
      {
        title: 'Search Engine Optimization (SEO)',
        lessons: [
          { id: 'l4', title: 'SEO Fundamentals', duration: '15:00', isPreview: false, youtubeId: 'IkmETRfO6B8' },
          { id: 'l5', title: 'Keyword Research for African Markets', duration: '22:30', isPreview: false, youtubeId: 'qz0aGYrrlhU' },
          { id: 'l6', title: 'On-Page Optimization Techniques', duration: '25:15', isPreview: false },
          { id: 'l7', title: 'Building Quality Backlinks', duration: '20:00', isPreview: false },
        ],
      },
      {
        title: 'Social Media Marketing',
        lessons: [
          { id: 'l8', title: 'Facebook Marketing Masterclass', duration: '30:00', isPreview: false, youtubeId: 'B6JVLdKcF_E' },
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
    previewVideo: 'https://cdn.pixabay.com/video/2019/06/19/24569-343001767_large.mp4',
    youtubePreviewId: 'ad79nYk2keg',
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
          { id: 'l1', title: 'What is Artificial Intelligence?', duration: '10:00', isPreview: true, youtubeId: 'ad79nYk2keg' },
          { id: 'l2', title: 'Machine Learning Explained Simply', duration: '15:00', isPreview: true, youtubeId: 'ukzFI9rgwfU' },
          { id: 'l3', title: 'AI in the African Context', duration: '12:00', isPreview: false },
        ],
      },
      {
        title: 'Practical AI Tools',
        lessons: [
          { id: 'l4', title: 'Mastering ChatGPT for Business', duration: '25:00', isPreview: false, youtubeId: 'jBKGihP-_AE' },
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
    previewVideo: 'https://cdn.pixabay.com/video/2020/02/12/32489-392015291_large.mp4',
    youtubePreviewId: 'UB1O30fR-EE',
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
          { id: 'l1', title: 'Your First Web Page', duration: '15:00', isPreview: true, youtubeId: 'UB1O30fR-EE' },
          { id: 'l2', title: 'CSS Styling Basics', duration: '20:00', isPreview: true, youtubeId: 'yfoY53QXEnI' },
          { id: 'l3', title: 'Responsive Design', duration: '25:00', isPreview: false },
        ],
      },
      {
        title: 'JavaScript Essentials',
        lessons: [
          { id: 'l4', title: 'JavaScript Fundamentals', duration: '30:00', isPreview: false, youtubeId: 'hdI2bqOjy3c' },
          { id: 'l5', title: 'DOM Manipulation', duration: '25:00', isPreview: false },
          { id: 'l6', title: 'Async JavaScript', duration: '28:00', isPreview: false },
        ],
      },
      {
        title: 'React Development',
        lessons: [
          { id: 'l7', title: 'Introduction to React', duration: '35:00', isPreview: false, youtubeId: 'bMknfKXIFA8' },
          { id: 'l8', title: 'Components and Props', duration: '28:00', isPreview: false },
          { id: 'l9', title: 'State Management', duration: '32:00', isPreview: false },
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
    previewVideo: 'https://cdn.pixabay.com/video/2020/07/30/45603-445912296_large.mp4',
    youtubePreviewId: 'I2pwcAVonKI',
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
          { id: 'l1', title: 'Understanding Your Audience', duration: '12:00', isPreview: true, youtubeId: 'I2pwcAVonKI' },
          { id: 'l2', title: 'Platform Selection Strategy', duration: '15:00', isPreview: true },
          { id: 'l3', title: 'Content Planning and Calendars', duration: '20:00', isPreview: false },
        ],
      },
      {
        title: 'Content Creation',
        lessons: [
          { id: 'l4', title: 'Creating Engaging Posts', duration: '18:00', isPreview: false },
          { id: 'l5', title: 'Video Content for Social Media', duration: '25:00', isPreview: false },
          { id: 'l6', title: 'Using Canva Like a Pro', duration: '20:00', isPreview: false },
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
    previewVideo: 'https://cdn.pixabay.com/video/2021/04/06/69893-533515618_large.mp4',
    youtubePreviewId: 'YqQx75OPRa0',
    isFeatured: true,
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
          { id: 'l1', title: 'Principles of Good Design', duration: '18:00', isPreview: true, youtubeId: 'YqQx75OPRa0' },
          { id: 'l2', title: 'Color Theory Essentials', duration: '20:00', isPreview: true },
          { id: 'l3', title: 'Typography Mastery', duration: '22:00', isPreview: false },
        ],
      },
      {
        title: 'Figma Mastery',
        lessons: [
          { id: 'l4', title: 'Getting Started with Figma', duration: '25:00', isPreview: false, youtubeId: 'FTFaQWZBqQ8' },
          { id: 'l5', title: 'Advanced Figma Techniques', duration: '30:00', isPreview: false },
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
    previewVideo: 'https://cdn.pixabay.com/video/2016/09/21/5106-183629262_large.mp4',
    youtubePreviewId: 'LKnqECcg6Gw',
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
          { id: 'l1', title: 'Camera Settings Explained', duration: '15:00', isPreview: true, youtubeId: 'LKnqECcg6Gw' },
          { id: 'l2', title: 'Composition and Framing', duration: '18:00', isPreview: true },
          { id: 'l3', title: 'Lighting for Video', duration: '20:00', isPreview: false },
        ],
      },
      {
        title: 'Video Editing',
        lessons: [
          { id: 'l4', title: 'Introduction to DaVinci Resolve', duration: '25:00', isPreview: false, youtubeId: '63Ln33O4p4c' },
          { id: 'l5', title: 'Cutting and Transitions', duration: '22:00', isPreview: false },
        ],
      },
    ],
  },
  {
    id: 'course-7',
    slug: 'data-analytics-excel-powerbi',
    title: 'Data Analytics with Excel & Power BI',
    shortDescription: 'Transform raw data into actionable insights using Excel and Power BI.',
    description: 'Learn to analyze data like a pro using tools that businesses in Kenya use daily. From Excel formulas to Power BI dashboards, become the data expert every company needs.',
    tutor: tutors[1],
    category: categories[1],
    price: 8000,
    originalPrice: 12000,
    rating: 4.7,
    reviewCount: 567,
    studentCount: 3400,
    duration: '20 hours',
    lessonsCount: 55,
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
    previewVideo: 'https://cdn.pixabay.com/video/2020/08/12/46966-449626928_large.mp4',
    youtubePreviewId: 'Vl0H-qTclOg',
    isFeatured: true,
    lastUpdated: 'December 2024',
    whatYouLearn: [
      'Advanced Excel formulas and functions',
      'Data cleaning and transformation',
      'Create professional dashboards in Power BI',
      'Statistical analysis for business decisions',
      'Automate reports and workflows',
      'Present data insights effectively',
    ],
    requirements: [
      'Basic Excel knowledge helpful but not required',
      'Access to Microsoft Excel (any version)',
      'Analytical mindset',
    ],
    curriculum: [
      {
        title: 'Excel Mastery',
        lessons: [
          { id: 'l1', title: 'Advanced Excel Functions', duration: '25:00', isPreview: true, youtubeId: 'Vl0H-qTclOg' },
          { id: 'l2', title: 'Pivot Tables Deep Dive', duration: '30:00', isPreview: true },
        ],
      },
      {
        title: 'Power BI Fundamentals',
        lessons: [
          { id: 'l3', title: 'Getting Started with Power BI', duration: '20:00', isPreview: false, youtubeId: 'AGrl-H87pRU' },
          { id: 'l4', title: 'Creating Interactive Dashboards', duration: '35:00', isPreview: false },
        ],
      },
    ],
  },
  {
    id: 'course-8',
    slug: 'mobile-app-development-flutter',
    title: 'Mobile App Development with Flutter',
    shortDescription: 'Build beautiful cross-platform mobile apps for iOS and Android with Flutter.',
    description: 'Create stunning mobile applications that work on both iOS and Android from a single codebase. Perfect for entrepreneurs and developers targeting the Kenyan mobile-first market.',
    tutor: tutors[2],
    category: categories[2],
    price: 18000,
    originalPrice: 28000,
    rating: 4.9,
    reviewCount: 324,
    studentCount: 1800,
    duration: '35 hours',
    lessonsCount: 85,
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop',
    previewVideo: 'https://cdn.pixabay.com/video/2020/03/21/33444-399959023_large.mp4',
    youtubePreviewId: 'VPvVD8t02U8',
    isTrending: true,
    lastUpdated: 'December 2024',
    whatYouLearn: [
      'Dart programming language fundamentals',
      'Flutter widgets and layouts',
      'State management with Provider and Riverpod',
      'Integration with REST APIs and Firebase',
      'M-Pesa payment integration for mobile',
      'Publishing apps to Play Store and App Store',
    ],
    requirements: [
      'Basic programming knowledge helpful',
      'Computer with Flutter SDK installed',
      'Android or iOS device for testing',
    ],
    curriculum: [
      {
        title: 'Flutter Basics',
        lessons: [
          { id: 'l1', title: 'Introduction to Flutter', duration: '20:00', isPreview: true, youtubeId: 'VPvVD8t02U8' },
          { id: 'l2', title: 'Dart Programming Essentials', duration: '35:00', isPreview: true },
        ],
      },
      {
        title: 'Building Your First App',
        lessons: [
          { id: 'l3', title: 'Widgets and Layouts', duration: '40:00', isPreview: false },
          { id: 'l4', title: 'Navigation and Routing', duration: '25:00', isPreview: false },
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
    companyLogo: 'https://ui-avatars.com/api/?name=TH&background=0d9488&color=fff&size=100',
    location: 'Nairobi (Hybrid)',
    type: 'Full-time',
    salary: 'KES 60,000 - 80,000/month',
    requiredSkills: ['Social Media Marketing', 'Content Creation', 'Analytics', 'Community Management'],
    requiredCourses: ['course-4'],
    description: 'We are looking for a creative Social Media Manager to lead our digital presence and engage with our growing community of tech enthusiasts across Kenya.',
    responsibilities: [
      'Develop and execute social media strategies across all platforms',
      'Create engaging content including graphics, videos, and copy',
      'Monitor trends and engage with the tech community',
      'Analyze performance metrics and optimize campaigns',
      'Collaborate with the marketing team on campaigns',
    ],
    requirements: [
      'Proven experience managing social media accounts',
      'Strong understanding of Kenyan digital landscape',
      'Excellent written and verbal communication',
      'Experience with social media management tools',
      'Portfolio of previous social media work',
    ],
    postedDate: '2 days ago',
    postedBy: 'business-1',
  },
  {
    id: 'job-2',
    title: 'Junior Web Developer',
    company: 'Safaricom PLC',
    companyLogo: 'https://ui-avatars.com/api/?name=SP&background=4caf50&color=fff&size=100',
    location: 'Nairobi',
    type: 'Full-time',
    salary: 'KES 80,000 - 120,000/month',
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
    requiredCourses: ['course-3'],
    description: 'Join Safaricom\'s digital team as a Junior Web Developer and help build innovative solutions for millions of Kenyan customers.',
    responsibilities: [
      'Develop and maintain web applications using React',
      'Collaborate with designers on UI/UX implementation',
      'Write clean, testable code following best practices',
      'Participate in code reviews and team discussions',
      'Learn and adapt to new technologies quickly',
    ],
    requirements: [
      'Proficiency in HTML, CSS, and JavaScript',
      'Experience with React or similar frameworks',
      'Understanding of RESTful APIs',
      'Problem-solving mindset',
      'Degree in Computer Science or equivalent experience',
    ],
    postedDate: '5 days ago',
    postedBy: 'business-2',
  },
  {
    id: 'job-3',
    title: 'Digital Marketing Specialist',
    company: 'Kenya Airways',
    companyLogo: 'https://ui-avatars.com/api/?name=KQ&background=dc2626&color=fff&size=100',
    location: 'Nairobi',
    type: 'Contract',
    salary: 'KES 100,000 - 150,000/month',
    requiredSkills: ['SEO', 'Google Ads', 'Facebook Ads', 'Analytics', 'Content Marketing'],
    requiredCourses: ['course-1'],
    description: 'Kenya Airways is seeking a Digital Marketing Specialist to drive our online presence and customer acquisition through innovative digital strategies.',
    responsibilities: [
      'Plan and execute digital marketing campaigns',
      'Manage Google Ads and social media advertising budgets',
      'Optimize website content for SEO',
      'Track and report on campaign performance',
      'Work with agencies on creative development',
    ],
    requirements: [
      'Proven experience in digital marketing',
      'Google Ads and Analytics certification preferred',
      'Experience with marketing automation tools',
      'Strong analytical and reporting skills',
      'Knowledge of the travel and aviation industry is a plus',
    ],
    postedDate: '1 week ago',
    postedBy: 'business-3',
  },
  {
    id: 'job-4',
    title: 'AI Solutions Consultant',
    company: 'IBM Research Africa',
    companyLogo: 'https://ui-avatars.com/api/?name=IBM&background=1e40af&color=fff&size=100',
    location: 'Nairobi',
    type: 'Full-time',
    salary: 'KES 150,000 - 250,000/month',
    requiredSkills: ['AI Strategy', 'Machine Learning', 'Business Analysis', 'Python', 'Data Science'],
    requiredCourses: ['course-2'],
    description: 'Help African businesses transform through AI implementation. Work with enterprise clients to design and deploy cutting-edge AI solutions.',
    responsibilities: [
      'Assess client needs and propose AI solutions',
      'Lead proof-of-concept projects',
      'Train client teams on AI tools and best practices',
      'Stay current with AI trends and research',
      'Contribute to thought leadership content',
    ],
    requirements: [
      'Experience implementing AI/ML solutions',
      'Strong business acumen and consulting skills',
      'Excellent presentation and communication',
      'Technical background in data science or engineering',
      'Experience with enterprise clients preferred',
    ],
    postedDate: '3 days ago',
    postedBy: 'business-4',
  },
  {
    id: 'job-5',
    title: 'Graphic Designer',
    company: 'Equity Bank',
    companyLogo: 'https://ui-avatars.com/api/?name=EQ&background=f59e0b&color=fff&size=100',
    location: 'Nairobi (Hybrid)',
    type: 'Full-time',
    salary: 'KES 70,000 - 100,000/month',
    requiredSkills: ['Figma', 'Adobe Creative Suite', 'UI/UX Design', 'Brand Design', 'Motion Graphics'],
    requiredCourses: ['course-5'],
    description: 'Join Equity Bank\'s creative team and help design visual experiences that reach millions of customers across Africa.',
    responsibilities: [
      'Create marketing materials for digital and print',
      'Design UI components for mobile banking apps',
      'Develop brand-consistent visual assets',
      'Collaborate with marketing on campaign visuals',
      'Maintain and update brand guidelines',
    ],
    requirements: [
      'Proficiency in Figma and Adobe Creative Suite',
      'Strong portfolio demonstrating design skills',
      'Understanding of brand and marketing design',
      'Experience with motion graphics is a plus',
      'Ability to work under tight deadlines',
    ],
    postedDate: '1 week ago',
    postedBy: 'business-5',
  },
  {
    id: 'job-6',
    title: 'Video Content Creator',
    company: 'Nation Media Group',
    companyLogo: 'https://ui-avatars.com/api/?name=NMG&background=7c3aed&color=fff&size=100',
    location: 'Nairobi',
    type: 'Full-time',
    salary: 'KES 55,000 - 75,000/month',
    requiredSkills: ['Video Editing', 'Adobe Premiere', 'DaVinci Resolve', 'Storytelling', 'Camera Operation'],
    requiredCourses: ['course-6'],
    description: 'Create compelling video content for Kenya\'s leading media house across news, entertainment, and digital platforms.',
    responsibilities: [
      'Produce video content for social media and web',
      'Edit news packages and feature stories',
      'Shoot and produce short-form content',
      'Collaborate with journalists and producers',
      'Maintain video equipment and archives',
    ],
    requirements: [
      'Experience with video editing software',
      'Understanding of storytelling principles',
      'Ability to work in fast-paced environment',
      'Knowledge of current social media trends',
      'Portfolio of previous video work required',
    ],
    postedDate: '4 days ago',
    postedBy: 'business-6',
  },
];

// Mock Job Applications
export const mockApplications: JobApplication[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    applicantName: 'Grace Wanjiru',
    applicantEmail: 'grace.w@email.com',
    applicantAvatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face',
    resumeUrl: '#',
    coverLetter: 'I am excited to apply for the Social Media Manager position. With my recent certification from Mwanzo in Social Media Management and 2 years of experience managing brand accounts, I am confident I can help TechHub Nairobi grow its digital presence...',
    appliedDate: '2 days ago',
    status: 'pending',
    completedCourses: ['course-4', 'course-1'],
  },
  {
    id: 'app-2',
    jobId: 'job-1',
    applicantName: 'David Kimani',
    applicantEmail: 'david.k@email.com',
    applicantAvatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&h=100&fit=crop&crop=face',
    resumeUrl: '#',
    coverLetter: 'As a graduate of the Mwanzo Social Media Management course, I have developed strong skills in content creation and community engagement. I would love to bring my passion for tech and social media to TechHub Nairobi...',
    appliedDate: '1 day ago',
    status: 'reviewed',
    completedCourses: ['course-4'],
  },
  {
    id: 'app-3',
    jobId: 'job-2',
    applicantName: 'Peter Mwangi',
    applicantEmail: 'peter.m@email.com',
    applicantAvatar: 'https://images.unsplash.com/photo-1507152927220-f21f4c1e2c3e?w=100&h=100&fit=crop&crop=face',
    resumeUrl: '#',
    coverLetter: 'I recently completed the Full Stack Web Development Bootcamp at Mwanzo and built several projects including an e-commerce platform. I am eager to apply my React and Node.js skills at Safaricom...',
    appliedDate: '3 days ago',
    status: 'shortlisted',
    completedCourses: ['course-3'],
  },
  {
    id: 'app-4',
    jobId: 'job-3',
    applicantName: 'Sarah Odhiambo',
    applicantEmail: 'sarah.o@email.com',
    applicantAvatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=100&h=100&fit=crop&crop=face',
    resumeUrl: '#',
    coverLetter: 'With my Digital Marketing Masterclass certification and experience running campaigns for local businesses, I am well-prepared to help Kenya Airways enhance its digital marketing efforts...',
    appliedDate: '5 days ago',
    status: 'pending',
    completedCourses: ['course-1', 'course-4'],
  },
];

// Testimonials with Kenyan-focused avatars
export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Kevin Otieno',
    avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=200&h=200&fit=crop&crop=face',
    jobTitle: 'Junior Developer',
    company: 'Twiga Foods',
    courseCompleted: 'Full Stack Web Development Bootcamp',
    quote: 'Nilikuwa form four leaver bila chochote. After 4 months on Mwanzo, I landed my first tech job! Now I build apps for Twiga Foods. Asante Mwanzo!',
    rating: 5,
  },
  {
    id: 'testimonial-2',
    name: 'Njeri Wambui',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face',
    jobTitle: 'Social Media Manager',
    company: 'Copia Kenya',
    courseCompleted: 'Social Media Management for Kenyan Brands',
    quote: 'I was jobless for 2 years after campus. Mwanzo taught me digital marketing and within 3 months, Copia hired me! My salary is 50% more than expected.',
    rating: 5,
  },
  {
    id: 'testimonial-3',
    name: 'Brian Kipchoge',
    avatar: 'https://images.unsplash.com/photo-1507152927220-f21f4c1e2c3e?w=200&h=200&fit=crop&crop=face',
    jobTitle: 'Data Entry Specialist',
    company: 'Sendy Logistics',
    courseCompleted: 'AI & Machine Learning for Business',
    quote: 'From selling airtime in Kisumu to working at Sendy in Nairobi! The AI course opened doors I never knew existed. Mwanzo is legit, watu wangu.',
    rating: 5,
  },
  {
    id: 'testimonial-4',
    name: 'Akinyi Odhiambo',
    avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=200&h=200&fit=crop&crop=face',
    jobTitle: 'Graphic Designer',
    company: 'Moringa School',
    courseCompleted: 'Professional Graphic Design Masterclass',
    quote: 'Mwanzo ilinisaidia sana! I learned Figma and Canva, now I design for Moringa School. From Mathare to professional designer - my mum is so proud!',
    rating: 5,
  },
];

// Tutor reviews
export const tutorReviews = [
  {
    id: 'tr-1',
    tutorId: 'tutor-1',
    userName: 'Michael Otieno',
    userAvatar: 'https://ui-avatars.com/api/?name=MO&background=0d9488&color=fff',
    rating: 5,
    comment: 'Janet is an exceptional instructor. Her real-world experience at Safaricom really shows in her teaching. She explains complex marketing concepts in simple terms.',
    date: '1 week ago',
  },
  {
    id: 'tr-2',
    tutorId: 'tutor-1',
    userName: 'Faith Njoroge',
    userAvatar: 'https://ui-avatars.com/api/?name=FN&background=0d9488&color=fff',
    rating: 5,
    comment: 'I tripled my business sales after taking Janet\'s digital marketing course. She genuinely cares about her students success.',
    date: '2 weeks ago',
  },
  {
    id: 'tr-3',
    tutorId: 'tutor-2',
    userName: 'Brian Kamau',
    userAvatar: 'https://ui-avatars.com/api/?name=BK&background=0d9488&color=fff',
    rating: 5,
    comment: 'Dr. Ochieng makes AI accessible to everyone. I never thought I could understand machine learning, but his teaching made it click.',
    date: '3 days ago',
  },
  {
    id: 'tr-4',
    tutorId: 'tutor-3',
    userName: 'Anne Wambui',
    userAvatar: 'https://ui-avatars.com/api/?name=AW&background=0d9488&color=fff',
    rating: 5,
    comment: 'Mary is patient and thorough. The projects in her web development course prepared me for real job interviews. Now I work at a top tech company!',
    date: '1 month ago',
  },
];

// Mock User
export const mockUser: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0d9488&color=fff',
  role: 'student',
  enrolledCourses: [],
  completedCourses: [],
  certificates: [],
};

// Mock Business User
export const mockBusinessUser: User = {
  id: 'business-1',
  name: 'TechHub Admin',
  email: 'admin@techhub.co.ke',
  avatar: 'https://ui-avatars.com/api/?name=TH&background=0d9488&color=fff',
  role: 'business',
  enrolledCourses: [],
  completedCourses: [],
  certificates: [],
  companyName: 'TechHub Nairobi',
  postedJobs: ['job-1'],
};

// Reviews for courses
export const courseReviews = [
  {
    id: 'review-1',
    courseId: 'course-1',
    userName: 'James Mwangi',
    userAvatar: 'https://ui-avatars.com/api/?name=JM&background=0d9488&color=fff',
    rating: 5,
    comment: 'Excellent course! Janet explains complex marketing concepts in a way that\'s easy to understand. The Kenyan context made it even more relevant.',
    date: '2 weeks ago',
    helpful: 45,
  },
  {
    id: 'review-2',
    courseId: 'course-1',
    userName: 'Ann Nyambura',
    userAvatar: 'https://ui-avatars.com/api/?name=AN&background=0d9488&color=fff',
    rating: 4,
    comment: 'Great content and practical examples. I immediately applied what I learned to my small business and saw results within weeks.',
    date: '1 month ago',
    helpful: 32,
  },
  {
    id: 'review-3',
    courseId: 'course-3',
    userName: 'Kevin Otieno',
    userAvatar: 'https://ui-avatars.com/api/?name=KO&background=0d9488&color=fff',
    rating: 5,
    comment: 'Mary is an amazing instructor. The projects are challenging but she provides great support. I landed my first dev job after completing this course!',
    date: '3 weeks ago',
    helpful: 67,
  },
];
