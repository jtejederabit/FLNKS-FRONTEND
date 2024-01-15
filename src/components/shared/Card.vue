<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value: string | number;
    label: string;
    scale?: string;
    currency?: string;
    icon?: any;
    iconClass?: string;
    customClass?: string;
  }>(),
  {
    value: 0,
    scale: '',
  }
);

</script>

<template>
  <div
    class="rounded-lg border bg-card text-card-foreground shadow-sm relative col-span-1 border-blue-500 border-opacity-15"
    :class="props.customClass"
  >
    <div class="absolute inset-0 opacity-10 flex justify-end">
      <component :is="props.icon" :class="props.iconClass" />
    </div>
    <div class="flex flex-col space-y-1.5 p-6 pt-4">
      <h3 id="card-label" class="text-1xl font-semibold leading-none tracking-tight">
        {{ props.label }}
      </h3>
    </div>
    <div class="p-6 pb-4 pt-0">
      <div id="card-value" class="text-1xl font-bold">
        {{ props.value }} {{ props.currency }} {{ props.scale }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
