<template>
    <v-layout row wrap justify-center>
        <v-flex xs10 mt-5>
            <v-toolbar>
                <v-toolbar-title>支出履歴</v-toolbar-title>

                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>

                <v-spacer></v-spacer>

                <v-btn-toggle
                    v-model="selectedTable"
                    mandatory
                >
                    <v-btn color="blue" text @click="showExTable">支出</v-btn>
                    <v-btn color="red" text @click="showExTable">収入</v-btn>
                </v-btn-toggle>
            </v-toolbar>
            <v-data-table
                :headers="exHeader"
                :items="$store.state.payment.exDatas"
            >
                <template v-slot:items="props">
                    <td class="text-xs-left">{{ props.item.expend_price }}</td>
                    <td class="text-xs-left">{{ props.item.expend_name }}</td>
                    <td class="text-xs-left">{{ props.item.expend_date }}</td>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "List",

    // async created() {
    //     await this.refresh();
    // },

    data() {
        return {
            // 収支切り替えボタンの選択
            selectedTable: undefined,
            // 支出テーブルの表示
            exTable: true,
            // 収入テーブルの表示
            inTable: false,

            // 支出テーブルのカラム設定
            exHeader:[
                { text:"支出額", value:"expend_price" },
                { text:"項目名", value:"expend_name" },
                { text:"日付", value:"expend_date" },
            ],
        }
    },

    methods: {
        async refresh() {
            await this.getExDatas();
        },

        showExTable() {
            this.exTable = true;
            this.inTable = false;
        },

        showInTable() {
            this.exTable = false;
            this.inTable = true;
        },

        ...mapActions(["getExDatas"]),
    }
}
</script>