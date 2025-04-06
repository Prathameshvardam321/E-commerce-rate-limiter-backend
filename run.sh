#!/bin/bash
echo "🔧 Starting services..."

# Step 1: Start Docker containers
docker-compose up -d --build

# Step 2: Install dependencies
npm install

# Step 3: Start the app in development mode
npm run dev
