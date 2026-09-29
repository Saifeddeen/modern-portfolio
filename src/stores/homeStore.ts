import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { HeroData, Service, TopProject, Skill } from '@/types/home'

export const useHomeStore = defineStore('home', () => {
    const hero = ref<HeroData>({
        person_name: 'John Doe',
        job_title: 'Senior Software Engineer & Web Developer',
        bio: 'I build scalable, modern, and high-performance web applications using Vue, Laravel, and TailwindCSS.',
        cta_text: 'View Projects',
        cta_link: '/projects',
        profile_image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John&backgroundColor=1d3172'
    })

    const services = ref<Service[]>([
        { id: 1, vue_iconify: 'lucide:code', svg_icon: null, hero_image: null, name: 'Web Development', short_description: 'Custom, responsive, and scalable web applications tailored to your business needs.', full_description: null },
        { id: 2, vue_iconify: 'lucide:server', svg_icon: null, hero_image: null, name: 'Backend & API', short_description: 'Robust RESTful APIs and microservices using Laravel and PHP best practices.', full_description: null },
        { id: 3, vue_iconify: 'lucide:smartphone', svg_icon: null, hero_image: null, name: 'UI/UX Implementation', short_description: 'Converting designs into pixel-perfect, interactive UIs with Vue and Tailwind.', full_description: null },
        { id: 4, vue_iconify: 'lucide:database', svg_icon: null, hero_image: null, name: 'Database Design', short_description: 'Optimized database schemas and query performance for high-traffic apps.', full_description: null }
    ])

    const topProjects = ref<TopProject[]>([
        { id: 1, name: 'E-Commerce Platform', hero_image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', owner: 'TechCorp', short_description: 'A full-featured e-commerce solution with real-time inventory and payment integration.', skills: ['Vue 3', 'Laravel', 'MySQL'] },
        { id: 2, name: 'SaaS Dashboard', hero_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', owner: 'Analytics Inc', short_description: 'An advanced analytics dashboard with interactive charts and role management.', skills: ['TypeScript', 'Pinia', 'TailwindCSS'] },
        { id: 3, name: 'Portfolio CMS', hero_image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', owner: 'Self', short_description: 'A headless CMS for developers to manage their portfolio projects dynamically.', skills: ['Vue Router', 'Laravel API', 'Sanctum'] }
    ])

    const skills = ref<Skill[]>([
        { id: 1, logo: 'simple-icons:vuedotjs', title: 'Vue 3', short_description: 'Composition API & Pinia' },
        { id: 2, logo: 'simple-icons:laravel', title: 'Laravel', short_description: 'API & Backend Development' },
        { id: 3, logo: 'simple-icons:tailwindcss', title: 'TailwindCSS', short_description: 'Modern Utility-First Styling' },
        { id: 4, logo: 'simple-icons:typescript', title: 'TypeScript', short_description: 'Strict Type-Safe Codebases' },
        { id: 5, logo: 'simple-icons:javascript', title: 'JavaScript', short_description: 'ES6+ Modern Syntax' },
        { id: 6, logo: 'simple-icons:php', title: 'PHP', short_description: 'Backend scripting & OOP' },
        { id: 7, logo: 'simple-icons:mysql', title: 'MySQL', short_description: 'Relational Database Design' },
        { id: 8, logo: 'simple-icons:docker', title: 'Docker', short_description: 'Containerization & DevOps' }
    ])

    return { hero, services, topProjects, skills }
})