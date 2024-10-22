#!/bin/bash

# Store the start time
last_time=$(date +%s%3N)

# Run your program and process the stdout in real-time
pnpm eval | while read -r line; do
  # Check if the line contains '{ current }'
  if [[ $line == *"{ current: "* ]]; then
    # Get the current time
    current_time=$(date +%s%3N)

    # Calculate the time difference
    time_diff=$((current_time - last_time))

    # Print the time difference in milliseconds
    echo "${time_diff} ms ${line}"

    # Update the last_time to the current time
    last_time=$current_time
  fi
done
