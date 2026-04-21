# Stock Watchlist

This project is a Vue-based stock watchlist app built for the CIS 658 AI-assisted web app hackathon.

## Features

- search stocks with Finnhub
- add and remove stocks from a watchlist
- view live quote snapshots for saved stocks
- simple navigation with Home and Watchlist pages

## Tech Stack

- Vue 3
- Vue Router
- Pinia
- Vuetify
- Finnhub API

## Project Structure

- `front-end/`: main application
- `back-end/`: currently unused

## Run Locally

```sh
cd front-end
npm install
npm run dev
```

## Build

```sh
cd front-end
npm run build
```

## Deploy

```sh
cd front-end
npm run deploy
```

## Development Note

- AI tools used: Codex / ChatGPT-style assistance
- Stock API used: Finnhub
- Working features: stock search, company lookup, live quote display, watchlist management
- Incomplete features: historical graphing was not used because Finnhub candle access appeared restricted for the available key
