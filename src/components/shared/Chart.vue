<script setup lang="ts">
defineProps<{
  label: string;
  customClass?: string;
}>();
</script>

<template>
  <div
    class="rounded-lg border bg-card text-card-foreground shadow-sm relative col-span-2 border-blue-500 border-opacity-15"
    :class="customClass"
  >
    <div class="flex flex-col space-y-1.5 p-6 pt-4">
      <h3 class="text-1xl font-semibold leading-none tracking-tight">
        {{ label }}
      </h3>
    </div>
    <div class="p-6 pt-0 pb-0">
      <div class="text-1xl font-bold">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
