export interface StockOption {
  symbol: string
  companyName: string
  sector?: string
  exchange?: string
}

export interface WatchlistItem extends StockOption {
  addedAt: string
}

export interface StockQuote {
  currentPrice: number
  change: number
  percentChange: number
  high: number
  low: number
  open: number
  previousClose: number
  timestamp: number
}
