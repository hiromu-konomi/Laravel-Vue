<template>
    <v-layout row wrap justify-center>
        <v-flex xs10 mt-5>
            <v-toolbar flat>
                <v-toolbar-title>
                    <span v-if="exTable" class="font-weight-bold">支出一覧</span>
                    <span v-if="inTable" class="font-weight-bold">収入一覧</span>
                </v-toolbar-title>

                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>

                <v-spacer></v-spacer>

                <v-btn-toggle
                    mandatory
                >
                    <v-btn color="blue" text @click="showExTable">支出</v-btn>
                    <v-btn color="red" text @click="showInTable">収入</v-btn>
                </v-btn-toggle>
            </v-toolbar>

            <v-divider></v-divider>

            <v-data-table
                v-if="exTable"
                :headers="exHeader"
                :items="$store.state.payment.exDatas"
                hide-default-footer
            >
                <template v-slot:items="props">
                    <td class="text-xs-left">{{ props.item.expend_price }}</td>
                    <td class="text-xs-left">{{ props.item.expend_name }}</td>
                    <td class="text-xs-left">{{ props.item.expend_date }}</td>
                </template>
            </v-data-table>

            <v-data-table
                v-if="inTable"
                :headers="inHeader"
                :items="$store.state.payment.inDatas"
                hide-default-footer
            >
                <template v-slot:items="props">
                    <td class="text-xs-left">{{ props.item.income_price }}</td>
                    <td class="text-xs-left">{{ props.item.income_name }}</td>
                    <td class="text-xs-left">{{ props.item.income_date }}</td>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    name: "List",

    async created() {
        await this.refresh();
    },

    data() {
        return {
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
            // 収入テーブルのカラム設定
            inHeader:[
                { text:"収入額", value:"income_price" },
                { text:"項目名", value:"income_name" },
                { text:"日付", value:"income_date" },
            ]
        }
    },

    methods: {
        async refresh() {
            await this.$store.dispatch('payment/getExDatas');
            await this.$store.dispatch('payment/getInDatas');
        },

        showExTable() {
            this.exTable = true;
            this.inTable = false;
        },

        showInTable() {
            this.exTable = false;
            this.inTable = true;
        },
    }
}
</script>