<script setup lang="ts">
import { useRoute } from 'vue-router'

interface NavItem {
  title: string
  icon: string
  to: string
}

const route = useRoute()

const props = defineProps<{
  drawer: boolean
  items: NavItem[]
}>()

const emit = defineEmits<{
  'update:drawer': [value: boolean]
}>()
</script>

<template>
  <v-navigation-drawer
    :model-value="props.drawer"
    width="280"
    elevation="0"
    border="0"
    color="secondary"
    @update:model-value="emit('update:drawer', $event)"
  >
    <div class="pa-4">
      <div class="text-h6 font-weight-bold">Stock Watchlist</div>
    </div>

    <v-divider class="border-opacity-25" />

    <v-list nav class="pa-2">
      <v-list-item
        v-for="item in props.items"
        :key="item.to"
        :prepend-icon="item.icon"
        :title="item.title"
        :to="item.to"
        :active="item.to === '/' ? route.path === '/' : route.path.startsWith(item.to)"
        rounded="xl"
        color="primary"
      />
    </v-list>
  </v-navigation-drawer>
</template>
