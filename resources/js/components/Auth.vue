<template>
    <v-app>
        <Header/>

        <v-main :style="{ background: $vuetify.theme.themes.light.background }">
            <v-container fluid fill-height>
                <router-view/>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import Header from './parts/Header.vue';

export default {
    components: {
        Header
    }
}
</script>