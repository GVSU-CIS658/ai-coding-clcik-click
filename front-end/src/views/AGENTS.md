# Views Guide

This folder contains route screens.

Current views:

- `HomeView.vue`: add stocks and show watchlist preview
- `WatchlistView.vue`: show saved stocks and refresh live quotes

Views should:

- coordinate components
- load page-level quote data
- connect the store to the service layer

Avoid stuffing repeated UI into views when a component would keep things clearer.
