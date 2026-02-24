#!/bin/bash

# =========================================
# Azure Deployment Script for Next.js
# =========================================

echo "Starting deployment..."

# Install dependencies
echo "Installing dependencies..."
npm install --production=false

# Build the Next.js application
echo "Building Next.js application..."
npm run build

echo "Deployment complete!"
