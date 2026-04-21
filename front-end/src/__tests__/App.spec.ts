import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { useWatchlistStore } from '../stores/watchlist'

describe('watchlist store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds and removes stocks from the watchlist', () => {
    const store = useWatchlistStore()
    const startingCount = store.watchlist.length

    store.addToWatchlist({
      symbol: 'COST',
      companyName: 'Costco Wholesale Corporation',
      sector: 'Consumer',
      exchange: 'NASDAQ',
    })

    expect(store.watchlist.length).toBe(startingCount + 1)
    expect(store.isTracked('COST')).toBe(true)

    store.removeFromWatchlist('COST')

    expect(store.isTracked('COST')).toBe(false)
  })
})
