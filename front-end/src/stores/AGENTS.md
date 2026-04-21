# Stores Guide

Use Pinia for shared client state.

Current store use:

- watchlist items
- search term
- local persistence

Do not move every Finnhub request into Pinia by default.

Prefer stores for:

- persistent user-owned state
- shared state used across screens

Prefer services for:

- direct API calls
- per-view quote refreshes
