<template>
    <v-container>
        <v-layout row justify-center>
            <v-card>
                <v-toolbar-title>ユーザー登録</v-toolbar-title>
                    <v-card-text>
                        <v-form ref="form">
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        prepend-icon="mdi-"
                                        label="ユーザー名"
                                        v-model="name"
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
                                    v-model="passwords"
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
                                    v-model="confrimPasswords"
                                    :rules="[passwordRules, passwordLimit]"
                                    @click:append="show = !show"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <div>
                            <v-btn>登録</v-btn>
                        </div>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data(){
        return {
            emailbody: "",
            password: "",
            confirmPassword: "",
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

    },
}
</script>

<style>

</style>
