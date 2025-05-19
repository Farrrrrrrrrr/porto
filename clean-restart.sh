#!/bin/bash

echo "Cleaning up Next.js build folders..."
rm -rf .next
rm -rf node_modules/.cache

echo "Reinstalling dependencies with legacy peer deps..."
npm install --legacy-peer-deps

echo "Starting development server..."
npm run dev
