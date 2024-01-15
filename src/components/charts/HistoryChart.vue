<script setup lang="ts">
import { computed, ref } from 'vue';
import instance from '../../utils/axios';
import { IHistoricalData} from '../../utils/types/types.ts';
import { formatCurrency } from '../../utils/helpers';

const historicalData = ref<IHistoricalData[]>([]);

instance.get('/getAllInvestments').then(function (response) {
  historicalData.value = response.data.map((item: IHistoricalData) => ({
    year: new Date(item.initial_date).getFullYear(),
    cost: item.cost,
  }));
});

const aggregatedData = computed(() => {
  const aggregation: Record<any, any> = {};

  historicalData.value.forEach((item: IHistoricalData) => {
    if (!aggregation[item.year as keyof typeof aggregation]) {
      aggregation[item.year as keyof typeof aggregation] = 0;
    }
    aggregation[item.year as keyof typeof aggregation] += item.cost;
  });
  return Object.entries(aggregation).map(([year, cost]) => ({ year, cost }));
});

const chartOptions = computed(() => ({
  chart: {
    id: 'historical-cost-chart',
    type: 'line',
    toolbar: {
      show: true,
    },
  },
  yaxis: {
    labels: {
      formatter: (val: number) => formatCurrency(val),
    },
  },
  xaxis: {
    categories: aggregatedData.value.map((item: any) => item.year),
  },
  tooltip: {
    y: {
      formatter: (val: number) => formatCurrency(val),
    },
  },
  legend: {
    position: 'bottom',
  },
}));

const series = computed(() => [
  {
    name: 'Cost',
    data: aggregatedData.value.map((item: any) => item.cost),
  },
]);
</script>

<template>
  <apexchart
    width="100%"
    height="360"
    type="line"
    :options="chartOptions"
    :series="series"
  />
</template>

<style scoped></style>
