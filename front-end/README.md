# Front End

This folder contains the stock watchlist app.

## Features

- search stocks by name or ticker
- add and remove stocks from a watchlist
- load live quote snapshots from Finnhub

## Scripts

```sh
npm install
npm run dev
npm run build
npm run deploy
```

## Notes

- `npm run dev` exposes the Vite server for container use
- `npm run deploy` publishes `dist/` to GitHub Pages using `gh-pages`
- the app uses quote data, not historical charts, because candle access appeared restricted for the current API key
