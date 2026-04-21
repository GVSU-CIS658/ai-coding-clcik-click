<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import StockQuickAdd from '@/components/StockQuickAdd.vue'
import WatchlistTable from '@/components/WatchlistTable.vue'
import { getQuotes } from '@/services/finnhub'
import { useWatchlistStore } from '@/stores/watchlist'
import type { StockQuote } from '@/types/stocks'

const watchlistStore = useWatchlistStore()
const { watchlist } = storeToRefs(watchlistStore)

const previewItems = computed(() => watchlist.value.slice(0, 5))
const quotes = ref<Record<string, StockQuote>>({})

async function loadHomeData() {
  const symbols = previewItems.value.map((item) => item.symbol)

  try {
    quotes.value = symbols.length ? await getQuotes(symbols) : {}
  } catch {
    quotes.value = {}
  }
}

watch(
  previewItems,
  () => {
    void loadHomeData()
  },
  { deep: true },
)

onMounted(() => {
  void loadHomeData()
})
</script>

<template>
  <div class="d-flex flex-column ga-6">
    <StockQuickAdd />

    <WatchlistTable
      :items="previewItems"
      :quotes="quotes"
      @remove="watchlistStore.removeFromWatchlist"
    />
  </div>
</template>
