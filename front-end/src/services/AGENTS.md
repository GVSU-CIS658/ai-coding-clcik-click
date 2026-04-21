# Services Guide

This folder is for external API access.

Current use:

- `finnhub.ts` handles stock search, company profile lookup, and live quotes

Guidelines:

- keep service files framework-light
- return plain typed data
- avoid UI logic here

If remote data is only fetched on demand, prefer keeping it in the service layer instead of Pinia.
