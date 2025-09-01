PackageBuilder

Web-based portal for generating PowerShell scripts or Intune packages for printers, apps, admin tasks, and settings.

Table of Contents

Overview

Folder Structure

Prerequisites

GitHub Repository Setup

Digital Ocean App Platform Deployment

Backend Scripts

Frontend Usage

JSON Templates

Package Generation

Backups

Branding

Overview

PackageBuilder allows clients to:

Choose between generating a PowerShell script or Intune Win32 package (.intunewin + config text).

Select Printers, Apps, Settings, or Admin Tasks.

Upload custom drivers or app installers.

Automatically generate JSON configuration files.

Sign scripts and generated files using Code Signing.

Maintain backups of the last 5 generated packages.

Use a web-based GUI with login credentials that expire annually.

Folder Structure
PackageBuilder/
│
├── backend/
├── frontend/
├── json-templates/
├── storage/
├── branding/
├── README.md
└── build.sh


Backend includes all PowerShell scripts:

Install-Drivers.ps1

Install-Printers.ps1

Detect.ps1

JSONHandler.ps1

CodeSign.ps1

W32PrepWrapper.ps1

AdminTasks/ for user-generated admin scripts

Frontend includes HTML pages, JS, and CSS for web portal functionality.

Prerequisites

Git installed on local machine

PowerShell 7+ on backend system (if testing locally)

Digital Ocean account (App Platform & Spaces)

Domain name for SSL (optional but recommended)

GitHub Repository Setup

Create a new repository on GitHub (e.g., PackageBuilder).

Clone it locally:

git clone https://github.com/yourusername/PackageBuilder.git
cd PackageBuilder


Copy all frontend, backend, JSON templates, and scripts into the repository folders as per structure above.

Create a .gitignore in the root to exclude sensitive folders:

storage/
*.zip


Commit and push:

git add .
git commit -m "Initial commit of PackageBuilder prototype"
git push origin main

Digital Ocean App Platform Deployment

Log in to Digital Ocean and select Apps → Create App.

Connect to your GitHub repository.

Select branch main.

Configure environment:

Runtime: .NET 7 (ASP.NET Core)

Build command: None (Digital Ocean will detect .csproj if you include a C# frontend backend wrapper, else simple static app)

Run command: dotnet PackageBuilder.dll (if using compiled backend)

Configure storage using Digital Ocean Spaces:

Map /storage folder to a Space for drivers, packages, and backups.

Deploy app. Digital Ocean will provide a public URL (e.g., https://packagebuilder.yourdomain.com).

Backend Scripts

Install-Drivers.ps1 / Install-Printers.ps1: Installs drivers/printers on target device.

Detect.ps1: Checks if driver and printers exist.

JSONHandler.ps1: Creates JSON from user selections dynamically.

CodeSign.ps1: Signs generated scripts and files.

W32PrepWrapper.ps1: Calls Microsoft Win32 Content Prep Tool to generate .intunewin files.

AdminTasks/: Includes PowerShell templates for admin tasks (customizable by user).

Frontend Usage

Navigate to the web portal URL.

Log in with credentials provided by admin.

Select Output Type: PowerShell or Intune package.

Select Category: Printers, Apps, Settings, Admin Tasks.

For Printers/Apps:

Select from dropdowns.

Optionally upload custom drivers/installers.

Click Generate Package.

JSON Templates

Stored in json-templates/, including:

Printers.json

DefaultApps.json

DefaultSettings.json

Used to populate dropdowns dynamically and generate configuration files for Intune.

Package Generation

PowerShell script output is saved in storage/user-packages/.

Intune packages are generated via W32PrepWrapper.ps1:

output.intunewin
config.txt


Packages are zipped and offered for download.

Backups

Last 5 generated packages are kept in storage/backups/.

Older backups are rotated automatically.

Branding

Add company logo to branding/logo.png.

Frontend pages reference logo dynamically.

Customize colors in frontend/css/styles.css.