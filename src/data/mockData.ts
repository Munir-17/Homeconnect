import { 
  WorkerProfile, 
  EmployerProfile, 
  JobListing, 
  JobApplication, 
  Interview, 
  Conversation, 
  MessageItem, 
  DisputeRecord 
} from '../types';

export const INITIAL_WORKERS: WorkerProfile[] = [
  {
    id: 'worker-1',
    userId: 'user-w1',
    fullName: 'Tendai Moyo',
    age: 32,
    dateOfBirth: '1994-06-12',
    gender: 'Female',
    address: '14 Enterprise Road, Highlands',
    city: 'Harare',
    neighborhood: 'Highlands',
    phoneNumber: '+263 77 234 5678',
    email: 'tendai.moyo@homeconnect.org',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    occupation: 'Senior Housekeeper & Nanny',
    experienceYears: 7,
    skills: [
      'Childcare & Infant Care',
      'Continental Cooking',
      'Deep Cleaning',
      'Laundry & Steam Ironing',
      'First Aid & CPR',
      'Pet Friendly'
    ],
    languages: ['English (Fluent)', 'Shona (Native)'],
    expectedSalary: {
      amount: 450,
      period: 'monthly',
      currency: 'USD'
    },
    preferredEmploymentType: ['Full Time', 'Live-Out'],
    availability: 'Immediate',
    visibility: 'Available for Hire',
    isVerified: true,
    verificationStatus: {
      nationalId: 'verified',
      policeClearance: 'verified',
      referenceLetters: 'verified',
      workHistory: 'verified'
    },
    background: 'I have dedicated 7 years to providing reliable household management and warm, attentive childcare for families. I believe in mutual respect, meticulous cleanliness, and fostering a calm, safe home environment for children to thrive.',
    challenges: 'Balancing evening studies while working full-time. Successfully graduated with my Child Development Certificate through night classes.',
    futurePlans: 'Aspiring to earn a Professional Diploma in Culinary Arts to expand into private chef work for events.',
    certificates: [
      { name: 'Red Cross First Aid & Pediatric CPR', issuer: 'Red Cross Society', year: 2024 },
      { name: 'Early Childhood Development Certificate', issuer: 'City Institute', year: 2022 },
      { name: 'Food Safety & Hygiene Level 2', issuer: 'Hospitality Guild', year: 2023 }
    ],
    references: [
      {
        name: 'Mrs. Claire Henderson',
        relationship: 'Former Employer (3 years)',
        contact: '+263 71 889 0123',
        status: 'Verified',
        notes: 'Tendai cared for our twins from age 2 to 5. Extremely punctual, honest, and became part of the family.'
      },
      {
        name: 'Mr. & Mrs. Taylor',
        relationship: 'Previous Employer (2.5 years)',
        contact: '+263 77 445 6789',
        status: 'Verified',
        notes: 'Exceptional cook, spotless housekeeping, completely trusted with our home keys and valuables.'
      }
    ],
    documents: [
      {
        id: 'doc-101',
        type: 'national_id',
        title: 'National Identity Card (Biometric)',
        documentNumber: 'ID-63-918234-W-42',
        fileUrl: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?auto=format&fit=crop&w=600&q=80',
        fileName: 'tendai_moyo_national_id.pdf',
        uploadDate: '2025-01-15',
        status: 'verified',
        adminNotes: 'Government biometric ID verified with civil registry records.',
        verifiedAt: '2025-01-16'
      },
      {
        id: 'doc-102',
        type: 'police_clearance',
        title: 'CID Police Clearance Certificate',
        documentNumber: 'PCC-2025-09812',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
        fileName: 'police_clearance_tendai_moyo.pdf',
        uploadDate: '2025-02-10',
        status: 'verified',
        adminNotes: 'Clean criminal record check from Criminal Investigation Department. Valid for 12 months.',
        verifiedAt: '2025-02-11'
      },
      {
        id: 'doc-103',
        type: 'reference_letter',
        title: 'Written Reference - Henderson Family',
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
        fileName: 'reference_henderson_family.pdf',
        uploadDate: '2025-02-12',
        status: 'verified',
        adminNotes: 'Verified via voice interview with Claire Henderson on 2025-02-13.',
        verifiedAt: '2025-02-13'
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        employerId: 'emp-1',
        employerName: 'David & Sarah Jenkins',
        employerLocation: 'Highlands',
        workerId: 'worker-1',
        date: '2025-11-20',
        rating: 5,
        reliability: 5,
        punctuality: 5,
        professionalism: 5,
        honesty: 5,
        comment: 'Tendai was a blessing to our household. Her calm nature with our kids and meticulous cleaning gave our family complete peace of mind.',
        jobTitle: 'Housekeeper & Nanny'
      },
      {
        id: 'rev-2',
        employerId: 'emp-4',
        employerName: 'Claire Henderson',
        employerLocation: 'Borrowdale',
        workerId: 'worker-1',
        date: '2025-06-15',
        rating: 4.9,
        reliability: 5,
        punctuality: 5,
        professionalism: 5,
        honesty: 5,
        comment: '3 years of zero issues. Always arrived before 7:30 AM without fail. Trustworthy with home access codes.',
        jobTitle: 'Full-time Domestic Worker'
      }
    ],
    ratingAverage: 4.95,
    completedJobsCount: 14,
    joinedDate: '2024-03-10'
  },
  {
    id: 'worker-2',
    userId: 'user-w2',
    fullName: 'Maria Santos',
    age: 41,
    dateOfBirth: '1985-04-18',
    gender: 'Female',
    address: '22 Glen Helen Way, Borrowdale',
    city: 'Harare',
    neighborhood: 'Borrowdale',
    phoneNumber: '+263 77 888 1234',
    email: 'maria.santos@homeconnect.org',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    occupation: 'Senior Elderly Caregiver & Homemaker',
    experienceYears: 11,
    skills: [
      'Elderly Care & Companionship',
      'Medication Reminders',
      'Mobility Assistance',
      'Special Diet Cooking (Diabetic/Low Sodium)',
      'First Aid & CPR',
      'Palliative Support'
    ],
    languages: ['English (Fluent)', 'Portuguese (Native)', 'Shona (Conversational)'],
    expectedSalary: {
      amount: 520,
      period: 'monthly',
      currency: 'USD'
    },
    preferredEmploymentType: ['Full Time', 'Live-In'],
    availability: 'Immediate',
    visibility: 'Available for Hire',
    isVerified: true,
    verificationStatus: {
      nationalId: 'verified',
      policeClearance: 'verified',
      referenceLetters: 'verified',
      workHistory: 'verified'
    },
    background: 'Over a decade caring for senior citizens with dementia, post-stroke recovery, and mobility challenges. Compassionate, calm demeanor with certified geriatric training.',
    challenges: 'Navigating emotionally challenging end-of-life care for past patients while maintaining steady support for their families.',
    futurePlans: 'Setting up a community caregiver support network and training junior healthcare aides.',
    certificates: [
      { name: 'Certified Geriatric Nursing Assistant (CNA)', issuer: 'National Health Board', year: 2018 },
      { name: 'Dementia & Alzheimer Care Protocol', issuer: 'AgeWell Trust', year: 2021 },
      { name: 'Advanced Life Support & First Aid', issuer: 'Red Cross', year: 2023 }
    ],
    references: [
      {
        name: 'Dr. Arthur Mitchell',
        relationship: 'Son of Patient (4 years)',
        contact: '+263 77 900 4432',
        status: 'Verified',
        notes: 'Maria stayed with my 84-year-old mother until her peaceful passing. Could not recommend anyone higher.'
      }
    ],
    documents: [
      {
        id: 'doc-201',
        type: 'national_id',
        title: 'National Identity Document',
        documentNumber: 'ID-42-109283-Z-81',
        fileUrl: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?auto=format&fit=crop&w=600&q=80',
        fileName: 'maria_santos_id.pdf',
        uploadDate: '2024-11-02',
        status: 'verified',
        adminNotes: 'Verified ID document.',
        verifiedAt: '2024-11-03'
      },
      {
        id: 'doc-202',
        type: 'police_clearance',
        title: 'CID Background Check',
        documentNumber: 'PCC-2024-88412',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
        fileName: 'police_clearance_maria.pdf',
        uploadDate: '2024-11-05',
        status: 'verified',
        adminNotes: 'Clean criminal record check.',
        verifiedAt: '2024-11-06'
      }
    ],
    reviews: [
      {
        id: 'rev-3',
        employerId: 'emp-2',
        employerName: 'Dr. Michelle Ndlovu',
        employerLocation: 'Borrowdale',
        workerId: 'worker-2',
        date: '2025-10-12',
        rating: 5,
        reliability: 5,
        punctuality: 5,
        professionalism: 5,
        honesty: 5,
        comment: 'Maria treated my mother with the utmost dignity and gentleness. Her medical awareness saved us multiple hospital trips.',
        jobTitle: 'Senior Caregiver'
      }
    ],
    ratingAverage: 5.0,
    completedJobsCount: 18,
    joinedDate: '2023-09-14'
  },
  {
    id: 'worker-3',
    userId: 'user-w3',
    fullName: 'Grace Banda',
    age: 28,
    dateOfBirth: '1998-02-14',
    gender: 'Female',
    address: '8 Bath Road, Avondale',
    city: 'Harare',
    neighborhood: 'Avondale',
    phoneNumber: '+263 71 555 9821',
    email: 'grace.banda@homeconnect.org',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    occupation: 'Early Years Infant Nanny & Housekeeper',
    experienceYears: 5,
    skills: [
      'Infant Care & Newborn Routine',
      'Weaning & Toddler Meals',
      'Montessori Activities',
      'Laundry & Sanitization',
      'Potty Training Specialist',
      'CPR Certified'
    ],
    languages: ['English (Fluent)', 'Shona (Fluent)', 'Ndebele (Basic)'],
    expectedSalary: {
      amount: 420,
      period: 'monthly',
      currency: 'USD'
    },
    preferredEmploymentType: ['Full Time', 'Live-In', 'Live-Out'],
    availability: 'Within 1 Week',
    visibility: 'Available for Hire',
    isVerified: true,
    verificationStatus: {
      nationalId: 'verified',
      policeClearance: 'verified',
      referenceLetters: 'verified',
      workHistory: 'verified'
    },
    background: 'Passionate about child development from infancy through preschool. Experienced in sleep training routines, sensory play, and creating a joyful educational environment at home.',
    challenges: 'Overcame early lack of formal accreditation by funding my own certifications through part-time weekend babysitting.',
    futurePlans: 'Completing a distance degree in Primary Education and opening a weekend early-learning playgroup.',
    certificates: [
      { name: 'Montessori Early Childhood Fundamentals', issuer: 'Montessori Centre', year: 2023 },
      { name: 'Infant Nutrition & Allergen Safety', issuer: 'UNICEF Certificate', year: 2024 }
    ],
    references: [
      {
        name: 'Sarah Chiweshe',
        relationship: 'Employer (2 years)',
        contact: '+263 77 333 8910',
        status: 'Verified',
        notes: 'Grace is magical with babies. Kept detailed daily logs of feeding and naps.'
      }
    ],
    documents: [
      {
        id: 'doc-301',
        type: 'national_id',
        title: 'National Identity Document',
        documentNumber: 'ID-08-392102-K-19',
        fileUrl: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?auto=format&fit=crop&w=600&q=80',
        fileName: 'grace_banda_id.pdf',
        uploadDate: '2025-01-20',
        status: 'verified',
        adminNotes: 'ID Verified.',
        verifiedAt: '2025-01-21'
      },
      {
        id: 'doc-302',
        type: 'police_clearance',
        title: 'CID Criminal Record Certificate',
        documentNumber: 'PCC-2025-11029',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
        fileName: 'grace_police_clearance.pdf',
        uploadDate: '2025-01-22',
        status: 'verified',
        adminNotes: 'Clean background check confirmed.',
        verifiedAt: '2025-01-23'
      }
    ],
    reviews: [
      {
        id: 'rev-4',
        employerId: 'emp-3',
        employerName: 'Tinashe & Anesu Chiweshe',
        employerLocation: 'Mount Pleasant',
        workerId: 'worker-3',
        date: '2025-12-05',
        rating: 4.8,
        reliability: 5,
        punctuality: 4.8,
        professionalism: 5,
        honesty: 5,
        comment: 'Grace raised our son through his first year with immense care. Our son took his first steps with her cheering him on.',
        jobTitle: 'Infant Nanny'
      }
    ],
    ratingAverage: 4.88,
    completedJobsCount: 8,
    joinedDate: '2024-05-18'
  },
  {
    id: 'worker-4',
    userId: 'user-w4',
    fullName: 'Blessing Ndlovu',
    age: 36,
    dateOfBirth: '1990-09-08',
    gender: 'Male',
    address: '45 Churchill Avenue, Mount Pleasant',
    city: 'Harare',
    neighborhood: 'Mount Pleasant',
    phoneNumber: '+263 77 412 9001',
    email: 'blessing.ndlovu@homeconnect.org',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    occupation: 'Professional Cook, Butler & Houseman',
    experienceYears: 9,
    skills: [
      'Gourmet & Family Cooking',
      'Formal Table Setting & Banqueting',
      'Inventory & Grocery Management',
      'Garden & Pool Maintenance',
      'Valid Drivers License (Clean Record)',
      'Pet & Security Dog Care'
    ],
    languages: ['English (Fluent)', 'Ndebele (Native)', 'Shona (Fluent)'],
    expectedSalary: {
      amount: 480,
      period: 'monthly',
      currency: 'USD'
    },
    preferredEmploymentType: ['Full Time', 'Live-In'],
    availability: 'Immediate',
    visibility: 'Available for Hire',
    isVerified: true,
    verificationStatus: {
      nationalId: 'verified',
      policeClearance: 'verified',
      referenceLetters: 'verified',
      workHistory: 'verified'
    },
    background: 'Trained in hotel kitchen operations before transitioning to private estate service. Skilled in meal planning, budget control, and maintaining high executive standards.',
    challenges: 'Navigating hospitality layoffs during the 2020 pandemic by building private domestic clients.',
    futurePlans: 'To launch a boutique domestic estate staffing agency for diplomatic residences.',
    certificates: [
      { name: 'Hotel & Catering Operations Diploma', issuer: 'Polytechnic College', year: 2017 },
      { name: 'HACCP Food Safety Standards', issuer: 'Food Standards Agency', year: 2022 }
    ],
    references: [
      {
        name: 'Ambassador S. Khumalo',
        relationship: 'Diplomatic Residence Employer (4 years)',
        contact: '+263 77 123 4567',
        status: 'Verified',
        notes: 'Pristine service during diplomatic banquets. Highly trustworthy.'
      }
    ],
    documents: [
      {
        id: 'doc-401',
        type: 'national_id',
        title: 'National ID Biometric',
        documentNumber: 'ID-29-199283-F-08',
        fileUrl: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?auto=format&fit=crop&w=600&q=80',
        fileName: 'blessing_id.pdf',
        uploadDate: '2024-09-10',
        status: 'verified',
        adminNotes: 'Verified.',
        verifiedAt: '2024-09-12'
      },
      {
        id: 'doc-402',
        type: 'police_clearance',
        title: 'Police Clearance CID',
        documentNumber: 'PCC-2024-90123',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
        fileName: 'police_clearance_blessing.pdf',
        uploadDate: '2024-09-14',
        status: 'verified',
        adminNotes: 'Clean criminal report.',
        verifiedAt: '2024-09-15'
      }
    ],
    reviews: [
      {
        id: 'rev-5',
        employerId: 'emp-1',
        employerName: 'David & Sarah Jenkins',
        employerLocation: 'Highlands',
        workerId: 'worker-4',
        date: '2025-08-14',
        rating: 4.9,
        reliability: 5,
        punctuality: 5,
        professionalism: 5,
        honesty: 5,
        comment: 'Blessing prepared weekend dinner parties for 16 guests effortlessly. Our kitchen was left cleaner than when he started.',
        jobTitle: 'Private Cook'
      }
    ],
    ratingAverage: 4.92,
    completedJobsCount: 12,
    joinedDate: '2024-02-11'
  },
  {
    id: 'worker-5',
    userId: 'user-w5',
    fullName: 'Chipo Mugabe',
    age: 25,
    dateOfBirth: '2001-11-03',
    gender: 'Female',
    address: '19 Robert Mugabe Way, Eastlea',
    city: 'Harare',
    neighborhood: 'Eastlea',
    phoneNumber: '+263 78 991 2233',
    email: 'chipo.mugabe@homeconnect.org',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
    occupation: 'General Housekeeper & Deep Cleaning Assistant',
    experienceYears: 2,
    skills: [
      'Deep Cleaning & Sanitization',
      'Laundry & Window Washing',
      'Organizing Pantries & Closets',
      'Floor Polishing & Tile Care',
      'Eco-Friendly Product Usage'
    ],
    languages: ['English (Conversational)', 'Shona (Native)'],
    expectedSalary: {
      amount: 320,
      period: 'monthly',
      currency: 'USD'
    },
    preferredEmploymentType: ['Full Time', 'Part Time', 'Live-Out'],
    availability: 'Immediate',
    visibility: 'Available for Hire',
    isVerified: false,
    verificationStatus: {
      nationalId: 'pending',
      policeClearance: 'pending',
      referenceLetters: 'pending',
      workHistory: 'unsubmitted'
    },
    background: 'Energetic, detail-oriented worker ready to prove my dependability. Special focus on heavy-duty domestic cleaning, oven detailing, and laundry.',
    challenges: 'Finding opportunities without long corporate references. Looking for an employer who values strong work ethic.',
    futurePlans: 'Attending weekend housekeeping supervisory courses.',
    certificates: [
      { name: 'Certificate in Domestic Hygiene', issuer: 'Vocational Training Centre', year: 2024 }
    ],
    references: [
      {
        name: 'Pastor G. Makoni',
        relationship: 'Community Leader & Character Reference',
        contact: '+263 71 223 3445',
        status: 'Pending Verification',
        notes: 'Chipo is an honest, church-going young woman known for diligence.'
      }
    ],
    documents: [
      {
        id: 'doc-501',
        type: 'national_id',
        title: 'National Identity Card (Scanned)',
        documentNumber: 'ID-63-991203-K-49',
        fileUrl: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?auto=format&fit=crop&w=600&q=80',
        fileName: 'chipo_national_id_scan.pdf',
        uploadDate: '2026-10-12',
        status: 'pending',
        adminNotes: 'In Admin Verification Queue. Awaiting document validation.'
      },
      {
        id: 'doc-502',
        type: 'police_clearance',
        title: 'Police Clearance Application Receipt',
        documentNumber: 'PCC-PENDING-2026',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
        fileName: 'cid_police_slip.pdf',
        uploadDate: '2026-10-13',
        status: 'pending',
        adminNotes: 'Officer checking with Criminal Investigation Department records.'
      }
    ],
    reviews: [],
    ratingAverage: 4.5,
    completedJobsCount: 2,
    joinedDate: '2026-10-01'
  },
  {
    id: 'worker-6',
    userId: 'user-w6',
    fullName: 'Rutendo Sithole',
    age: 34,
    dateOfBirth: '1992-07-25',
    gender: 'Female',
    address: '11 Coronation Ave, Greendale',
    city: 'Harare',
    neighborhood: 'Greendale',
    phoneNumber: '+263 77 662 3344',
    email: 'rutendo.s@homeconnect.org',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    occupation: 'Special Needs Nanny & House Manager',
    experienceYears: 6,
    skills: [
      'Special Needs Childcare (Autism/ADHD)',
      'Behavioral Patience & Structure',
      'Healthy Meal Planning',
      'Homework Assistance',
      'First Aid & Seizure Response',
      'Pet Friendly'
    ],
    languages: ['English (Fluent)', 'Shona (Fluent)', 'Basic Sign Language'],
    expectedSalary: {
      amount: 460,
      period: 'monthly',
      currency: 'USD'
    },
    preferredEmploymentType: ['Full Time', 'Live-Out'],
    availability: 'Within 2 Weeks',
    visibility: 'Available for Hire',
    isVerified: true,
    verificationStatus: {
      nationalId: 'verified',
      policeClearance: 'verified',
      referenceLetters: 'verified',
      workHistory: 'verified'
    },
    background: 'Specialized in supporting families with neurodivergent children. Patient, gentle, and creates visual schedules that reduce anxiety for children.',
    challenges: 'Educating employers on accommodating sensory processing needs.',
    futurePlans: 'Expanding training in pediatric occupational therapy assistance.',
    certificates: [
      { name: 'Special Educational Needs Assistant Cert', issuer: 'Inclusive Education Board', year: 2022 },
      { name: 'Pediatric CPR & Emergency Response', issuer: 'St John Ambulance', year: 2024 }
    ],
    references: [
      {
        name: 'Dr. Evelyn Peters',
        relationship: 'Parent of autistic child (3 years)',
        contact: '+263 77 554 1122',
        status: 'Verified',
        notes: 'Rutendo transformed our home life. Our son made huge developmental strides with her.'
      }
    ],
    documents: [
      {
        id: 'doc-601',
        type: 'national_id',
        title: 'National Identity Card',
        documentNumber: 'ID-12-881923-D-91',
        fileUrl: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?auto=format&fit=crop&w=600&q=80',
        fileName: 'rutendo_id.pdf',
        uploadDate: '2025-03-01',
        status: 'verified',
        adminNotes: 'National ID verified with registry.',
        verifiedAt: '2025-03-02'
      },
      {
        id: 'doc-602',
        type: 'police_clearance',
        title: 'Police Clearance Certificate',
        documentNumber: 'PCC-2025-44211',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
        fileName: 'pcc_rutendo.pdf',
        uploadDate: '2025-03-03',
        status: 'verified',
        adminNotes: 'Clear background record.',
        verifiedAt: '2025-03-04'
      }
    ],
    reviews: [
      {
        id: 'rev-6',
        employerId: 'emp-1',
        employerName: 'David & Sarah Jenkins',
        employerLocation: 'Highlands',
        workerId: 'worker-6',
        date: '2025-09-01',
        rating: 5,
        reliability: 5,
        punctuality: 5,
        professionalism: 5,
        honesty: 5,
        comment: 'Extraordinary patience and empathy. Would recommend Rutendo to any parent needing dedicated attention.',
        jobTitle: 'Special Needs Nanny'
      }
    ],
    ratingAverage: 4.96,
    completedJobsCount: 10,
    joinedDate: '2024-01-20'
  }
];

export const INITIAL_EMPLOYERS: EmployerProfile[] = [
  {
    id: 'emp-1',
    userId: 'user-e1',
    fullName: 'David & Sarah Jenkins',
    companyOrFamilyName: 'The Jenkins Family',
    address: '28 Ridgeway North, Highlands',
    city: 'Harare',
    neighborhood: 'Highlands',
    phoneNumber: '+263 77 111 2233',
    email: 'david.jenkins@homeconnect.org',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    householdInfo: {
      residenceType: 'House / Villa',
      bedrooms: 4,
      numberOfAdults: 2,
      numberOfChildren: 2,
      childrenAges: ['3 years', '6 years'],
      pets: ['1 Golden Retriever (friendly)'],
      specialCareNeeds: 'None. Just active toddler play and nutritious school snacks.'
    },
    employmentPreferences: {
      preferredLanguages: ['English (Fluent)', 'Shona (Fluent)'],
      preferredType: 'Live-Out',
      cookingRequired: true,
      childcareExperienceRequired: true
    },
    subscriptionTier: 'Family Plus',
    verifiedAccount: true,
    joinedDate: '2024-02-01',
    reviewsGiven: [],
    reviewsReceived: [
      {
        id: 'rev-e1',
        workerId: 'worker-1',
        workerName: 'Tendai Moyo',
        employerId: 'emp-1',
        date: '2025-11-25',
        rating: 5,
        respectfulness: 5,
        timelyPayment: 5,
        workEnvironment: 5,
        comment: 'The Jenkins family is wonderful. Pay is always on the 25th of the month on the dot, respectful environment, and warm tea provided every morning.'
      }
    ],
    ratingAverage: 5.0
  },
  {
    id: 'emp-2',
    userId: 'user-e2',
    fullName: 'Dr. Michelle Ndlovu',
    companyOrFamilyName: 'Ndlovu Residence',
    address: '14 Crowhill Road, Borrowdale',
    city: 'Harare',
    neighborhood: 'Borrowdale',
    phoneNumber: '+263 77 999 8877',
    email: 'michelle.ndlovu@homeconnect.org',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
    householdInfo: {
      residenceType: 'House / Villa',
      bedrooms: 5,
      numberOfAdults: 2,
      numberOfChildren: 0,
      childrenAges: [],
      pets: ['None'],
      specialCareNeeds: 'Elderly mother (82 yrs) needing companionship, blood pressure monitoring & gentle mobility assistance.'
    },
    employmentPreferences: {
      preferredLanguages: ['English (Fluent)', 'Ndebele (Native)'],
      preferredType: 'Live-In',
      cookingRequired: true,
      childcareExperienceRequired: false
    },
    subscriptionTier: 'Premium Household',
    verifiedAccount: true,
    joinedDate: '2024-04-12',
    reviewsGiven: [],
    reviewsReceived: [
      {
        id: 'rev-e2',
        workerId: 'worker-2',
        workerName: 'Maria Santos',
        employerId: 'emp-2',
        date: '2025-10-15',
        rating: 4.9,
        respectfulness: 5,
        timelyPayment: 5,
        workEnvironment: 4.8,
        comment: 'Dr. Michelle provides a private en-suite room with Wi-Fi for live-in staff, regular bonuses, and always treats workers as professionals.'
      }
    ],
    ratingAverage: 4.9
  },
  {
    id: 'emp-3',
    userId: 'user-e3',
    fullName: 'Tinashe & Anesu Chiweshe',
    companyOrFamilyName: 'Chiweshe Household',
    address: '34 Quorn Avenue, Mount Pleasant',
    city: 'Harare',
    neighborhood: 'Mount Pleasant',
    phoneNumber: '+263 77 444 3322',
    email: 'tinashe.c@homeconnect.org',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    householdInfo: {
      residenceType: 'Townhouse',
      bedrooms: 3,
      numberOfAdults: 2,
      numberOfChildren: 1,
      childrenAges: ['11 months old'],
      pets: ['None'],
      specialCareNeeds: 'Infant sleep schedule and food weaning.'
    },
    employmentPreferences: {
      preferredLanguages: ['English (Fluent)', 'Shona (Fluent)'],
      preferredType: 'Live-In',
      cookingRequired: false,
      childcareExperienceRequired: true
    },
    subscriptionTier: 'Family Plus',
    verifiedAccount: true,
    joinedDate: '2024-06-19',
    reviewsGiven: [],
    reviewsReceived: [],
    ratingAverage: 4.8
  }
];

export const INITIAL_JOBS: JobListing[] = [
  {
    id: 'job-1',
    employerId: 'emp-1',
    employerName: 'David & Sarah Jenkins',
    employerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    title: 'Full-Time Live-Out Housekeeper & Childcare',
    description: 'We are seeking a warm, trustworthy housekeeper and childminder for our family in Highlands. Duties include everyday cleaning, laundry, healthy meal preparation for 2 children (ages 3 & 6), and walking them to the nearby school bus stop.',
    location: 'Harare',
    neighborhood: 'Highlands',
    salary: {
      amount: 450,
      currency: 'USD',
      period: 'monthly'
    },
    workingHours: '07:30 - 16:30, Monday to Friday',
    employmentType: 'Live-Out',
    requiredSkills: [
      'Childcare & Infant Care',
      'Continental Cooking',
      'Deep Cleaning',
      'Laundry & Steam Ironing',
      'First Aid & CPR'
    ],
    preferredLanguages: ['English (Fluent)', 'Shona (Fluent)'],
    experienceRequiredYears: 3,
    accommodationProvided: false,
    mealsProvided: true,
    status: 'Open',
    createdAt: '2026-10-10',
    applicantsCount: 4,
    isFeatured: true
  },
  {
    id: 'job-2',
    employerId: 'emp-2',
    employerName: 'Dr. Michelle Ndlovu',
    employerAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
    title: 'Compassionate Elderly Caregiver & Homemaker (Live-In)',
    description: 'Looking for an experienced, respectful caregiver for my 82-year-old mother. Private guest cottage with en-suite bath, TV, and meal allowance provided. Duties: companionship, meal preparation according to dietary needs, assistance with light physiotherapy walks, and light housekeeping.',
    location: 'Harare',
    neighborhood: 'Borrowdale',
    salary: {
      amount: 550,
      currency: 'USD',
      period: 'monthly'
    },
    workingHours: 'Full-Time Live-In (5.5 days/week with scheduled rests)',
    employmentType: 'Live-In',
    requiredSkills: [
      'Elderly Care & Companionship',
      'Medication Reminders',
      'Mobility Assistance',
      'Special Diet Cooking (Diabetic/Low Sodium)',
      'First Aid & CPR'
    ],
    preferredLanguages: ['English (Fluent)', 'Ndebele (Native)'],
    experienceRequiredYears: 5,
    accommodationProvided: true,
    mealsProvided: true,
    status: 'Open',
    createdAt: '2026-10-08',
    applicantsCount: 3,
    isFeatured: true
  },
  {
    id: 'job-3',
    employerId: 'emp-3',
    employerName: 'Tinashe & Anesu Chiweshe',
    employerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    title: 'Experienced Infant Nanny for 11-Month-Old Baby',
    description: 'We are first-time working parents in Mount Pleasant seeking a caring infant specialist. Must have proven infant routine skills, sleep routine encouragement, fresh organic baby food preparation, and infant CPR credentials. Dedicated nanny suite provided.',
    location: 'Harare',
    neighborhood: 'Mount Pleasant',
    salary: {
      amount: 480,
      currency: 'USD',
      period: 'monthly'
    },
    workingHours: 'Live-In, Sunday evening to Friday afternoon',
    employmentType: 'Live-In',
    requiredSkills: [
      'Infant Care & Newborn Routine',
      'Weaning & Toddler Meals',
      'Laundry & Sanitization',
      'First Aid & CPR'
    ],
    preferredLanguages: ['English (Fluent)', 'Shona (Fluent)'],
    experienceRequiredYears: 4,
    accommodationProvided: true,
    mealsProvided: true,
    status: 'Open',
    createdAt: '2026-10-11',
    applicantsCount: 2,
    isFeatured: false
  },
  {
    id: 'job-4',
    employerId: 'emp-1',
    employerName: 'David & Sarah Jenkins',
    employerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    title: 'Weekend Deep Cleaning Specialist & Laundry Assistant',
    description: 'Looking for a thorough cleaner for Saturdays (08:00 to 14:00) to assist with thorough window washing, floor scrubbing, oven cleaning, and linen steaming. Great supplementary income.',
    location: 'Harare',
    neighborhood: 'Highlands',
    salary: {
      amount: 40,
      currency: 'USD',
      period: 'daily'
    },
    workingHours: 'Saturdays 08:00 - 14:00',
    employmentType: 'Part Time',
    requiredSkills: [
      'Deep Cleaning',
      'Floor Polishing & Tile Care',
      'Laundry & Steam Ironing'
    ],
    preferredLanguages: ['English (Fluent)', 'Shona (Fluent)'],
    experienceRequiredYears: 2,
    accommodationProvided: false,
    mealsProvided: true,
    status: 'Open',
    createdAt: '2026-10-13',
    applicantsCount: 1,
    isFeatured: false
  }
];

export const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Full-Time Live-Out Housekeeper & Childcare',
    employerId: 'emp-1',
    employerName: 'David & Sarah Jenkins',
    workerId: 'worker-1',
    workerName: 'Tendai Moyo',
    workerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    workerOccupation: 'Senior Housekeeper & Nanny',
    workerExperienceYears: 7,
    workerRating: 4.95,
    workerVerified: true,
    appliedDate: '2026-10-11',
    status: 'Interview Scheduled',
    coverNote: 'Dear Jenkins Family, I live in Highlands just 5 minutes from Ridgeway North. With 7 years of childcare experience and CPR certification, I would love to support your children and maintain your beautiful home.',
    expectedRate: '$450/month',
    matchScore: 96,
    interviewId: 'int-1'
  },
  {
    id: 'app-2',
    jobId: 'job-1',
    jobTitle: 'Full-Time Live-Out Housekeeper & Childcare',
    employerId: 'emp-1',
    employerName: 'David & Sarah Jenkins',
    workerId: 'worker-6',
    workerName: 'Rutendo Sithole',
    workerAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    workerOccupation: 'Special Needs Nanny & House Manager',
    workerExperienceYears: 6,
    workerRating: 4.96,
    workerVerified: true,
    appliedDate: '2026-10-12',
    status: 'Shortlisted',
    coverNote: 'Hello Mr & Mrs Jenkins. I have 6 years in child nurturing, emergency first aid, and structured home routines. Looking forward to meeting you.',
    expectedRate: '$460/month',
    matchScore: 89
  },
  {
    id: 'app-3',
    jobId: 'job-2',
    jobTitle: 'Compassionate Elderly Caregiver & Homemaker (Live-In)',
    employerId: 'emp-2',
    employerName: 'Dr. Michelle Ndlovu',
    workerId: 'worker-2',
    workerName: 'Maria Santos',
    workerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    workerOccupation: 'Senior Elderly Caregiver & Homemaker',
    workerExperienceYears: 11,
    workerRating: 5.0,
    workerVerified: true,
    appliedDate: '2026-10-09',
    status: 'Shortlisted',
    coverNote: 'Dr. Michelle, I have 11 years dedicated experience in geriatric care, mobility support, and diabetic nutrition. I am available for immediate live-in placement.',
    expectedRate: '$520/month',
    matchScore: 98
  },
  {
    id: 'app-4',
    jobId: 'job-3',
    jobTitle: 'Experienced Infant Nanny for 11-Month-Old Baby',
    employerId: 'emp-3',
    employerName: 'Tinashe & Anesu Chiweshe',
    workerId: 'worker-3',
    workerName: 'Grace Banda',
    workerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    workerOccupation: 'Early Years Infant Nanny & Housekeeper',
    workerExperienceYears: 5,
    workerRating: 4.88,
    workerVerified: true,
    appliedDate: '2026-10-12',
    status: 'Under Review',
    coverNote: 'Hello Chiweshe family. As a certified infant care specialist, I love assisting families through the crucial first years of growth and weaning.',
    expectedRate: '$420/month',
    matchScore: 94
  }
];

export const INITIAL_INTERVIEWS: Interview[] = [
  {
    id: 'int-1',
    applicationId: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Full-Time Live-Out Housekeeper & Childcare',
    employerId: 'emp-1',
    employerName: 'David & Sarah Jenkins',
    employerAddress: '28 Ridgeway North, Highlands, Harare',
    workerId: 'worker-1',
    workerName: 'Tendai Moyo',
    date: '2026-10-16',
    time: '10:00 AM',
    type: 'In-Person Home Visit',
    locationOrLink: '28 Ridgeway North, Highlands (Front Gate intercom: Jenkins)',
    status: 'Pending',
    notes: 'Please bring your original physical ID and reference letters. We will have a 30-minute chat and introduce you to the children.',
    createdAt: '2026-10-13'
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participantWorkerId: 'worker-1',
    participantWorkerName: 'Tendai Moyo',
    participantWorkerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    participantEmployerId: 'emp-1',
    participantEmployerName: 'David & Sarah Jenkins',
    participantEmployerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    lastMessage: 'Thank you for the interview invitation! I have confirmed Friday 10:00 AM.',
    lastTimestamp: '2026-10-14 09:15',
    unreadCount: 0,
    relatedJobTitle: 'Full-Time Live-Out Housekeeper & Childcare'
  },
  {
    id: 'conv-2',
    participantWorkerId: 'worker-2',
    participantWorkerName: 'Maria Santos',
    participantWorkerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    participantEmployerId: 'emp-2',
    participantEmployerName: 'Dr. Michelle Ndlovu',
    participantEmployerAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
    lastMessage: 'Good morning Dr. Michelle. I attached my updated Geriatric Nursing certification here.',
    lastTimestamp: '2026-10-13 16:40',
    unreadCount: 1,
    relatedJobTitle: 'Compassionate Elderly Caregiver & Homemaker'
  }
];

export const INITIAL_MESSAGES: MessageItem[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    senderId: 'emp-1',
    senderName: 'Sarah Jenkins',
    senderRole: 'employer',
    recipientId: 'worker-1',
    content: 'Hi Tendai! We were very impressed by your verified background and glowing references from Claire Henderson. Would you be free for an interview at our home this Friday morning?',
    timestamp: '2026-10-13 14:20',
    isRead: true
  },
  {
    id: 'msg-2',
    conversationId: 'conv-1',
    senderId: 'worker-1',
    senderName: 'Tendai Moyo',
    senderRole: 'worker',
    recipientId: 'emp-1',
    content: 'Good day Mrs. Jenkins! Thank you so much for reaching out. Friday 10:00 AM works perfectly for me. I live just up the road in Highlands, so travel will be very easy.',
    timestamp: '2026-10-13 15:05',
    isRead: true
  },
  {
    id: 'msg-3',
    conversationId: 'conv-1',
    senderId: 'emp-1',
    senderName: 'Sarah Jenkins',
    senderRole: 'employer',
    recipientId: 'worker-1',
    content: 'Wonderful! I just sent the formal interview invitation through the platform. Looking forward to meeting you.',
    timestamp: '2026-10-13 15:30',
    isRead: true
  },
  {
    id: 'msg-4',
    conversationId: 'conv-1',
    senderId: 'worker-1',
    senderName: 'Tendai Moyo',
    senderRole: 'worker',
    recipientId: 'emp-1',
    content: 'Thank you for the interview invitation! I have confirmed Friday 10:00 AM.',
    timestamp: '2026-10-14 09:15',
    isRead: true
  }
];

export const INITIAL_DISPUTES: DisputeRecord[] = [
  {
    id: 'disp-1',
    filedBy: 'worker',
    filerName: 'Chipo Mugabe',
    againstName: 'Estate Villa 4',
    jobTitle: 'Deep Cleaning Trial',
    category: 'Non-payment',
    description: 'Completed 8 hours deep cleaning trial on Oct 5th; employer has not disbursed the agreed $35 trial allowance.',
    status: 'Under Investigation',
    filedDate: '2026-10-09',
    resolutionNote: 'Admin Officer contacted employer representative; payment remittance proof requested within 24 hours.'
  },
  {
    id: 'disp-2',
    filedBy: 'employer',
    filerName: 'Mr. Paul Gono',
    againstName: 'Kudzi Nyoni',
    jobTitle: 'Live-In Housekeeper',
    category: 'Attendance',
    description: 'Worker departed home unannounced 3 days into contract without turning over keys.',
    status: 'Resolved',
    filedDate: '2026-09-28',
    resolutionNote: 'Keys safely returned via courier; dispute closed and security record noted.'
  }
];

export const INITIAL_ADMIN_STATS = {
  totalWorkers: 1480,
  totalEmployers: 890,
  activeJobs: 142,
  successfulPlacements: 624,
  verifiedWorkers: 1228,
  premiumSubscribers: 312,
  monthlyRevenueUSD: 28450,
  verificationPassRate: 91.4,
  placementRatePercent: 78.2,
  userGrowth: [
    { month: 'May', workers: 920, employers: 510, placements: 52 },
    { month: 'Jun', workers: 1040, employers: 590, placements: 68 },
    { month: 'Jul', workers: 1180, employers: 670, placements: 84 },
    { month: 'Aug', workers: 1290, employers: 740, placements: 105 },
    { month: 'Sep', workers: 1390, employers: 810, placements: 126 },
    { month: 'Oct', workers: 1480, employers: 890, placements: 142 }
  ],
  revenueBreakdown: [
    { category: 'Employer Subscriptions', amount: 14800, percentage: 52 },
    { category: 'Placement Success Fees', amount: 8900, percentage: 31 },
    { category: 'Background Screening Packs', amount: 3250, percentage: 12 },
    { category: 'Featured Job Boosts', amount: 1500, percentage: 5 }
  ],
  topDemandedSkills: [
    { skill: 'Infant & Childcare', demandCount: 382, percentage: 84 },
    { skill: 'Elderly Care & First Aid', demandCount: 295, percentage: 65 },
    { skill: 'Continental Cooking', demandCount: 260, percentage: 57 },
    { skill: 'Deep Cleaning & Sanitization', demandCount: 230, percentage: 51 },
    { skill: 'Pet Friendly & House Care', demandCount: 180, percentage: 40 }
  ]
};
