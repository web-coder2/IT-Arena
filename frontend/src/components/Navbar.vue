<template>
    <nav class="navbar navbar-expand-md bg-dark navbar-dark">
        <!-- Кнопка для мобильных устройств -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Меню -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/instruction">Инструкция</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/about">О игре</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/history">Моя история игр</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style scoped>
/* Можно дополнительно стилизовать, например: */
.navbar {
    background-color: #191616 !important; /* темный фон */
}
.nav-link {
    color: #fff;
}
</style>
