export interface ServicePackage {
  title: string;
  price: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
}

export interface AddonService {
  title: string;
  price: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface PortfolioItem {
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Author {
  id: string;
  name: string;
  imageUrl: string;
  bio: string;
}

export interface BlogPost {
  slug: string;
  title:string;
  authorId: string;
  date: string;
  imageUrl: string;
  excerpt: string;
  content: React.ReactNode;
  tags?: string[];
}