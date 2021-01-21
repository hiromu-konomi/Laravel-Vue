<template>
    <v-layout row wrap justify-center>
        <v-flex xs5 mt-5>
            <v-card>
                <v-card-actions>
                    <v-flex class="text-center">
                        <v-btn-toggle
                            v-model="selectedForm"
                            mandatory
                        >
                            <v-btn color="blue" text @click="showExForm">支出</v-btn>
                            <v-btn color="red" text @click="showInForm">収入</v-btn>
                        </v-btn-toggle>
                    </v-flex>
                </v-card-actions>

                <v-divider></v-divider>

                <v-card-title>
                    <v-flex class="text-center">
                        <span v-if="exForm" class="font-weight-bold">支出フォーム</span>
                        <span v-if="inForm" class="font-weight-bold">収入フォーム</span>
                    </v-flex>
                </v-card-title>

                <v-spacer></v-spacer>

                <v-card-text>
                    <v-layout row wrap justify-center>
                        <v-flex xs9>
                            <v-form v-if="exForm" ref="test_form">
                                <v-text-field
                                    label="日付："
                                    v-model="exData.expend_date"
                                    :rules="[date_required]"
                                    outlined 
                                    readonly
                                >
                                    <template v-slot:append-outer>
                                        <date-picker v-model="exData.expend_date"></date-picker>
                                    </template>
                                </v-text-field>

                                <v-text-field 
                                    label="項目名："
                                    v-model="exData.expend_name"
                                    :rules="[required, limit_length]"
                                    counter="10"
                                    outlined
                                ></v-text-field>

                                <v-text-field
                                    label="支出額："
                                    v-model.number="exData.expend_price"
                                    :rules="[numberRules.required, numberRules.regex]"
                                    outlined
                                >
                                    <template v-slot:append-outer>円</template>
                                </v-text-field>
                            </v-form>

                            <v-form v-if="inForm" ref="test_form">
                                <v-text-field
                                    label="日付："
                                    v-model="inData.income_date"
                                    :rules="[date_required]"
                                    outlined 
                                    readonly
                                >
                                    <template v-slot:append-outer>
                                        <date-picker v-model="inData.income_date"></date-picker>
                                    </template>
                                </v-text-field>

                                <v-text-field 
                                    label="項目名："
                                    v-model="inData.income_name"
                                    :rules="[required, limit_length]"
                                    counter="10"
                                    outlined
                                ></v-text-field>

                                <v-text-field
                                    label="収入額："
                                    v-model.number="inData.income_price"
                                    :rules="[numberRules.required, numberRules.regex]"
                                    outlined
                                >
                                    <template v-slot:append-outer>円</template>
                                </v-text-field>
                            </v-form>
                        </v-flex>
                    </v-layout>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-flex class="text-center">
                        <v-btn dark depressed @click="submit" color="green">入力</v-btn>
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import DatePicker from './parts/DatePicker.vue';

export default {
    name: "Form",

    components: {
        DatePicker
    },

    data() {
        return {
            // 収支切り替えボタンの選択
            selectedForm: undefined,
            // 支出フォームの表示
            exForm: true,
            // 収入フォームの表示
            inForm: false,

            // 支出フォームに入力された値のオブジェクト
            exData: {},
            // 収入フォームに入力された値のオブジェクト
            inData: {},

            // バリデーション
            date_required: value => !!value || "日付を右横のカレンダーから選択してください",
            required: value => !!value || "項目名を入力してください",
            limit_length: value => value && value.length <= 10 || "10文字以内でお願いします",
            numberRules: {
                required: value => !!value || "金額を入力してください",
                regex: value => /^[0-9０-９]+$/.test(value) || "数字のみしか入力できません",
            },
        }
    },

    methods: {
        showExForm() {
            this.exForm = true;
            this.inForm = false;
        },

        showInForm() {
            this.exForm = false;
            this.inForm = true;
        },

        submit() {
            if (this.$refs.test_form.validate()) {
                if (this.exForm) {
                    axios.post('/api/expends', this.exData).then((res) => {
                        this.$router.push({name:'List'});
                        this.exData = {};
                        this.inData = {};
                    });
                } else if (this.inForm) {
                    axios.post('/api/incomes', this.inData).then((res) => {
                        this.$router.push({name:'List'});
                        this.exData = {};
                        this.inData = {};
                    });
                } else {
                    alert("正常に処理されませんでした");
                }
            }
        }
    },
}
</script>