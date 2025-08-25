import { createRouter, createWebHistory } from 'vue-router';

import Login from '../components/LoginView.vue';
import Profile from '../components/ProfileView.vue';
import Game from '../components/GameView.vue';
import Instruction from '../components/InstructionView.vue';
import Servers from '../components/serversView.vue';

const routes = [
    { path: '/', component: Login },
    { path: '/profile', component: Profile },
    { path: '/game', component: Game },
    { path: '/instruction', component: Instruction },
    { path: '/servers', component: Servers },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
