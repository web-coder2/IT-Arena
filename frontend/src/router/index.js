import { createRouter, createWebHistory } from 'vue-router';

import Login from '../components/LoginView.vue';
import Profile from '../components/ProfileView.vue';

const routes = [
    { path: '/', component: Login },
    { path: '/profile', component: Profile },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
