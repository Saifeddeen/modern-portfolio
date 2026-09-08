export type SupportedLocale = 'en' | 'ar' | 'tr';

export interface GeneralData {
    logo: string;
    title: string;
    cv_link: string | null;
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