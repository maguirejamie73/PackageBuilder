#!/bin/bash
# Creates folders and copies initial files
mkdir -p backend/AdminTasks/CustomScripts
mkdir -p backend/Shared
mkdir -p frontend/css frontend/js
mkdir -p json-templates
mkdir -p storage/drivers storage/user-packages storage/backups
mkdir -p branding

# Copy placeholder files
cp -r templates/* frontend/
cp -r scripts/* backend/
echo "Folder structure and initial files created."
