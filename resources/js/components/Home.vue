<template>
    <v-app>
        <v-app-bar
            app
            color="green"
            dark
        >
            <v-toolbar-title>
                <span class="font-weight-bold">楽楽Kakebo</span>
            </v-toolbar-title>

            <v-tabs
                v-model="tab"
            >
                <v-tab
                    v-for="item in items"
                    :key="item.tab"
                    :to="item.link"
                >
                    {{ item.tab }}
                </v-tab>
            </v-tabs>
        </v-app-bar>

        <v-main :style="{ background: $vuetify.theme.themes.light.background }">
            <v-container fluid fill-height>
                <router-view/>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: "Home",

    data() {
        return {
            // 選択しているタブ
            tab: '入力',

            // それぞれのタブの情報リスト
            items: [
                { tab: '入力', link: {name: "Form"} },
                { tab: '一覧', link: {name: "List"} },
                { tab: 'レポート', link: {name: "Report"} },
                { tab: 'カレンダー', link: {name: "Calendar"} },
            ],
        }
    },

    async created() {
        await this.refresh();
    },

    methods: {
        async refresh() {
            await this.$store.dispatch('payment/getExDatas');
            await this.$store.dispatch('payment/getInDatas');
            await this.$store.dispatch('category/getExCateDatas');
            await this.$store.dispatch('category/getInCateDatas');
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
    }
}
</script>

<style lang="scss" scoped>
.v-toolbar__title{
    overflow: visible !important;
    margin-right: 50px !important;
}
</style>