import { createRouter, createWebHashHistory } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'
import HomeView from '@/views/HomeView.vue'
import WatchlistView from '@/views/WatchlistView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
          },
        },
        {
          path: 'watchlist',
          name: 'watchlist',
          component: WatchlistView,
          meta: {
            title: 'Your Watchlist',
          },
        },
      ],
    },
  ],
})

export default router
