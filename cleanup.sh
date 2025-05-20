#!/bin/bash
# Cleanup script for the supply-api-poc project

# Set the base directory
BASE_DIR=$(pwd)
echo "Starting cleanup in $BASE_DIR..."

# Clean up assets folder
echo "Cleaning up assets folder..."
cd "$BASE_DIR/src/assets"

# Keep only the SimpleSampleListings.json file
# First, make sure we have a backup
echo "Backing up essential data..."
cp SimpleSampleListings.json /tmp/SimpleSampleListings.json.backup

# Keep only the required file
echo "Removing unnecessary asset files..."
find . -type f ! -name "SimpleSampleListings.json" -exec rm {} \;

# Clean up scripts folder
echo "Cleaning up scripts folder..."
cd "$BASE_DIR/src/scripts"

# Keep only import-data.ts, remove the rest
echo "Removing unnecessary script files..."
find . -type f ! -name "import-data.ts" -exec rm {} \;

echo "Cleanup complete!"
echo "If you need to restore the SimpleSampleListings.json, it was backed up to /tmp/SimpleSampleListings.json.backup"
