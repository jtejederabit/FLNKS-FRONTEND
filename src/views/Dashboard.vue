<script setup lang="ts">
import Summary from '../components/Summary.vue';
import Charts from '../components/Charts.vue';
import DataTable from '../components/DataTable.vue';
import Chart from '../components/shared/Chart.vue';
import HistoryChart from '../components/charts/HistoryChart.vue';
</script>

<template>
  <div class="grid gap-4 md:grid-cols-3 lg:grid-cols-5 md:p-6 p-4">
    <Summary />
  </div>
  <div
    class="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6 p-4 md:p-6 md:pt-0"
  >
    <Charts />
  </div>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-1 p-4 md:p-6 md:pt-0">
    <Chart label="Yearly Total Investment">
      <HistoryChart />
    </Chart>
  </div>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-1 p-4 md:p-6 md:pt-0">
    <DataTable />
  </div>
</template>

<style scoped></style>
