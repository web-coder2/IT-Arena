<template>
    <div class="d-flex justify-content-center align-items-center vh-100 bg-dark">
        <div class="container p-4 rounded shadow-lg" style="max-width: 500px; background: rgba(34, 34, 34, 0.85)">
            <h1 class="text-center mb-4 text-white">{{ title }}</h1>

            <ul class="nav nav-tabs justify-content-center mb-4" role="tablist">
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: activeTab === 'login' }" @click.prevent="activeTab = 'login'" href="#">Войти</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: activeTab === 'register' }" @click.prevent="activeTab = 'register'" href="#">Регистрация</a>
                </li>
            </ul>

            <div v-if="activeTab === 'login'">
                <form class="needs-validation" @submit.prevent="handleLogin" novalidate>
                    <div class="form-group">
                        <input type="text" class="form-control bg-dark text-light" placeholder="Логин" v-model="loginObject.login" required />
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control bg-dark text-light" placeholder="Пароль" v-model="loginObject.password" required />
                    </div>
                    <button class="btn btn-primary btn-block" type="submit">Войти</button>
                </form>
            </div>

            <div v-if="activeTab === 'register'">
                <form class="needs-validation" @submit.prevent="handleRegister" novalidate>
                    <div class="form-group">
                        <input type="text" class="form-control bg-dark text-light" placeholder="Логин" v-model="registerObject.login" required />
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control bg-dark text-light" placeholder="Имя пользователя" v-model="registerObject.username" required />
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control bg-dark text-light" placeholder="Пароль" v-model="registerObject.password" required />
                    </div>
                    <div class="form-group">
                        <input type="tel" class="form-control bg-dark text-light" placeholder="Телефон" v-model="registerObject.phone" />
                    </div>
                    <button class="btn btn-success btn-block" type="submit">Регистрация</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'login',
    data() {
        return {
            title: 'IT Arena',
            activeTab: 'login',
            loginObject: {
                login: '',
                password: '',
            },
            registerObject: {
                login: '',
                username: '',
                password: '',
                phone: '',
            },
        };
    },
    methods: {
        async handleLogin() {
            try {
                const response = await axios.post('http://localhost:3000/api/users/login', {
                    login: this.loginObject.login,
                    password: this.loginObject.password,
                });
                localStorage.setItem('token', response.data.token);
                this.$router.push('/profile');
            } catch (err) {
                alert('Ошибка входа: ' + (err.response?.data?.message || err.message));
            }
        },
        async handleRegister() {
            try {
                const response = await axios.post('http://localhost:3000/api/users/register', {
                    login: this.registerObject.login,
                    username: this.registerObject.username,
                    password: this.registerObject.password,
                    phone: this.registerObject.phone,
                });
                alert('Регистрация прошла успешно! Войдите в систему.');
                this.activeTab = 'login';
            } catch (err) {
                alert('Ошибка регистрации: ' + (err.response?.data?.message || err.message));
            }
        },
    },
};
</script>
