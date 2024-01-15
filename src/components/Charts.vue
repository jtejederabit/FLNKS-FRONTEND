<script setup lang="ts">
import CurrencyChart from './charts/CurrencyChart.vue';
import TypeChart from './charts/TypeChart.vue';
import EntityChart from './charts/EntityChart.vue';
import Chart from './shared/Chart.vue';
import { ISummary } from '../utils/types/types.ts';
import instance from '../utils/axios.ts';
import { reactive } from 'vue';

const summary = reactive<Omit<ISummary, 'totalBalance'>>({
  distributionByCurrency: {},
  distributionByType: {},
  distributionByEntity: {},
});

instance.get('/getSummary').then(function (response) {
  summary.distributionByCurrency = response.data.distributionByCurrency;
  summary.distributionByType = response.data.distributionByType;
  summary.distributionByEntity = response.data.distributionByEntity;
});
</script>

<template>
  <Chart label="Wealth by Currency">
    <CurrencyChart :distribution-by-currency="summary.distributionByCurrency" />
  </Chart>
  <Chart label="Wealth by Type">
    <TypeChart :distribution-by-type="summary.distributionByType" />
  </Chart>
  <Chart label="Wealth by Entity">
    <EntityChart :distribution-by-entity="summary.distributionByEntity" />
  </Chart>
</template>

<style scoped></style>
