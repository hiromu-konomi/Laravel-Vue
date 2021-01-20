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
                                prepend-icon="mdi-lock"
                                label="パスワード"
                                v-model="password"
                                outlined
                                :rules="[passwordRules, passwordLimit]"
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
                "8文字以上15文字以下で入力してください。ただし半角英小文字大文字数字を含んでください",
        }
    },
}
</script>

<style>

</style>