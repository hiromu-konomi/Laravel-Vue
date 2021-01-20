<script>
import { Pie } from 'vue-chartjs';

export default {
    extends: Pie,
    name: 'chart',
    data() {
        return {
            data: {
                labels: ['衣類', '食品', '趣味'],
                datasets: [
                    {
                        label: 'Pie Dataset',
                        data: [10, 60, 30],
                        backgroundColor: [
                            'rgba(54, 162, 100, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)',
                        ],
                        borderColor: [
                            'rgba(54, 162, 100, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1
                    },
                ]
            },
        }
    },
    mounted() {
        this.renderChart(this.data, this.options)
    }
}
</script>

<style>

</style>