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
            if (userId) {
                await this.$store.dispatch('payment/getExDatas');
                await this.$store.dispatch('payment/getInDatas');
                await this.$store.dispatch('payment/getExCateDatas', userId);
                await this.$store.dispatch('category/getExCateDatas', userId);
                await this.$store.dispatch('category/getInCateDatas', userId);
                let exDatas = [];
                let inDatas = [];
                for (var exData of this.$store.state.payment.exDatas) {
                    if (exData.ex_category_id) {
                        this.$store.dispatch('category/setExCateId', exData.ex_category_id);
                        exData.ex_category_name = this.$store.getters['category/getExCateName'];
                        exData.ex_category_color = this.$store.getters['category/getExCateColor'];
                        exDatas.push(exData);
                    } else {
                        exDatas.push(exData);
                    }
                }
                for (var inData of this.$store.state.payment.inDatas) {
                    if (inData.in_category_id) {
                        this.$store.dispatch('category/setInCateId', inData.in_category_id);
                        inData.in_category_name = this.$store.getters['category/getInCateName'];
                        inData.in_category_color = this.$store.getters['category/getInCateColor'];
                        inDatas.push(inData);
                    } else {
                        inDatas.push(inData);
                    }
                }
                this.$store.dispatch('payment/setExDatasWithCateDatas', exDatas);
                this.$store.dispatch('payment/setInDatasWithCateDatas', inDatas);
            }
        },

        logout() {
            this.$store.dispatch('auth/logout');
            this.$store.dispatch('switchOff');
            this.$store.dispatch('category/removeCateDatas');
            localStorage.removeItem("auth");
            this.$router.push("/login");
        },
    },
}
</script>