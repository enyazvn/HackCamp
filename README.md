# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Steps for dev env:
1. Create a new React project using Vite (choose "react" and "JavaScript")

npm create vite@latest my-react-tailwind-app -- --template react

2. Navigate into your new project directory

cd my-react-tailwind-app

3. Install project dependencies

npm install

4. Install Tailwind CSS v3 and its peer dependencies (PostCSS and Autoprefixer)

Note: We specify tailwindcss@3 to ensure we don't accidentally grab v4 or later

npm install -D tailwindcss@3 postcss autoprefixer

5. Generate the Tailwind and PostCSS configuration files

npx tailwindcss init -p

6. Configure Tailwind to look for class names in your React files (Manual Step: Edit tailwind.config.js)

You need to open 'tailwind.config.js' and replace its content property with:

content: [

"./index.html",

"./src/**/*.{js,ts,jsx,tsx}",

],

7. Add the Tailwind directives to your main CSS file (Manual Step: Edit src/index.css)

Open 'src/index.css' and add these three lines at the very top:

@tailwind base;

@tailwind components;

@tailwind utilities;

8. Start the development server

npm run dev