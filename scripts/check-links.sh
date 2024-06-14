#!/bin/bash

# Define the file patterns to search for URLs
file_patterns=("*.json" "*.tsx" "*.ts")

# Define the output file for the URLs
output_file="urls.txt"

# Find unique URLs matching the specified pattern in the specified file types
find_unique_urls() {
  include_patterns=""
  for pattern in "${file_patterns[@]}"; do
    include_patterns+="--include=${pattern} "
  done
  grep -E -o 'https?:\/\/([a-zA-Z0-9.-]*\.)?zenml\.io[^"'\''[:space:]]*' -r --no-filename $include_patterns "$@" | sort -u
}

# Find unique URLs in the specified file patterns within the "src" directory
find_unique_urls src legacy | sort -u > "$output_file"

# Run the link checker script
node scripts/check-links.js
