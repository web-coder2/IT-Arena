<template>
    <Navbar></Navbar>
    <div class="d-flex vh-100">
        <div class="bg-dark text-white d-flex flex-column p-3 menu" style="width: 15%">
            <h3 class="mb-3 text-center font-italic">Меню игрока</h3>
            <h4 class="text-primary text-center mb-3">Игрок: {{ user.username }}</h4>
            <hr class="custom-hr" />
            <button class="btn btn-danger mb-2 w-100">Взять карту</button>
            <button class="btn btn-danger mb-2 w-100">Взять карту</button>
            <button class="btn btn-danger mb-2 w-100">Взять карту</button>
        </div>

        <div class="planshet flex-fill"></div>
    </div>
</template>

<script>
import Navbar from './Navbar.vue';

export default {
    name: 'GameView',
    components: {
        Navbar,
    },
    data() {
        return {
            title: 'Вкладка играть',
            user: null,
        };
    },
    beforeMount() {
        const userData = localStorage.getItem('user');
        if (userData) {
            this.user = JSON.parse(userData);
        }
    },
};
</script>

<style scoped>
.planshet {
    background-image: url('/public/game.png');
    background-size: cover;
    background-position: center;
    height: 100%;
}

.menu {
    background-color: rgb(19, 17, 17) !important;
}
.custom-hr {
    border: none;
    height: 2px;
    background-color: #ffffff;
    border-radius: 2px;
    margin: 1rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 100%;
    align-self: center;
}
</style>
