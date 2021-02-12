<script>
import { Pie } from 'vue-chartjs';

export default {
    extends: Pie,
    name: 'chart',
    data() {
        return {
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Pie Dataset',
                        data: [],
                        backgroundColor: [],
                        borderColor: [],
                        borderWidth: 1
                    },
                ]
            },
            options: {responsive: true},
        }
    },

}
</script>

<style>

</style>