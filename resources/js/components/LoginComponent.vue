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
                            ></v-text-field>
                            <v-text-field
                                prepend-icon="mdi-lock"
                                label="パスワード"
                                v-model="password"
                                outlined
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

}
</script>

<style>

</style>