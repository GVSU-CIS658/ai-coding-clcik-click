<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { getCompanyProfile, searchStocks } from '@/services/finnhub'
import { useWatchlistStore } from '@/stores/watchlist'
import type { StockOption } from '@/types/stocks'

const watchlistStore = useWatchlistStore()
const { featuredStocks, searchTerm } = storeToRefs(watchlistStore)

const searchResults = ref<StockOption[]>([])
const isLoading = ref(false)
const loadError = ref('')

const visibleStocks = computed(() => {
  return searchTerm.value.trim() ? searchResults.value : []
})

async function handleTrack(stock: StockOption) {
  if (watchlistStore.isTracked(stock.symbol)) {
    watchlistStore.removeFromWatchlist(stock.symbol)
    return
  }

  try {
    const profile = await getCompanyProfile(stock.symbol)
    watchlistStore.addToWatchlist({
      symbol: profile.symbol,
      companyName: profile.companyName || stock.companyName,
      sector: profile.sector || stock.sector,
      exchange: profile.exchange || stock.exchange,
    })
  } catch {
    watchlistStore.addToWatchlist(stock)
  }
}

let searchTimer: ReturnType<typeof setTimeout> | undefined

watch(
  searchTerm,
  (value) => {
    loadError.value = ''

    if (searchTimer) {
      clearTimeout(searchTimer)
    }

    if (!value.trim()) {
      searchResults.value = []
      isLoading.value = false
      return
    }

    isLoading.value = true

    searchTimer = setTimeout(async () => {
      try {
        searchResults.value = await searchStocks(value)
      } catch {
        loadError.value = 'Unable to load search results.'
        searchResults.value = []
      } finally {
        isLoading.value = false
      }
    }, 350)
  },
  { immediate: true },
)
</script>

<template>
  <v-card rounded="xl" elevation="0" class="panel-card">
    <v-card-text class="pa-6">
      <div class="text-h5 font-weight-bold">Add Stocks</div>

      <v-text-field
        :model-value="searchTerm"
        label="Search stocks"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        density="comfortable"
        hide-details
        class="search-field mt-4"
        @update:model-value="watchlistStore.setSearchTerm(String($event ?? ''))"
      />

      <div v-if="!searchTerm" class="mt-6 d-flex flex-wrap ga-2">
          <v-chip
            v-for="stock in featuredStocks"
            :key="stock.symbol"
            :color="watchlistStore.isTracked(stock.symbol) ? 'primary' : undefined"
            :variant="watchlistStore.isTracked(stock.symbol) ? 'flat' : 'outlined'"
            rounded="lg"
            @click="handleTrack(stock)"
          >
            {{ stock.symbol }}
          </v-chip>
      </div>

      <v-alert v-if="loadError" type="warning" variant="tonal" class="mt-4">
        {{ loadError }}
      </v-alert>

      <div v-if="isLoading" class="d-flex align-center ga-3 mt-4">
        <v-progress-circular indeterminate size="20" width="2" color="primary" />
          <span class="text-body-2 text-medium-emphasis">Loading results...</span>
      </div>

      <v-list v-if="visibleStocks.length" lines="two" class="mt-6 rounded-xl bg-transparent pa-0">
        <v-list-item
          v-for="stock in visibleStocks"
          :key="stock.symbol"
          rounded="xl"
          class="mb-2 px-3"
        >
          <template #prepend>
            <v-avatar color="secondary" variant="tonal">
              {{ stock.symbol.slice(0, 1) }}
            </v-avatar>
          </template>

          <v-list-item-title class="font-weight-bold">
            {{ stock.symbol }} · {{ stock.companyName }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ stock.sector || 'Stock' }}<template v-if="stock.exchange"> · {{ stock.exchange }}</template>
          </v-list-item-subtitle>

          <template #append>
            <v-btn
              :color="watchlistStore.isTracked(stock.symbol) ? 'error' : 'primary'"
              :prepend-icon="watchlistStore.isTracked(stock.symbol) ? 'mdi-minus' : 'mdi-plus'"
              variant="tonal"
              rounded="xl"
              @click.stop="handleTrack(stock)"
            >
              {{ watchlistStore.isTracked(stock.symbol) ? 'Remove' : 'Track' }}
            </v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.panel-card {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(15, 23, 42, 0.06);
}

.search-field {
  max-width: 360px;
}
</style>
