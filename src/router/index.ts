import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            { path: '', name: 'home', component: () => import('@/views/HomeView.vue') },
            { path: 'projects', name: 'projects', component: () => import('@/views/ProjectsView.vue') },
            { path: 'projects/:slug', name: 'project-detail', component: () => import('@/views/ProjectDetailView.vue'), props: true }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router