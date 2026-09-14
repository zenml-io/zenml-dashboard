#!/bin/bash

# Script to install ZenML from a specific branch
# Usage: ./scripts/install-zenml-branch.sh <branch-name>
# Example: ./scripts/install-zenml-branch.sh develop

# Check if branch name is provided
if [ $# -eq 0 ]; then
    echo "Error: Branch name is required"
    echo "Usage: $0 <branch-name>"
    echo "Example: $0 develop"
    exit 1
fi

# Check if uv is installed
if ! command -v uv &> /dev/null; then
    echo "Error: uv is not installed or not in PATH"
    echo "Please install uv first: https://docs.astral.sh/uv/getting-started/installation/"
    exit 1
fi

BRANCH_NAME="$1"

echo "Installing ZenML from branch: $BRANCH_NAME"

# Execute the uv pip install command with the specified branch
uv pip install --force-reinstall --upgrade "zenml[dev,server,templates] @ git+https://github.com/zenml-io/zenml@$BRANCH_NAME"

echo "Installation completed for branch: $BRANCH_NAME"