# Repository Guide

This repo is a small stock watchlist app for the CIS 658 hackathon.

Main areas:

- `front-end/`: the real app, built with Vue, Vue Router, Pinia, Vuetify, and Finnhub.
- `back-end/`: currently unused. Keep it minimal unless a proxy or deployment workaround becomes necessary.

Current app scope:

- search stocks from Finnhub
- add and remove stocks from a watchlist
- show live quote snapshots for saved stocks
- deploy the frontend to GitHub Pages

Conventions:

- route pages go in `front-end/src/views/`
- reusable UI goes in `front-end/src/components/`
- Finnhub access lives in `front-end/src/services/`
- shared client state lives in `front-end/src/stores/`
