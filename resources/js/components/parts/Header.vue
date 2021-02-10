<template>
    <v-app-bar
        app
        color="green"
        dark
    >
        <v-app-bar-nav-icon @click="switchDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title>
            <span class="font-weight-bold">楽楽Kakebo</span>
        </v-toolbar-title>

        <v-tabs
            v-if="hasToken"
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

        <!-- <v-spacer></v-spacer> -->

        <!-- <span
            v-if="hasToken"
            class="userName"
        >
            {{ $store.state.auth.user.name }}さん
        </span> -->

        <!-- <v-btn
            v-if="hasToken"
            color="pink accent-3"
            dark
            depressed
            @click="logout"
        >
            <span class="font-weight-bold">ログアウト</span>
        </v-btn> -->
    </v-app-bar>
</template>

<script>
export default {
    data() {
        return {
            // アクセストークンの有無
            hasToken: window.localStorage.getItem("auth"),

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

    methods: {
        switchDrawer() {
            this.$store.dispatch('switch');
        }
    }
}
</script>

<style scoped>
.v-toolbar__title{
    overflow: visible !important;
    margin-right: 50px !important;
}
.userName{
    display: inline-block;
    width: 10%;
}
</style>