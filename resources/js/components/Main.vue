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
    },
}
</script>