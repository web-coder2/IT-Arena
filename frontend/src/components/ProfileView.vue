<template>
    <!-- Navbar вне основного блока -->
    <Navbar />

    <div class="profile-page dark-theme">
        <!-- Статистика пользователя -->
        <div class="row mb-4 justify-content-center">
            <div class="col-md-4 col-sm-6 mb-3" v-if="user">
                <div class="card stats-card shadow-lg bg-dark text-light">
                    <div class="card-body d-flex flex-column align-items-center">
                        <h5 class="card-title mb-4 text-center">Общая статистика</h5>
                        <div class="stat-item mb-4 w-100">
                            <div class="d-flex justify-content-between mb-2">
                                <span class="stat-label">Всего сыграно игр:</span>
                                <span class="stat-value">{{ user.totalCount }}</span>
                            </div>
                            <div class="progress custom-progress">
                                <div class="progress-bar progress-bar-info" role="progressbar" :style="{ width: user.totalCount + '%' }" :aria-valuenow="user.totalCount" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div class="stat-item mb-4 w-100">
                            <div class="d-flex justify-content-between mb-2">
                                <span class="stat-label">Количество игр:</span>
                                <span class="stat-value">{{ user.countGames }}</span>
                            </div>
                            <div class="progress custom-progress">
                                <div class="progress-bar progress-bar-info" role="progressbar" :style="{ width: user.countGames + '%' }" :aria-valuenow="user.countGames" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div class="stat-item mb-4 w-100">
                            <div class="d-flex justify-content-between mb-2">
                                <span class="stat-label">Побед:</span>
                                <span class="stat-value">{{ user.countWins }}</span>
                            </div>
                            <div class="progress custom-progress">
                                <div class="progress-bar progress-bar-info" role="progressbar" :style="{ width: user.countWins + '%' }" :aria-valuenow="user.countWins" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <p class="registration-date mt-4">Дата регистрации: {{ registrationDate }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Кнопка играть -->
        <div class="text-center mb-4">
            <button class="btn play-btn" @click="startGame">Играть</button>
        </div>
    </div>
</template>

<script>
// Импорт компонента Navbar
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
            alert('Начинаем игру!');
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

/* Карточка с улучшенным дизайном */
.stats-card {
    border-radius: 15px;
    background: linear-gradient(135deg, #2c2c2c, #1a1a1a);
    padding: 20px;
    transition: transform 0.3s, box-shadow 0.3s;
}
.stats-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}
.card-title {
    font-weight: bold;
    font-size: 1.5rem;
    color: #fff;
}
.registration-date {
    font-size: 0.9rem;
    color: #ccc;
}

/* Стили прогрессбаров */
.custom-progress {
    height: 12px;
    border-radius: 6px;
    background-color: #444;
    overflow: hidden;
}
.progress-bar-info {
    background-color: #17a2b8;
}

/* Стили для текста внутри статистики */
.stat-item {
    width: 100%;
}
.stat-label {
    font-size: 0.9rem;
    color: #bbb;
}
.stat-value {
    font-weight: bold;
    font-size: 1rem;
    color: #fff;
}

/* Кнопка "Играть" */
.play-btn {
    padding: 15px 30px;
    font-size: 20px;
    color: #fff;
    background: linear-gradient(45deg, #ff4d4d, #ff1a1a);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
}
.play-btn:hover {
    background: linear-gradient(45deg, #ff1a1a, #ff4d4d);
    transform: scale(1.05);
}
</style>
