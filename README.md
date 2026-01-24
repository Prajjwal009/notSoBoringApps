# notSoBoringMenuApps

A modern React-based website for hosting and distributing macOS menu bar applications.

## Features

- React frontend with Vite build tool
- Clean, modern interface
- Responsive design (works on mobile, tablet, and desktop)
- Easy app management via JSON file
- Simple DMG file hosting
- Express backend API
- No database required

## Tech Stack

- **Frontend**: React 19, Vite
- **Backend**: Node.js, Express 5
- **Styling**: CSS (no frameworks needed)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd notSoBoringMenuApps
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Development Mode

Run both the React dev server (Vite) and the Express backend simultaneously:

```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:5173 (Vite dev server with hot reload)
- **Backend**: http://localhost:3000 (Express API server)

The Vite dev server proxies API requests to the Express backend automatically.

### Production Mode

Build the React app and start the production server:

```bash
npm start
```

The website will be available at: **http://localhost:3000**

Or build and run separately:

```bash
npm run build    # Build the React app
node server.js   # Start the Express server
```

## Project Structure

```
notSoBoringMenuApps/
├── server.js              # Express backend server
├── apps.json              # App metadata
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── index.html             # Vite entry point
├── src/                   # React source code
│   ├── main.jsx           # React entry point
│   ├── App.jsx            # Main app component
│   ├── App.css            # Styling
│   └── components/        # React components
│       ├── Header.jsx     # Header component
│       ├── Footer.jsx     # Footer component
│       ├── AppCard.jsx    # App card component
│       └── AppGrid.jsx    # App grid with data fetching
├── dist/                  # Production build (generated)
└── dmgs/                  # DMG file storage
    └── .gitkeep
```

## Adding Your Apps

### Step 1: Add DMG Files

Place your DMG files in the `dmgs/` folder:
```
dmgs/
├── your-app-1.0.0.dmg
├── another-app-2.1.0.dmg
└── .gitkeep
```

### Step 2: Update apps.json

Edit the `apps.json` file to add your app information:

```json
{
  "apps": [
    {
      "name": "Your App Name",
      "description": "A brief description of what your app does",
      "icon": "https://example.com/icon.png",
      "version": "1.0.0",
      "dmgFile": "your-app-1.0.0.dmg",
      "category": "Productivity"
    }
  ]
}
```

**Fields:**
- `name`: The display name of your app
- `description`: A short description (1-2 sentences)
- `icon`: URL to the app icon (80x80px recommended, or use placeholder)
- `version`: Current version number
- `dmgFile`: Exact filename of the DMG in the `dmgs/` folder
- `category`: App category (e.g., "Productivity", "Utilities", "Development")

### Step 3: Reload the Page

If in development mode, the page will reload automatically. In production, just refresh your browser!

## Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:frontend` - Start only the Vite dev server
- `npm run dev:backend` - Start only the Express backend
- `npm run build` - Build the React app for production
- `npm start` - Build and start the production server
- `npm run preview` - Preview the production build locally

## Customization

### Changing the Port

**Backend Port:**
Set the `PORT` environment variable:
```bash
PORT=8080 npm start
```

Or edit `server.js` and change the default port.

**Frontend Dev Port:**
Edit `vite.config.js` and change the `server.port` value.

### Styling

Edit `src/App.css` to customize colors, fonts, and layout. The current design uses a purple gradient theme.

### Adding Components

Create new React components in the `src/components/` directory and import them in your main components.

## Deployment

### Deploy to a Server

1. Build the production app:
   ```bash
   npm run build
   ```

2. Copy these files to your server:
   - `server.js`
   - `apps.json`
   - `package.json`
   - `dist/` folder
   - `dmgs/` folder

3. On the server:
   ```bash
   npm install --production
   npm start
   ```

Or use a process manager like PM2:
```bash
npm install -g pm2
pm2 start server.js --name notSoBoringMenuApps
```

### Deploy to Heroku

1. Create a `Procfile`:
   ```
   web: npm start
   ```

2. Deploy:
   ```bash
   heroku create
   git push heroku main
   ```

### Deploy to Vercel/Netlify

Since this app has a backend, you'll need to deploy the backend separately or use a platform that supports both frontend and backend (like Render, Railway, or fly.io).

## Tips

- Keep DMG filenames consistent with version numbers
- Compress DMG files to reduce download size
- Use high-quality app icons (at least 80x80px)
- Update `apps.json` whenever you release a new version
- Consider using a CDN for large DMG files in production
- The React components are simple and easy to extend

## React Development

This project uses modern React with:
- **Hooks**: `useState`, `useEffect` for state management and side effects
- **Functional Components**: All components are function-based
- **Vite**: Fast build tool with hot module replacement
- **Component Structure**: Clean separation of concerns

Feel free to add more features like:
- Search functionality
- Category filtering
- App detail pages
- Download statistics
- User reviews

## License

ISC

## Support

For issues or questions, please open an issue on the repository.
