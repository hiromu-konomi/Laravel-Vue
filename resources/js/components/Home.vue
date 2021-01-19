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
    }
}
</script>

<style lang="scss" scoped>
.v-toolbar__title{
    overflow: visible !important;
    margin-right: 50px !important;
}
</style>