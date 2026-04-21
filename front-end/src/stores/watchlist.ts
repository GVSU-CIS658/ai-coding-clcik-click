import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

import type { StockOption, WatchlistItem } from '@/types/stocks'

const STORAGE_KEY = 'stock-watchlist-items'

const stockCatalog: StockOption[] = [
  { symbol: 'AAPL', companyName: 'Apple Inc.', sector: 'Technology', exchange: 'NASDAQ' },
  { symbol: 'MSFT', companyName: 'Microsoft Corporation', sector: 'Technology', exchange: 'NASDAQ' },
  { symbol: 'NVDA', companyName: 'NVIDIA Corporation', sector: 'Semiconductors', exchange: 'NASDAQ' },
  { symbol: 'AMZN', companyName: 'Amazon.com, Inc.', sector: 'Consumer', exchange: 'NASDAQ' },
  { symbol: 'GOOGL', companyName: 'Alphabet Inc.', sector: 'Communication', exchange: 'NASDAQ' },
  { symbol: 'META', companyName: 'Meta Platforms, Inc.', sector: 'Communication', exchange: 'NASDAQ' },
  { symbol: 'TSLA', companyName: 'Tesla, Inc.', sector: 'Automotive', exchange: 'NASDAQ' },
  { symbol: 'JPM', companyName: 'JPMorgan Chase & Co.', sector: 'Financials', exchange: 'NYSE' },
]

const defaultSymbols = ['AAPL', 'MSFT', 'NVDA']

function getDefaultWatchlist(): WatchlistItem[] {
  return stockCatalog
    .filter((stock) => defaultSymbols.includes(stock.symbol))
    .map((stock) => ({
      ...stock,
      addedAt: new Date().toISOString(),
    }))
}

function loadStoredWatchlist(): WatchlistItem[] {
  if (typeof window === 'undefined') {
    return getDefaultWatchlist()
  }

  const saved = window.localStorage.getItem(STORAGE_KEY)

  if (!saved) {
    return getDefaultWatchlist()
  }

  try {
    const parsed = JSON.parse(saved) as WatchlistItem[]

    return Array.isArray(parsed) && parsed.length > 0 ? parsed : getDefaultWatchlist()
  } catch {
    return getDefaultWatchlist()
  }
}

export const useWatchlistStore = defineStore('watchlist', () => {
  const searchTerm = ref('')
  const watchlist = ref<WatchlistItem[]>(loadStoredWatchlist())

  const featuredStocks = computed(() => stockCatalog.slice(0, 6))

  function isTracked(symbol: string) {
    return watchlist.value.some((item) => item.symbol === symbol)
  }

  function setSearchTerm(value: string) {
    searchTerm.value = value
  }

  function addToWatchlist(stock: StockOption) {
    if (isTracked(stock.symbol)) {
      return false
    }

    watchlist.value.unshift({
      ...stock,
      addedAt: new Date().toISOString(),
    })

    return true
  }

  function removeFromWatchlist(symbol: string) {
    watchlist.value = watchlist.value.filter((item) => item.symbol !== symbol)
  }

  function clearWatchlist() {
    watchlist.value = []
  }

  watch(
    watchlist,
    (items) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
      }
    },
    { deep: true },
  )

  return {
    featuredStocks,
    searchTerm,
    setSearchTerm,
    clearWatchlist,
    removeFromWatchlist,
    addToWatchlist,
    isTracked,
    watchlist,
  }
})
