# CodeStacker Challenge

## Overview
The **CodeStacker Challenge FrontEnd challenge** is to create website to show crimes on the map and report crimes with interactive interface. 

## Technologies Used
- **using vite** for react.js.
- **Leaflet.js**: For integrating an interactive map with custom markers and layers.
- **Firebase**: For deployment and hosting.
- **Git/Github** for version control.

## Features
- Responsive design for desktop and mobile views.
- Interactive map powered by **Leaflet.js** with customizable features.
- User-friendly interface with night and light mode.
- Hosted and deployed on **Firebase** for real-time access.

## How to run the code ?
- clone the repo.
- In terminal run "npm install" to install dependencies.
- .env is needed to accesss the firebase project (assuming you created a firebase hosting project and set up realtime database).
- "npm run dev" to run locally, "npm run build" to create the build. (the build will be generated inside "dist" folder).


## How to deploy?
-run "firebase init"
-configure for hosting and link your firebase account using the cli.
-public folder is the build folder (which should be "dist").
-after creating the build file using "npm run build", now you can deploy the it using "firebase deploy" command.
-
