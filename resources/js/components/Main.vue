<template>
    <v-app>
        <Header/>

        <v-navigation-drawer
            v-model="$store.state.drawer"
            fixed
            temporary
        >
            <v-list
                nav
                dense
            >
                <v-list-item-title>
                    <span
                        v-if="hasToken"
                        class="userName"
                    >
                        {{ $store.state.auth.user.name }}さん
                    </span>
                </v-list-item-title>
                <v-list-item-action>
                    <v-btn
                        v-if="hasToken"
                        color="pink accent-3"
                        dark
                        depressed
                        @click="logout"
                    >
                        <span class="font-weight-bold">ログアウト</span>
                    </v-btn>
                </v-list-item-action>
            </v-list>
        </v-navigation-drawer>

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
    },

    data() {
        return {
            hasToken: window.localStorage.getItem("auth"),
        }
    },

    async created() {
        await this.refresh();
    },

    methods: {
        async refresh() {
            const userId = this.$store.state.auth.user.id
            // 画面がリロードされた場合（ユーザー登録時、ログイン時にはこの時点でまだローカルストレージに userId がセットされてない）
            if (userId) {
                await this.$store.dispatch('payment/getExDatas', userId);
                await this.$store.dispatch('payment/getInDatas', userId);
                await this.$store.dispatch('category/getExCateDatas', userId);
                await this.$store.dispatch('category/getInCateDatas', userId);
            }
        },

        logout() {
            this.$store.dispatch('auth/logout');
            this.$store.dispatch('switchOff');
            this.$store.dispatch('payment/removeDatas');
            this.$store.dispatch('category/removeCateDatas');
            localStorage.removeItem("auth");
            this.$router.push("/login");
        },
    },
}
</script>