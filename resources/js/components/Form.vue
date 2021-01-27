<template>
    <v-layout row wrap justify-center>
        <v-flex xs5 mt-5>
            <v-card>
                <v-card-actions>
                    <v-flex class="text-center">
                        <v-btn-toggle
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

                                <v-row align="center" justify="start">
                                    <v-col md="4">
                                        <span class="font-weight-bold">
                                            カテゴリー：
                                            <span v-if="exData.ex_category_id">
                                                {{ showExCategoryName(exData.ex_category_id) }}
                                            </span>
                                        </span>
                                    </v-col>

                                    <v-col md="4">
                                        <ExCategoryEdit/>
                                    </v-col>
                                </v-row>
                                

                                <v-chip-group
                                    v-if="$store.state.category.exCateDatas.length"
                                    v-model="exData.ex_category_id"
                                    mandatory
                                    column
                                >
                                    <v-chip
                                        v-for="eC in $store.state.category.exCateDatas"
                                        :key="eC.id"
                                        :value="eC.id"
                                        :color="eC.ex_category_color"
                                        class="ma-2"
                                        outlined
                                        label
                                    >
                                        {{ eC.ex_category_name }}
                                    </v-chip>
                                </v-chip-group>

                                <span v-else>選択できるカテゴリーがありません。</span>
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

                                <v-row align="center" justify="start">
                                    <v-col md="4">
                                        <span class="font-weight-bold">
                                            カテゴリー：
                                            <span v-if="inData.in_category_id">
                                                {{ showInCategoryName(inData.in_category_id) }}
                                            </span>
                                        </span>
                                    </v-col>

                                    <v-col md="4">
                                        <InCategoryEdit/>
                                    </v-col>
                                </v-row>
                                

                                <v-chip-group
                                    v-if="$store.state.category.inCateDatas.length"
                                    v-model="inData.in_category_id"
                                    mandatory
                                    column
                                >
                                    <v-chip
                                        v-for="iC in $store.state.category.inCateDatas"
                                        :key="iC.id"
                                        :value="iC.id"
                                        :color="iC.in_category_color"
                                        class="ma-2"
                                        outlined
                                        label
                                    >
                                        {{ iC.in_category_name }}
                                    </v-chip>
                                </v-chip-group>

                                <span v-else>選択できるカテゴリーがありません。</span>
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
import ExCategoryEdit from './ExCategoryEdit.vue';
import InCategoryEdit from './InCategoryEdit.vue';

export default {
    name: "Form",

    components: {
        DatePicker,
        ExCategoryEdit,
        InCategoryEdit
    },

    data() {
        return {
            // 支出フォームの表示
            exForm: true,
            // 収入フォームの表示
            inForm: false,

            // 支出フォームに入力された値のオブジェクト
            exData: {},
            // 収入フォームに入力された値のオブジェクト
            inData: {},

            // 支出カテゴリーのオブジェクトの配列
            exCateDatas: [],
            // 収入カテゴリーのオブジェクトの配列
            inCateDatas: [],

            // 選択された支出カテゴリー名
            exCategoryName: '',
            // 選択された収入カテゴリー名
            inCategoryName: '',

            // 入力規則
            date_required: value => !!value || "日付を右横のカレンダーから選択してください",
            required: value => !!value || "項目名を入力してください",
            limit_length: value => value && value.length <= 10 || "10文字以内でお願いします",
            numberRules: {
                required: value => !!value || "金額を入力してください",
                regex: value => /^[0-9０-９]+$/.test(value) || "数字のみしか入力できません",
            },
        }
    },

    computed: {
        showExCategoryName: function() {
            return function(value) {
                this.$store.dispatch('category/setExCateId', value);
                this.exCategoryName = this.$store.getters['category/getExCateName'];
                return this.exCategoryName;
            }
        },

        showInCategoryName: function() {
            return function(value) {
                this.$store.dispatch('category/setInCateId', value);
                this.inCategoryName = this.$store.getters['category/getInCateName'];
                return this.inCategoryName;
            }
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

        async submit() {
            if (this.$refs.test_form.validate()) {
                if (this.exForm) {
                    await axios.post('/api/expends', this.exData);
                    await this.$store.dispatch('payment/getExDatas');
                    await this.$router.push({name:'List'});
                    this.exData = {};
                    this.inData = {};
                } else if (this.inForm) {
                    await axios.post('/api/incomes', this.inData);
                    await this.$store.dispatch('payment/getInDatas');
                    await this.$router.push({name:'List'});
                    this.exData = {};
                    this.inData = {};
                } else {
                    alert("正常に処理されませんでした");
                }
            }
        }
    },
}
</script>