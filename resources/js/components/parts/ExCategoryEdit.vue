<template>
    <v-dialog
        v-model="dialog"
        width="500"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-chip
                color="grey"
                dark
                label
                v-bind="attrs"
                v-on="on"
            >
                カテゴリー編集
            </v-chip>
        </template>

        <v-card>
            <v-card-title>
                <v-layout wrap justify-center>
                    <span class="font-weight-bold">支出カテゴリー編集</span>
                </v-layout>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
                <v-chip-group
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
                        close
                        @click:close="deleteExCategory(eC.id)"
                    >
                        {{ eC.ex_category_name }}
                    </v-chip>
                </v-chip-group>

                <v-divider></v-divider>

                <v-layout row wrap justify-center class="mgt">
                    <v-flex xs10>
                        <v-form ref="test_form">
                            <span class="font-weight-bold">カテゴリー名：{{ exCateData.ex_category_name }}</span>

                            <v-text-field
                                v-model="exCateData.ex_category_name"
                                :rules="[required, limit_length]"
                                placeholder="出費"
                                outlined
                            ></v-text-field>

                            <span class="font-weight-bold" v-if="exCateData.ex_category_color === ''">
                                色：未選択
                            </span>

                            <span class="font-weight-bold" v-else>
                                色：{{ exCateData.ex_category_color }}
                            </span>

                            <v-slide-group
                                v-model="exCateData.ex_category_color"
                                mandatory
                                show-arrows
                                center-active
                            >
                                <v-slide-item
                                    v-for="color in colors"
                                    :key="color"
                                    :value="color"
                                >
                                    <v-btn
                                        class="mx-2"
                                        fab
                                        small
                                        dark
                                        depressed
                                        :color="color"
                                        @click="changeColor(color)"
                                    ></v-btn>
                                </v-slide-item>
                            </v-slide-group>

                            <v-layout justify-center>
                                <v-btn
                                    color="blue accent-3"
                                    class="mgtb"
                                    dark
                                    depressed
                                    @click="addExCategory"
                                >
                                    カテゴリー追加
                                </v-btn>
                            </v-layout>
                        </v-form>
                    </v-flex>
                </v-layout>
            </v-card-text>
            
            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="blue accent-3" text @click="dialog = false">
                    キャンセル
                </v-btn>
            </v-card-actions>
        </v-card>        
    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            // ダイアログの開閉
            dialog: false,

            // フォームに入力された値のオブジェクト
            exCateData: {},

            // 入力規則
            required: value => !!value || "カテゴリー名を入力してください",
            limit_length: value => value && value.length <= 5 || "5文字以内でお願いします",

            // 選択された色
            selectedColor: '',

            // 選択できる色の全種類
            colors: [
                'red',
                'pink',
                'purple',
                'deep-purple',
                'indigo',
                'blue',
                'cyan',
                'teal',
                'green',
                'amber',
                'orange',
                'brown'
            ]
        }
    },

    methods: {
        async refresh() {
            await this.$store.dispatch('category/getExCateDatas');
        },

        async deleteExCategory(id) {
            let count = 0;
            for (var exData of this.$store.state.payment.exDatas) {
                if (count === 0) {
                    if (id === exData.ex_category_id) {
                        alert("このカテゴリーを使用した支出履歴が存在します。\nこのカテゴリーは削除できません。");
                        count++;
                    }
                }
            }
            if (count === 0){
                await axios.delete('/api/ex_categories/' + id);
                await this.refresh();
            }
        },

        changeColor(color) {
            this.exCateData.ex_category_color = color;
        },

        async addExCategory() {
            if (this.$refs.test_form.validate()) {
                await axios.post('/api/ex_categories', this.exCateData);
                this.$refs.test_form.reset();
                await this.refresh();
            }
        }
    }
}
</script>

<style scoped>
.mgt {
    margin-top: 5%;
}
.mgtb {
    margin-top: 7%;
    margin-bottom: 5%;
}
</style>