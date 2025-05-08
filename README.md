# CDFI User Interface

## Installation

To run development mode you need installed node v.10 and yarn

After cloning the project, run `yarn` in the project root. It will install all dependencies.

Then edit the `.env` file according to your back-end configuration.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Backend

Run cloud 2 backend on port 8080 to serve APIs..

### Prettier code formatter

Project has configured code formatter.
If You are using Visual Studio Code as your editor, please, follow these steps:

1. Install prettier-vscode extension;
2. Add `"editor.defaultFormatter": "esbenp.prettier-vscode", "editor.formatOnSave": true` to `User` or `Workspace` settings.


### Development Standards

1. Use React 18 for UI
2. Use ant design for UI components
3. Add new menu items to src/components/Layout/AerisSidebar/routes/user-routes.tsx
4. When considering backend APIs, new ones are defined in ./swagger.yml
5. Don't mock data, use real backend APIs that are defined in ./swagger.yml
6. Define endpoints in src/constants/APIEndpoint.ts, note APIs are accessed via src/tools/apiProcessor.ts
7. for navigation icons, use ant icons as defined in src/components/Layout/AerisSidebar/tools/tools.tsx
## API Documentation

