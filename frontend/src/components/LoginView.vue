<template>
    <div :style="{ backgroundImage: 'url(' + bgImage + ')' }">
        <h1>{{ title }}</h1>
    </div>
</template>

<script>
import bgImage from '../assets/background.png';

export default {
    name: 'login',
    data() {
        return {
            title: 'Логинская',
            bgImage,
        };
    },
};
</script>
