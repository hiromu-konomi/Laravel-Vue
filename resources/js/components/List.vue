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
                <template v-slot:[`item.expend_price`]="{ item }">
                    <td>{{ item.expend_price | addComma }}円</td>
                </template>
                <template v-slot:[`item.ex_category_name`]="{ item }">
                    <v-chip
                        :color="item.ex_category_color"
                        dark
                    >
                        {{ item.ex_category_name }}
                    </v-chip>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon
                        @click="deleteExItem(item.id)"
                    >
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>

            <v-data-table
                v-if="inTable"
                :headers="inHeader"
                :items="$store.state.payment.inDatas"
                hide-default-footer
            >
                <template v-slot:[`item.income_price`]="{ item }">
                    <td>{{ item.income_price | addComma }}円</td>
                </template>
                <template v-slot:[`item.in_category_name`]="{ item }">
                    <v-chip
                        :color="item.in_category_color"
                        dark
                    >
                        {{ item.in_category_name }}
                    </v-chip>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon
                        @click="deleteInItem(item.id)"
                    >
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    name: "List",

    data() {
        return {
            // 支出テーブルの表示
            exTable: true,
            // 収入テーブルの表示
            inTable: false,

            // 支出テーブルに表示されるデータ
            exDatas: [],
            // 収入テーブルに表示されるデータ
            inDatas: [],

            // 支出テーブルのカラム設定
            exHeader:[
                { text:"支出額", value:"expend_price" },
                { text:"カテゴリー", value:"ex_category_name" },
                { text:"項目名", value:"expend_name" },
                { text:"日付", value:"expend_date" },
                { text:"削除", value:"actions" },
            ],
            // 収入テーブルのカラム設定
            inHeader:[
                { text:"収入額", value:"income_price" },
                { text:"カテゴリー", value:"in_category_name" },
                { text:"項目名", value:"income_name" },
                { text:"日付", value:"income_date" },
                { text:"削除", value:"actions" },
            ]
        }
    },

    methods: {
        showExTable() {
            this.exTable = true;
            this.inTable = false;
        },

        showInTable() {
            this.exTable = false;
            this.inTable = true;
        },

        async deleteExItem(id) {
            await axios.delete('/api/expends/' + id);
            await this.$store.dispatch('payment/getExDatas');
            // 支出データにカテゴリーの名前と色を追加し直す処理
            let exDatas = [];
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
            this.$store.dispatch('payment/setExDatasWithCateDatas', exDatas);
        },

        async deleteInItem(id) {
            await axios.delete('/api/incomes/' + id);
            await this.$store.dispatch('payment/getInDatas');
            // 収入データにカテゴリーの名前と色を追加し直す処理
            let inDatas = [];
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
            this.$store.dispatch('payment/setInDatasWithCateDatas', inDatas);
        },
    },

    filters: {
        addComma(value) {
            return Number(value).toLocaleString();
        }
    }
}
</script>