<template>
    <Navbar></Navbar>

    <div class="d-flex justify-content-center" style="height: 100vh; background-color: black; position: relative">
        <!-- Фон, растянутый на всю высоту -->
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: black"></div>

        <!-- Внутренний контейнер для блока с инструкциями -->
        <div class="d-flex flex-column" style="height: 100%; width: 100%; max-width: 1200px; padding-top: 30px; position: relative; z-index: 1">
            <!-- Блок с фоном и ограниченной шириной -->
            <div class="mx-auto" style="background-color: #222; padding: 20px; max-width: 600px">
                <!-- Текст внутри блока -->
                <div class="text-center text-light" style="margin-top: 20px">
                    <h3>Инструкция к игре IT Arena</h3>
                    <p>для того чтобы играть в эту игру следуйте инструкциям</p>
                    <ul class="list-unstyled" style="text-align: left; margin: 0 auto">
                        <li>Зарегестрироваться на сайте IT_Arena.ru</li>
                        <li>перейте в игровую комнату (после клика на кнопку "играть")</li>
                        <li>следовать игровым правилам</li>
                    </ul>
                    <p>правила игры</p>
                    <p>тут есть разные роли персонажи и этапы разработки</p>
                    <p>.....</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from './Navbar.vue';

export default {
    name: 'Instruction',
    components: {
        Navbar,
    },
};
</script>
