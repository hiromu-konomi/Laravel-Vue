<template>
    <v-container>
        <v-layout row wrap justify-center>
            <v-flex xs5 mt-5>
                <v-card class="text-center" id="login">
                    <v-toolbar-title>ログイン</v-toolbar-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                type="email"
                                prepend-icon="mdi-email"
                                label="メールアドレス"
                                v-model="email"
                                outlined
                                :rules="[emailRules]"
                            ></v-text-field>
                            <v-text-field
                                :append-icon="toggle.icon"
                                :type="toggle.type"
                                outlined
                                prepend-icon="mdi-lock"
                                label="パスワード"
                                v-model="password"
                                :rules="[passwordRules, passwordLimit]"
                                @click:append="show = !show"
                            ></v-text-field>
                            <div>
                                <v-btn color="teal lighten-3" @click="Login">ログイン</v-btn>
                            </div>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            emailRules: (value) => !!value || "メールアドレスを入力してください",
            passwordRules: (value) => !!value || "パスワードを入力してください",
            passwordLimit: (value) =>
                /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,15}$/.test(value) ||
                "8文字以上15文字以下で入力してください。ただし半角英小文字大文字数字(特殊記号以外)を含んでください",
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
}
</script>

<style>

</style>