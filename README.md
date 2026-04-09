# Taskify

Taskify is a React + Vite productivity dashboard with Kanban tasks, team leaderboard, and analytics.

## Tech Stack

- React
- Vite
- Tailwind CSS v3
- React Router
- Lucide React

## Project Structure

```text
src/
  components/
    Navbar.jsx
    Sidebar.jsx
    Card.jsx
    TaskCard.jsx
  pages/
    Dashboard.jsx
    Tasks.jsx
    Team.jsx
    Analytics.jsx
  layouts/
    MainLayout.jsx
  data/
    dummyData.js
  App.jsx
  main.jsx
  index.css
```

## Features

- Dashboard with KPI cards and risk alerts
- Kanban board with create, move, and delete task actions
- Team leaderboard with contribution stats
- Analytics with trend bars and health indicators
- Dark glassmorphism UI with responsive layout

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Notes

- Routes use the Outlet layout pattern in MainLayout.
- All components use default export.
- Dummy data is centralized in src/data/dummyData.js.
