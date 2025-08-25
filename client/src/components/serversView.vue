<template>
    <h1>{{ title }}</h1>
</template>

<script>
import axios from 'axios';

export default {
    name: 'serversView',
    data() {
        return {
            title: 'Список игровых комнат',
            allRooms: [],
        };
    },
    methods: {
        async getAllActiveServers() {
            let response = await axios.get('http://localhost:3000/api/rooms/getInfo');
            this.allRooms = response.data;
            console.log(this.allRooms);
        },
    },
    async beforeMount() {
        await this.getAllActiveServers();
    },
};
</script>
