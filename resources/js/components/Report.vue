<template>
    <v-row align="center">
        <v-col>
            <v-card>
                <v-card-title>
                    <v-layout justify-center>
                        羅苦羅苦レポート
                    </v-layout>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-layout justify-center>
                        <div>
                            <p>支出 : {{ this.expendForMonth }}円</p>
                            <p>収入 : {{ this.incomeForMonth }}円</p>
                            <p>収支 : {{ this.totalForMonth }}円</p>
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
import Chart from './Chart';

export default {
    name: "Report",
    components: {
        Chart,
    },
    data() {
        return {
            expendForMonth: '10000',
            incomeForMonth: '100000',
            totalForMonth: '90000',
        }
    }
}
</script>