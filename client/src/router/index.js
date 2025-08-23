import { createRouter, createWebHistory } from 'vue-router';

import Login from '../components/LoginView.vue';
import Profile from '../components/ProfileView.vue';
import Game from '../components/GameView.vue';
import Instruction from '../components/InstructionView.vue';

const routes = [
    { path: '/', component: Login },
    { path: '/profile', component: Profile },
    { path: '/game', component: Game },
    { path: '/instruction', component: Instruction },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
