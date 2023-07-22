import { createMemoryHistory, createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import PageAbout from './pages/PageAbout.vue';
import PageHome from './pages/PageHome.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', component: PageHome },
  { path: '/about', component: PageAbout },
];

export const router = (isSSR: boolean) =>
  createRouter({
    history: (isSSR === true ? createMemoryHistory : createWebHistory)(),
    routes,
  });
