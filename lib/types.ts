export interface ClientData {
    userName: string;
    businessName?: string;
    email?: string;
    phone: string;
    bookings : {
        servicePackage: string;
        serviceTitle: string;
        submittedAt: any; // Firestore timestamp
    }[];
}

export interface ServicePackage {
    title: string;
    serviceUrl: string;
    price: string;
    description: string;
    longDescription: string;
    idealFor: string;
    bestFor: string;
    features: string[];
    isFeatured?: boolean;
    isCombo?: boolean;
    savingsNote?: string;
    type?: 'static' | 'dynamic';
}

export interface AddonService {
    title: string;
    price: string;
}

export interface RecurringService {
    title: string;
    price: string;
    description: string;
}

export interface AddonCategory {
    name: string;
    addons: AddonService[];
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
    avatarUrl: string;
}

export interface blogs {
    blogs : string;
    title:string;
    authorId: string;
    date: string;
    imageUrl: string;
    excerpt: string;
    content: React.ReactNode;
    tags?: string[];
    metaTitle: string;
    metaDescription: string;
}

export interface Value {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export interface Difference {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export interface Skill {
    name: string;
    icon: React.ReactNode;
}

export interface Contact {
    name: string;
    value: string;
    icon: React.ReactNode;
    link?: string;
}

export interface TeamMember extends Author {
    title: string;
    skills: Skill[];
    contacts: Contact[];
}

export interface Project {
    name: string;
    description: string;
    image: string;
    link: string;
}