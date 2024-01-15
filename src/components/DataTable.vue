<script setup lang="ts">
import { ref } from 'vue';
// @ts-ignore
import Vue3Datatable from '@bhplugin/vue3-datatable';
import '@bhplugin/vue3-datatable/dist/style.css';
import instance from '../utils/axios.ts';
import { formatCurrency } from '../utils/helpers.ts';
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EllipsisHorizontalIcon
} from '@heroicons/vue/24/solid';

const isLoading = ref<boolean>(false);
const cols =
  ref([
    { field: 'isin', title: 'ISIN', width: '90px' },
    { field: 'name', title: 'Name', width: '350px' },
    { field: 'entity', title: 'Entity' },
    { field: 'type', title: 'Type' },
    { field: 'currency', title: 'Currency' },
    { field: 'rate_to_euro', title: 'Rate to Euro' },
    {
      field: 'cost',
      title: 'Cost',
      cellRenderer: (item: any) => {
        return formatCurrency(item.value);
      },
    },
    { field: 'balance', title: 'Balance' },
    { field: 'capital_gain', title: 'Gain' },
    { field: 'number_of_shares', title: 'Shares' },
    { field: 'market', title: 'Market' },
  ]) || [];

const rows = ref([]);

instance.get('/getAllInvestments').then(function (response) {
  isLoading.value = true;
  rows.value = response.data.map((item: any) => {
    return {
      isin: item.isin,
      name: item.name,
      entity: item.entity,
      type: item.type,
      currency: item.currency,
      rate_to_euro: item.rate_to_euro,
      cost: item.cost,
      balance: item.balance,
      capital_gain: item.capital_gain,
      number_of_shares: item.number_of_shares,
      market: item.market,
    };
  });
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});
</script>

<template>
  <vue3-datatable
    :loading="isLoading"
    :rows="rows"
    :columns="cols"
    columnFilter
    class="border rounded-lg border-blue-500 border-opacity-15"
  >
    <template #name="data">
      <strong>{{ data.value.name }}</strong>
    </template>
    <template #currency="data">
      <strong>{{ data.value.currency }}</strong>
    </template>
    <template #entity="data">
      <img
        :src="`/${data.value.entity}.png`"
        :alt="data.value.entity"
        class="w-8 h-8 rounded-full"
      />
    </template>
    <template #cost="data">
      {{ formatCurrency(data.value.cost) }}
    </template>
    <template #balance="data">
      {{ formatCurrency(data.value.balance) }}
    </template>
    <template #capital_gain="data">
      <div class="flex gap-1">
        <ArrowTrendingUpIcon
          v-if="data.value.capital_gain > 0"
          class="w-5 h-5 text-green-500"
        />
        <ArrowTrendingDownIcon
          v-if="data.value.capital_gain < 0"
          class="w-5 h-5 text-red-500"
        />
        <ellipsis-horizontal-icon
          v-if="parseInt(formatCurrency(data.value.capital_gain)) === 0"
          class="w-5 h-5 text-gray-500"
        />

        {{ formatCurrency(data.value.capital_gain) }}
      </div>
    </template>
  </vue3-datatable>
</template>

<style scoped></style>
