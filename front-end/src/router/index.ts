import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'
import HomeView from '@/views/HomeView.vue'
import WatchlistView from '@/views/WatchlistView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
          meta: {
            title: 'Market Overview',
            subtitle: 'Track your next moves and add stocks to the watchlist quickly.',
          },
        },
        {
          path: 'watchlist',
          name: 'watchlist',
          component: WatchlistView,
          meta: {
            title: 'Your Watchlist',
            subtitle: 'Review the stocks you care about and keep the list tidy.',
          },
        },
      ],
    },
  ],
})

export default router
