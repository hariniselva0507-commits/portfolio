export interface IProject {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  screenshots: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'Full Stack' | 'Frontend' | 'Backend' | 'Mobile' | 'Cloud' | 'AI/ML' | 'Other';
  completionDate: string;
  featured: boolean;
  published: boolean;
  keyFeatures: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ISkill {
  _id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Programming Languages' | 'Developer Tools';
  proficiency: number;
  icon: string;
  yearsOfExperience: number;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface IExperience {
  _id: string;
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  locationType: 'Remote' | 'Hybrid' | 'On-site';
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  startDate: string;
  endDate?: string;
  isCurrentRole: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface IEducation {
  _id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  grade?: string;
  description?: string;
  achievements: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICertification {
  _id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  badgeImage?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface IService {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  features: string[];
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  tags: string[];
  readTimeMinutes: number;
  published: boolean;
  publishedAt?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface IMediaFile {
  fileName: string;
  fileUrl: string;
  size: number;
  createdAt: string;
  isImage: boolean;
  isPdf: boolean;
}

export interface ISocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  leetcode?: string;
  instagram?: string;
  youtube?: string;
  medium?: string;
}

export interface IProfile {
  _id: string;
  fullName: string;
  title: string;
  tagline: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
  bio: string;
  shortBio: string;
  avatarUrl: string;
  heroBackgroundUrl?: string;
  email: string;
  phone?: string;
  location: string;
  yearsOfExperience: number;
  completedProjectsCount: number;
  satisfiedClientsCount: number;
  resumeUrl: string;
  socials: ISocialLinks;
  careerGoals: string;
  createdAt: string;
  updatedAt: string;
}

export interface INavMenuItem {
  _id?: string;
  label: string;
  path: string;
  icon?: string;
  enabled: boolean;
  order: number;
}

export interface IWebsiteSettings {
  _id: string;
  siteTitle: string;
  metaDescription: string;
  seoKeywords: string;
  seoOgImage: string;
  logoText: string;
  logoIcon: string;
  faviconUrl: string;
  isAvailableForHire: boolean;
  hireNoticeText: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  defaultTheme: 'dark' | 'light';
  maintenanceMode: boolean;
  footerText: string;
  footerTagline: string;
  copyrightName: string;
  resumeDownloadCount: number;
  navigationMenu: INavMenuItem[];
  createdAt: string;
  updatedAt: string;
}

export interface IContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  replySent: boolean;
  ipAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDashboardStats {
  totalProjects: number;
  featuredProjects: number;
  totalSkills: number;
  totalExperiences: number;
  totalEducation: number;
  totalCertifications: number;
  totalServices: number;
  totalBlogPosts: number;
  publishedBlogPosts: number;
  totalMessages: number;
  unreadMessages: number;
  resumeDownloads: number;
  recentMessages: IContactMessage[];
  recentProjects: Array<{
    _id: string;
    title: string;
    category: string;
    featured: boolean;
    published: boolean;
    createdAt: string;
  }>;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface IAuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: IUser;
}

export interface IPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
