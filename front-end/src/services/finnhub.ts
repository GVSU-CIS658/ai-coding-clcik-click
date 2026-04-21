import type { StockOption, StockQuote } from '@/types/stocks'

const API_BASE = 'https://finnhub.io/api/v1'
const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY

function requireApiKey() {
  if (!API_KEY) {
    throw new Error('Missing VITE_FINNHUB_API_KEY')
  }
}

async function fetchFinnhub<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  requireApiKey()

  const searchParams = new URLSearchParams({
    ...params,
    token: API_KEY,
  })

  const url = `${API_BASE}${path}?${searchParams.toString()}`
  const response = await fetch(url)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(`Finnhub request failed: ${response.status}`)
  }

  return data as T
}

interface FinnhubSearchResponse {
  result: Array<{
    description: string
    displaySymbol: string
    symbol: string
    type: string
  }>
}

interface FinnhubQuoteResponse {
  c: number
  d: number
  dp: number
  h: number
  l: number
  o: number
  pc: number
  t: number
}

interface FinnhubProfileResponse {
  exchange: string
  finnhubIndustry: string
  name: string
  ticker: string
}

export async function searchStocks(query: string): Promise<StockOption[]> {
  const trimmed = query.trim()

  if (!trimmed) {
    return []
  }

  const data = await fetchFinnhub<FinnhubSearchResponse>('/search', { q: trimmed })

  return data.result
    .filter((item) => {
      const symbol = item.displaySymbol || item.symbol

      return (
        Boolean(symbol) &&
        Boolean(item.description) &&
        !symbol.includes('.') &&
        !symbol.includes(':')
      )
    })
    .slice(0, 8)
    .map((item) => ({
      symbol: item.displaySymbol || item.symbol,
      companyName: item.description,
      sector: item.type || 'Stock',
    }))
}

export async function getQuote(symbol: string): Promise<StockQuote> {
  const data = await fetchFinnhub<FinnhubQuoteResponse>('/quote', { symbol })

  return {
    currentPrice: data.c ?? 0,
    change: data.d ?? 0,
    percentChange: data.dp ?? 0,
    high: data.h ?? 0,
    low: data.l ?? 0,
    open: data.o ?? 0,
    previousClose: data.pc ?? 0,
    timestamp: data.t ?? 0,
  }
}

export async function getQuotes(symbols: string[]): Promise<Record<string, StockQuote>> {
  const uniqueSymbols = [...new Set(symbols)].filter(Boolean)

  const results = await Promise.allSettled(
    uniqueSymbols.map(async (symbol) => [symbol, await getQuote(symbol)] as const),
  )

  return Object.fromEntries(
    results
      .filter((result) => result.status === 'fulfilled')
      .map((result) => result.value),
  )
}

export async function getCompanyProfile(symbol: string): Promise<StockOption> {
  const data = await fetchFinnhub<FinnhubProfileResponse>('/stock/profile2', { symbol })

  return {
    symbol: data.ticker || symbol,
    companyName: data.name || symbol,
    exchange: data.exchange || '',
    sector: data.finnhubIndustry || 'Stock',
  }
}
