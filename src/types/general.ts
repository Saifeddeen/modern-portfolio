export type SupportedLocale = 'en' | 'ar' | 'tr';

export interface ApiResponse<T> {
    status: 'success' | 'error';
    message: string;
    data: T | null;
    errors?: Record<string, string[]>;
}

export interface SiteSettings {
    title: string | null;
    logo: string | null;
    name: string;
    job_title: string;
    bio: string | null;
    avatar: string | null;
    cv_link?: string | null;
}

export interface Skill {
    id: number;
    vue_iconify: string | null;
    svg_icon: string | null;
    name: string;
    short_description: string | null;
}

export interface Service {
    id: number;
    vue_iconify: string | null;
    svg_icon: string | null;
    hero_image: string | null;
    name: string;
    short_description: string | null;
    full_description: string | null;
}

export interface SocialLink {
    id: number;
    platform: string;
    url: string;
    icon: string;
}

export interface ContactInfo {
    phone: string;
    email: string;
    address: string;
}