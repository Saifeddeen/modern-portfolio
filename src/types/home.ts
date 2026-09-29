import type { Service } from './general'

export type { Service }

export interface HeroData {
    person_name: string;
    job_title: string;
    bio: string;
    cta_text: string;
    cta_link: string;
    profile_image: string | null;
}

export interface TopProject {
    id: number;
    name: string;
    hero_image: string;
    owner: string;
    short_description: string;
    skills: string[];
}

export interface Skill {
    id: number;
    logo: string; // Iconify name or URL
    title: string;
    short_description: string;
}