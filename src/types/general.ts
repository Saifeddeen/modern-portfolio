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