<script setup lang="ts">
import type { WatchlistItem } from '@/types/stocks'
import type { StockQuote } from '@/types/stocks'

defineProps<{
  items: WatchlistItem[]
  quotes?: Record<string, StockQuote>
  title?: string
  subtitle?: string
}>()

const emit = defineEmits<{
  remove: [symbol: string]
}>()
</script>

<template>
  <v-card rounded="xl" elevation="0" class="table-card">
    <v-card-text class="pa-6">
      <div class="d-flex flex-column flex-md-row align-start align-md-center justify-space-between ga-2 mb-4">
        <div>
          <div class="text-h5 font-weight-bold">{{ title ?? 'Tracked Stocks' }}</div>
          <div class="text-body-2 text-medium-emphasis">
            {{ subtitle ?? 'A clean view of the symbols saved in your watchlist.' }}
          </div>
        </div>
        <v-chip color="primary" variant="tonal" rounded="xl">
          {{ items.length }} tracked
        </v-chip>
      </div>

      <v-table>
        <thead>
          <tr>
            <th class="text-left">Symbol</th>
            <th class="text-left">Company</th>
            <th class="text-left">Price</th>
            <th class="text-left">Change</th>
            <th class="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.symbol">
            <td class="font-weight-bold">{{ item.symbol }}</td>
            <td>{{ item.companyName }}</td>
            <td>${{ quotes?.[item.symbol]?.currentPrice?.toFixed(2) ?? '--' }}</td>
            <td>
              <v-chip
                size="small"
                variant="tonal"
                :color="(quotes?.[item.symbol]?.change ?? 0) >= 0 ? 'success' : 'error'"
                rounded="lg"
              >
                {{ (quotes?.[item.symbol]?.change ?? 0) >= 0 ? '+' : '' }}{{ quotes?.[item.symbol]?.change?.toFixed(2) ?? '--' }}
                ({{ (quotes?.[item.symbol]?.percentChange ?? 0) >= 0 ? '+' : '' }}{{ quotes?.[item.symbol]?.percentChange?.toFixed(2) ?? '--' }}%)
              </v-chip>
            </td>
            <td class="text-right">
              <v-btn
                color="error"
                variant="text"
                prepend-icon="mdi-delete-outline"
                @click="emit('remove', item.symbol)"
              >
                Remove
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.table-card {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(15, 23, 42, 0.06);
}
</style>
