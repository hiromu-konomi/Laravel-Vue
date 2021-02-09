<template>
    <v-layout row wrap justify-center>
        <v-flex xs5 mt-5>
            <v-card>
                <v-card-title>
                    <v-flex class="text-center">
                        <span class="font-weight-bold">ユーザー登録フォーム</span>
                    </v-flex>
                </v-card-title>

                <v-divider></v-divider>

                <v-card-text class="mgt">
                    <v-layout row wrap justify-center>
                        <v-flex xs9>
                            <v-form ref="form">
                                <v-row>
                                    <v-col>
                                        <v-text-field
                                            prepend-icon="mdi-account"
                                            label="ユーザー名"
                                            v-model="registerForm.name"
                                            outlined
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-text-field
                                            type="email"
                                            prepend-icon="mdi-email"
                                            label="メールアドレス"
                                            v-model="registerForm.email"
                                            :rules="[emailRules]"
                                            outlined
                                        >
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-text-field
                                            :append-icon="toggle.icon"
                                            :type="toggle.type"
                                            outlined
                                            prepend-icon="mdi-lock"
                                            label="パスワード"
                                            v-model="registerForm.password"
                                            :rules="[passwordRules, passwordLimit]"
                                            @click:append="show = !show"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-text-field
                                            :append-icon="toggle.icon"
                                            :type="toggle.type"
                                            outlined
                                            prepend-icon="mdi-lock"
                                            label="確認用パスワード"
                                            v-model="registerForm.password_confirmation"
                                            :rules="[passwordRules, passwordLimit]"
                                            @click:append="show = !show"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-flex>
                        <router-link :to="{ name: 'Login' }" class="mgb">既にアカウントをお持ちの方はこちら</router-link>
                    </v-layout>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-flex class="text-center">
                        <v-btn dark depressed @click="register" color="blue accent-3">
                            <span class="font-weight-bold">登録</span>
                        </v-btn>
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data(){
        return {
            // ユーザー登録フォームに入力された値
            registerForm: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            },
            // 入力値チェック
            emailRules: (value) => !!value || "メールアドレスを入力してください",
            passwordRules: (value) => !!value || "パスワードを入力してください",
            passwordLimit: (value) =>
                /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,15}$/.test(value) ||
                "8文字以上15文字以下で入力してください。ただし半角英小文字大文字数字(特殊記号以外)を含んでください",
            // passwordCheck: (value) => value !== this.registerForm.password || "パスワードと一致しません",
            check: (value) => !!value || "選択してください",
            // 入力されたパスワードの表示/非表示
            show: false,
        }
    },
    computed: {
        toggle() {
            const icon = this.show ? "mdi-eye" : "mdi-eye-off";
            const type = this.show ? "text" : "password";
            return {icon, type};
        },
    },
    methods: {
        register() {
            if (this.$refs.form.validate()) {
                if(this.registerForm.password_confirmation != this.registerForm.password){
                    alert("パスワードと確認用パスワードが一致しません");
                    this.registerForm.password = '';
                    this.registerForm.password_confirmation = '';
                } else {
                    axios.get("/sanctum/csrf-cookie").then(response => {
                        this.$store.dispatch("auth/register", this.registerForm);
                    });
                    localStorage.setItem("auth", "true");
                    this.$router.push({name: "Form"});
                }
            }
        }
    },
}
</script>

<style scoped>
.mgt {
    margin-top: 5%;
}
.mgb {
    margin-bottom: 5%;
}
</style>
