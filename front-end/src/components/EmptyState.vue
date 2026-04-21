<script setup lang="ts">
defineProps<{
  title: string
  message: string
  icon: string
}>()
</script>

<template>
  <v-sheet rounded="xl" class="empty-state pa-8 text-center" border>
    <v-avatar color="primary" variant="tonal" size="64">
      <v-icon :icon="icon" size="32" />
    </v-avatar>
    <div class="text-h6 font-weight-bold mt-4">{{ title }}</div>
    <div class="text-body-1 text-medium-emphasis mt-2">{{ message }}</div>
  </v-sheet>
</template>

<style scoped>
.empty-state {
  border-color: rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.82);
}
</style>
