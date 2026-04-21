<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import EmptyState from '@/components/EmptyState.vue'
import WatchlistTable from '@/components/WatchlistTable.vue'
import { getQuotes } from '@/services/finnhub'
import { useWatchlistStore } from '@/stores/watchlist'
import type { StockQuote } from '@/types/stocks'

const watchlistStore = useWatchlistStore()
const { watchlist } = storeToRefs(watchlistStore)
const quotes = ref<Record<string, StockQuote>>({})
const isRefreshing = ref(false)
const lastRefreshedLabel = computed(() => {
  const timestamps = Object.values(quotes.value)
    .map((quote) => quote.timestamp)
    .filter((timestamp) => Boolean(timestamp))

  if (!timestamps.length) {
    return 'Not refreshed yet'
  }

  const latestTimestamp = Math.max(...timestamps)
  return new Date(latestTimestamp * 1000).toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
})

async function loadQuotes() {
  const symbols = watchlist.value.map((item) => item.symbol)

  if (!symbols.length) {
    quotes.value = {}
    return
  }

  isRefreshing.value = true

  try {
    quotes.value = await getQuotes(symbols)
  } catch {
    quotes.value = {}
  } finally {
    isRefreshing.value = false
  }
}

watch(
  watchlist,
  () => {
    void loadQuotes()
  },
  { deep: true },
)

onMounted(() => {
  void loadQuotes()
})
</script>

<template>
  <div class="d-flex flex-column ga-6">
    <v-sheet rounded="xl" class="watchlist-banner pa-6 pa-md-8">
      <div class="text-overline text-primary font-weight-bold">Watchlist</div>
      <div class="text-h4 font-weight-bold mt-2">Saved stocks</div>
      <div class="text-body-1 text-medium-emphasis mt-3 banner-copy">
        This page shows current quote data for the stocks you saved.
      </div>
      <div class="text-body-2 text-medium-emphasis mt-2">
        Last market update: {{ lastRefreshedLabel }}
      </div>
      <div class="d-flex flex-wrap ga-3 mt-6">
        <v-btn color="primary" variant="tonal" rounded="xl" prepend-icon="mdi-refresh" :loading="isRefreshing" @click="loadQuotes">
          Refresh Quotes
        </v-btn>
        <v-btn
          color="error"
          variant="tonal"
          rounded="xl"
          prepend-icon="mdi-delete-sweep"
          @click="watchlistStore.clearWatchlist"
        >
          Clear Watchlist
        </v-btn>
      </div>
    </v-sheet>

    <WatchlistTable
      v-if="watchlist.length"
      :items="watchlist"
      :quotes="quotes"
      title="Saved Stocks"
      subtitle="Live quote data from Finnhub."
      @remove="watchlistStore.removeFromWatchlist"
    />

    <EmptyState
      v-else
      title="Your watchlist is empty"
      message="Add a few symbols from the Home view and they will stay here for the rest of the session."
      icon="mdi-playlist-plus"
    />
  </div>
</template>

<style scoped>
.watchlist-banner {
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(15, 23, 42, 0.06);
}

.banner-copy {
  max-width: 64ch;
}
</style>
