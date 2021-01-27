<template>
    <v-row align="center">
        <v-col>
            <v-card>
                <v-card-title>
                    <v-layout justify-center>
                        レポート
                    </v-layout>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-layout justify-center>
                        <div>
                            <p>支出 : {{ $store.getters['payment/sumExpenditure'] }}円</p>
                            <p>収入 : {{ $store.getters['payment/sumIncome'] }}円</p>
                            <p>収支 : {{ $store.getters['payment/sumBalance'] }}円</p>
                        </div>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col>
            <chart />
        </v-col>
    </v-row>
</template>

<script>
import Chart from './parts/Chart';

export default {
    name: "Report",
    components: {
        Chart,
    },
    data() {
        return {
            sumExpenditure: "",
            sumIncome: "",
            sumBalance: "",
        }
    },
}
</script>