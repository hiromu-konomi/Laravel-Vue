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
            <apexcharts
                type="pie"
                height="400"
                :options="$store.getters['payment/getChartOptions']"
                :series="$store.getters['payment/getExTotalPriceByCategory']"
            >
            </apexcharts>
        </v-col>
    </v-row>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
    name: "Report",
    components: {
        apexcharts: VueApexCharts,
    },
    data:() => ({
        chart:{
            options: {
                labels: [],
                title: {
                    text: '',
                    align: '',
                },
                colors: ['rgba(0, 255, 255, 0.6)', 'rgba(148, 0, 211, 0.6)'],
                stroke: {
                    colors: ['rgba(0, 255, 255, 1)', 'rgba(148, 0, 211, 1)']
                }
            },
            series: [],
        }
    }),
    // mounted() {
    //     const totalExPriceByCategory = [];
    //     const ExBackgroundColor = [];
    //     const ExBorderColor = [];

    //     for(var exCate of this.$store.state.category.exCateDatas) {
    //         const totalExPrice = 0;
    //         for(var ex of this.$store.state.payment.exDatas) {
    //             if(ex.ex_category_id === exCate.id){
    //                 totalExPrice += ex.expend_price;
    //             }else{
    //                 continue;
    //             }
    //         }
    //         totalExPriceByCategory.push(totalExPrice);

    //         if(exCate.ex_category_color === 'red'){
    //             ExBackgroundColor.push('rgba(255, 0, 0, 0.5)');
    //             ExBorderColor.push('rgba(255, 0, 0, 1)');

    //         }else if(exCate.ex_category_color === 'pink'){
    //             ExBackgroundColor.push('rgba(255, 192, 203, 0.5)');
    //             ExBorderColor.push('rgba(255, 192, 203, 1)');

    //         }else if(exCate.ex_category_color === 'purple'){
    //             ExBackgroundColor.push('rgba(128, 0, 128, 0.5)');
    //             ExBorderColor.push('rgba(128, 0, 128, 1)');

    //         }else if(exCate.ex_category_color === 'deep-purple'){
    //             ExBackgroundColor.push('rgba(148, 0, 211, 0.5)');
    //             ExBorderColor.push('rgba(148, 0, 211, 1)');

    //         }else if(exCate.ex_category_color === 'indigo'){
    //             ExBackgroundColor.push('rgba(65, 105, 225, 0.5)');
    //             ExBorderColor.push('rgba(65, 105, 225, 1)');

    //         }else if(exCate.ex_category_color === 'blue'){
    //             ExBackgroundColor.push('rgba(0, 0, 225, 0.5)');
    //             ExBorderColor.push('rgba(0, 0, 225, 1)');

    //         }else if(exCate.ex_category_color === 'cyan'){
    //             ExBackgroundColor.push('rgba(0, 255, 255, 0.5)');
    //             ExBorderColor.push('rgba(0, 255, 211, 1)');

    //         }else if(exCate.ex_category_color === 'teal'){
    //             ExBackgroundColor.push('rgba(0, 128, 128, 0.5)');
    //             ExBorderColor.push('rgba(0, 128, 128, 1)');

    //         }else if(exCate.ex_category_color === 'green'){
    //             ExBackgroundColor.push('rgba(0, 255, 0, 0.5)');
    //             ExBorderColor.push('rgba(0, 255, 0, 1)');

    //         }else if(exCate.ex_category_color === 'amber'){
    //             ExBackgroundColor.push('rgba(240, 230, 140, 0.5)');
    //             ExBorderColor.push('rgba(240, 230, 140, 1)');

    //         }else if(exCate.ex_category_color === 'orange'){
    //             ExBackgroundColor.push('rgba(255, 165, 0, 0.5)');
    //             ExBorderColor.push('rgba(255, 165, 0, 1)');

    //         }else if(exCate.ex_category_color === 'brown'){
    //             ExBackgroundColor.push('rgba(139, 69, 19, 0.5)');
    //             ExBorderColor.push('rgba(139, 69, 19, 1)');
    //         }
    //     }
    //     this.data = totalExPriceByCategory;
    //     this.backgroundColor = ExBackgroundColor;
    //     this.borderColor = ExBorderColor;

    //     var ctx = document.getElementById('myChart');
    //     var myChart = new Chart(ctx, {
    //         type: 'pie',
    //         data: {
    //             labels: '食品',
    //             datasets: [
    //                 {
    //                     label: 'Pie Dataset',
    //                     data: totalExPriceByCategory,
    //                     backgroundColor: ExBackgroundColor,
    //                     borderColor: ExBorderColor,
    //                     borderWidth: 1
    //                 }
    //             ]
    //         }
    //     });
    // }
}
</script>