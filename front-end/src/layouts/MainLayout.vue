<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'

import AppNavigationDrawer from '@/components/AppNavigationDrawer.vue'

const route = useRoute()
const { mdAndDown } = useDisplay()
const drawer = ref(true)

const navItems = [
  {
    title: 'Home',
    icon: 'mdi-view-dashboard-outline',
    to: '/',
  },
  {
    title: 'Watchlist',
    icon: 'mdi-format-list-bulleted-square',
    to: '/watchlist',
  },
]

const pageTitle = computed(() => String(route.meta.title ?? 'Stock Watch'))

watch(
  mdAndDown,
  (isMobile) => {
    drawer.value = !isMobile
  },
  { immediate: true },
)
</script>

<template>
  <AppNavigationDrawer v-model:drawer="drawer" :items="navItems" />

  <v-app-bar elevation="0" class="app-bar px-2 px-md-6">
    <v-app-bar-nav-icon @click="drawer = !drawer" />

    <div>
      <div class="text-h6 font-weight-bold">{{ pageTitle }}</div>
    </div>
  </v-app-bar>

  <v-main>
    <v-container fluid class="pa-4 pa-md-8">
      <RouterView />
    </v-container>
  </v-main>
</template>

<style scoped>
.app-bar {
  backdrop-filter: blur(14px);
  background: rgba(245, 248, 255, 0.88);
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
}
</style>
