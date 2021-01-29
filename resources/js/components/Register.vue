<template>
    <v-layout row wrap justify-center>
        <v-flex xs5 mt-5>
            <v-card>
                <v-card-title>
                    <v-flex class="text-center">
                        <span class="font-weight-bold">ユーザー登録</span>
                    </v-flex>
                </v-card-title>

                <v-divider></v-divider>

                <v-spacer></v-spacer>

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
                                            v-model="emailbody"
                                            :rules="[emailRules]"
                                            outlined
                                        >
                                            <template v-slot:append-outer> @ </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-select
                                            v-model="domain"
                                            :hint="`@メールの形式はこちらから選んでください`"
                                            :items="items"
                                            item-text="address"
                                            label="domain"
                                            persistent-hint
                                            return-object
                                            single-line
                                        ></v-select>
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
            registerForm: {
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
            emailbody: '',
            domain: { address: 'rakus-partners.co.jp' },
            items: [
                { address: 'rakus-partners.co.jp' },
                { address: 'rakus.co.jp' },
                { address: 'gmail.com' },
                { address: 'yahoo.co.jp' },
            ],
            show: false,
            emailRules: (value) => !!value || "メールアドレスを入力してください",
            passwordRules: (value) => !!value || "パスワードを入力してください",
            passwordLimit: (value) =>
                /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,15}$/.test(value) ||
                "8文字以上15文字以下で入力してください。ただし半角英小文字大文字数字(特殊記号以外)を含んでください",
            check: (value) => !!value || "選択してください",
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
                this.registerForm.email = this.emailbody + '@' + this.domain.address;
                console.log("email = " + this.registerForm.email);
                console.log("password = " + this.registerForm.password);
                console.log("password_confirmation = " + this.registerForm.password_confirmation);
                this.$store.dispatch("auth/register", this.registerForm).then(() => {
                    // this.$router.push({ name: "Form" });
                });
                console.log("token = " + this.$store.state.auth.token);
            }
        }
    },
}
</script>

<style scoped>
.mgt {
    margin-top: 5%;
}
</style>
