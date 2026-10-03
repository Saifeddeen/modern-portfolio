export interface ProjectTechnology {
    id: number;
    name: string;
    short_description: string | null;
    vue_iconify: string | null;
    svg_icon: string | null;
}

export interface FeaturedProject {
    slug: string;
    title: string;
    owner: string | null;
    short_description: string | null;
    hero_image: string | null;
    technologies: ProjectTechnology[];
}

export interface PublishedProject {
    id: number;
    slug: string;
    title: string;
    subtitle: string | null;
    owner: string | null;
    short_description: string | null;
    long_description: string | null;
    hero_image: string | null;
    github_link: string | null;
    project_link: string | null;
    start_date: string | null;
    project_date: string | null;
    is_featured: boolean;
    technologies: ProjectTechnology[];
}

export interface ProjectDetail extends PublishedProject {
    gallery_images: string[];
    is_published: boolean;
    services: Array<{
        id: number;
        name: string;
        short_description: string | null;
        full_description: string | null;
        vue_iconify: string | null;
        svg_icon: string | null;
        hero_image: string | null;
    }>;
    skills: Array<{
        id: number;
        title: string;
        description: string | null;
        vue_iconify: string | null;
        svg_icon: string | null;
    }>;
}