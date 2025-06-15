# React Retirement Planner

This is a React-based application that helps users plan for their retirement. It's a conversion of a single-page HTML application into a modern, component-based React application using TypeScript and SCSS modules.

## Features

- Interactive chat interface for guiding the user.
- User input form for financial details and retirement goals.
- Dynamic projection chart powered by ECharts.
- Comparison table for different investment strategies.
- Interactive sandbox for simulating different retirement scenarios.
- Goal-oriented planning based on PLSA retirement lifestyle standards.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd react-retirement-planner
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server, run:

```bash
npm run dev
```

This will open the application in your default browser at `http://localhost:5173`.

### Building for Production

To create a production-ready build, run:

```bash
npm run build
```

The optimized and minified files will be placed in the `dist` directory. You can preview the production build locally with `npm run preview`.

## Project Structure

```
/
|-- public/
|   |-- favicon.ico
|-- src/
|   |-- assets/
|   |-- components/
|   |   |-- common/
|   |   |-- ChatMessage/
|   |   |-- ChatWindow/
|   |   |-- InitialForm/
|   |   |-- ... (other components)
|   |-- hooks/
|   |-- services/
|   |-- styles/
|   |   |-- globals.scss
|   |-- types/
|   |-- App.tsx
|   |-- main.tsx
|-- .gitignore
|-- index.html
|-- package.json
|-- tsconfig.json
|-- tsconfig.node.json
|-- vite.config.ts
|-- README.md
```
