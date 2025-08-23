<template>
    <!-- Navbar вне основного блока -->
    <Navbar />

    <div class="profile-page dark-theme container-fluid py-4">
        <!-- Статистика пользователя -->
        <div class="row mb-4 justify-content-center">
            <div class="col-12 col-md-10 col-lg-8" v-if="user">
                <div class="card stats-card shadow-lg bg-gradient p-4">
                    <div class="card-body d-flex flex-column align-items-center text-center">
                        <h5 class="card-title mb-4 font-weight-bold text-white">
                            Общая статистика игрока <span class="font-italic text-warning">{{ user.username }}</span>
                        </h5>
                        <!-- Статистика блоков -->
                        <div class="row w-100">
                            <!-- Каждая карточка статистики -->
                            <div class="col-12 col-md-4 mb-3">
                                <div class="card bg-dark text-light h-100 border-0 shadow-sm rounded">
                                    <div class="card-body d-flex flex-column justify-content-center align-items-center p-3">
                                        <h6 class="mb-2 font-weight-semibold">Сумма набранных очков</h6>
                                        <p class="display-4 mb-2">{{ user.totalCount }}</p>
                                        <div class="progress w-100" style="height: 8px">
                                            <div class="progress-bar bg-info" role="progressbar" :style="{ width: user.totalCount + '%' }" :aria-valuenow="user.totalCount" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-4 mb-3">
                                <div class="card bg-dark text-light h-100 border-0 shadow-sm rounded">
                                    <div class="card-body d-flex flex-column justify-content-center align-items-center p-3">
                                        <h6 class="mb-2 font-weight-semibold">Количество игр</h6>
                                        <p class="display-4 mb-2">{{ user.countGames }}</p>
                                        <div class="progress w-100" style="height: 8px">
                                            <div class="progress-bar bg-info" role="progressbar" :style="{ width: user.countGames + '%' }" :aria-valuenow="user.countGames" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-4 mb-3">
                                <div class="card bg-dark text-light h-100 border-0 shadow-sm rounded">
                                    <div class="card-body d-flex flex-column justify-content-center align-items-center p-3">
                                        <h6 class="mb-2 font-weight-semibold">Побед</h6>
                                        <p class="display-4 mb-2">{{ user.countWins }}</p>
                                        <div class="progress w-100" style="height: 8px">
                                            <div class="progress-bar bg-info" role="progressbar" :style="{ width: user.countWins + '%' }" :aria-valuenow="user.countWins" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Дата регистрации -->
                        <p class="mt-4 text-warning font-italic">Дата регистрации: {{ registrationDate }} - В игре {{ timeInGame }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Кнопка играть -->
        <div class="text-center mb-4">
            <button class="btn btn-warning btn-lg font-weight-bold" @click="startGame">Играть</button>
        </div>
    </div>
</template>

<script>
// Импорт компонента Navbar
import dayjs from 'dayjs';
import Navbar from './Navbar.vue';

export default {
    name: 'ProfilePage',
    components: { Navbar },
    data() {
        return {
            user: null,
        };
    },
    computed: {
        registrationDate() {
            if (this.user && this.user.createdAt) {
                const date = new Date(this.user.createdAt);
                return date.toLocaleDateString();
            }
            return '';
        },
        timeInGame() {
            if (this.user && this.user.createdAt) {
                const startDate = dayjs(this.user.createdAt);
                const now = dayjs();

                const daysInGame = now.diff(startDate, 'day') + 1;

                return `${daysInGame} дней`;
            }
            return '';
        },
    },
    beforeMount() {
        const userData = localStorage.getItem('user');
        if (userData) {
            this.user = JSON.parse(userData);
        }
        console.log(this.user);
    },
    methods: {
        startGame() {
            this.$router.push('/game');
        },
    },
};
</script>

<style scoped>
.dark-theme {
    background-color: #121212;
    color: #fff;
    min-height: 100vh;
}

/* Градиент для блока статистики */
.bg-gradient {
    background: linear-gradient(135deg, #2c2c2c, #1a1a1a);
    border-radius: 15px;
}

/* Заголовки внутри карточек */
.card-title {
    font-size: 1.5rem;
}

/* Дата регистрации */
.registration-date {
    font-size: 0.9rem;
}
</style>
