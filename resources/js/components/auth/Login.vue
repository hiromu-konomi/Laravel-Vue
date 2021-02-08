<template>
    <v-container>
        <v-layout row wrap justify-center>
            <v-flex xs5 mt-5>
                <v-card>
                    <v-card-title>
                        <v-flex class="text-center">
                            <span class="font-weight-bold">ログインフォーム</span>
                        </v-flex>
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-card-text class="mgt">
                        <v-layout row wrap justify-center>
                            <v-flex xs9>
                                <v-card>{{ this.$store.state.auth.message }}</v-card>
                                <v-form>
                                    <v-text-field
                                        type="email"
                                        prepend-icon="mdi-email"
                                        label="メールアドレス"
                                        v-model="loginForm.email"
                                        outlined
                                        :rules="[emailRules]"
                                    ></v-text-field>
                                    <v-text-field
                                        :append-icon="toggle.icon"
                                        :type="toggle.type"
                                        outlined
                                        prepend-icon="mdi-lock"
                                        label="パスワード"
                                        v-model="loginForm.password"
                                        :rules="[passwordRules, passwordLimit]"
                                        @click:append="show = !show"
                                    ></v-text-field>
                                </v-form>
                            </v-flex>
                            <router-link :to="{ name: 'Register' }" class="mgb">ユーザー登録がお済みでない方はこちら</router-link>
                        </v-layout>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-flex class="text-center">
                            <v-btn dark depressed @click="login" color="blue accent-3">
                                <span class="font-weight-bold">ログイン</span>
                            </v-btn>
                        </v-flex>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            // ログインフォームに入力された値
            loginForm: {
                email: '',
                password: '',
            },
            // 入力値チェック
            emailRules: (value) => !!value || "メールアドレスを入力してください",
            passwordRules: (value) => !!value || "パスワードを入力してください",
            passwordLimit: (value) =>
                /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,15}$/.test(value) ||
                "8文字以上15文字以下で入力してください。ただし半角英小文字大文字数字(特殊記号以外)を含んでください",
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
        login() {
            axios.get("/sanctum/csrf-cookie").then(response => {
                this.$store.dispatch("auth/login", this.loginForm);
                localStorage.setItem("auth", "true");
                if(this.$store.state.auth.message){
                    this.$router.push({name: "Login"});
                }else{
                    this.$router.push({name: "Form"});
                }
            });
        }
    }
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