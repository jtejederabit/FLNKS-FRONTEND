<script setup lang="ts">
import { ref } from 'vue';
import Card from './shared/Card.vue';
import instance from '../utils/axios';
import { getScale, formatCurrency } from '../utils/helpers';
import {
  CurrencyDollarIcon,
  GlobeAltIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/vue/24/solid';

const totalInvestmentAmount = ref<number>(0);
const totalInvestments = ref<number>(0);
const totalBalance = ref<number>(0);

instance.get('/getTotalInvestmentAmount').then(function (response) {
  totalInvestmentAmount.value = response.data;
});

instance.get('/getSummary').then(function (response) {
  totalBalance.value = response.data.totalBalance;
});

instance.get('/getTotalInvestments').then(function (response) {
  totalInvestments.value = response.data;
});
</script>

<template>
  <Card
    label="Total Investment Amount"
    custom-class="lg:col-span-2"
    :value="formatCurrency(totalInvestmentAmount)"
    :scale="getScale(totalInvestmentAmount)"
    :icon="CurrencyDollarIcon"
    currency="€"
    iconClass="h-24 w-24 text-green-500"
  />
  <Card
    label="Total Balance"
    custom-class="lg:col-span-2"
    :value="formatCurrency(totalBalance)"
    :scale="getScale(totalBalance)"
    :icon="ArrowTrendingUpIcon"
    iconClass="h-24 w-24 text-orange-500"
    currency="€"
  />
  <Card
    label="Number of Investments"
    custom-class="lg:col-span-1"
    :value="formatCurrency(totalInvestments)"
    :scale="getScale(totalInvestments)"
    :icon="GlobeAltIcon"
    iconClass="h-24 w-24 text-blue-500"
  />
</template>

<style scoped></style>
