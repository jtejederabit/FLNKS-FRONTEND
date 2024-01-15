<script setup lang="ts">
import { computed } from 'vue';
import { formatCurrency } from '../../utils/helpers';

const props = defineProps<{
  distributionByCurrency: Record<string, number>;
}>();

const series = computed<number[]>(() =>
  Object.values(props.distributionByCurrency)
);
const chartOptions = computed(() => ({
  labels: Object.keys(props.distributionByCurrency),
  tooltip: {
    y: {
      formatter: function (val: number) {
        return formatCurrency(val);
      },
    },
  },
  legend: {
    position: 'bottom',
  },
}));
</script>

<template>
  <apexchart
    width="380"
    type="pie"
    :options="chartOptions"
    :series="series"
    style="text-align: -webkit-center"
    class="mb-5"
  ></apexchart>
</template>

<style scoped></style>
