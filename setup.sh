#!/bin/bash

echo "Setting up Lenska project..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Create necessary directories
mkdir -p public/ProductFeed/current
mkdir -p src/app/api/products

# Install required packages
npm install @heroicons/react xml2js clsx
npm install --save-dev @types/xml2js

echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Add your product_feed.xml to /public/ProductFeed/current/"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:3000 in your browser"
