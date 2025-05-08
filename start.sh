#!/bin/bash

# Get the absolute path to the directory this script is in
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Navigate to frontend and start the frontend server
(
  cd "$SCRIPT_DIR/hygiene_nerds_frontend" || exit
  echo "Starting frontend (React)..."
  bun run dev --host
) &

# Navigate to backend and start the backend server
(
  cd "$SCRIPT_DIR/hygiene_nerds_backend" || exit
  echo "Starting spring boot backend. Please wait..."
  mvn spring-boot:run
) &

# Open the frontend in the default web browser after a short delay
(
  wait 5
  if command -v xdg-open > /dev/null; then
    xdg-open http://localhost:5173
  elif command -v open > /dev/null; then  # macOS
    open http://localhost:5173
  elif command -v start > /dev/null; then  # Windows Git Bash
    start http://localhost:5173
  fi
)

wait
