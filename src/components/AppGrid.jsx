import { useState, useEffect } from 'react';
import AppCard from './AppCard';

function AppGrid() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const response = await fetch('/api/apps');
      const data = await response.json();

      if (!data.apps || data.apps.length === 0) {
        setApps([]);
      } else {
        setApps(data.apps);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error loading apps:', err);
      setError('Failed to load apps. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="apps-grid">
        <div className="loading">Loading apps...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="apps-grid">
        <p className="error">{error}</p>
      </div>
    );
  }

  if (apps.length === 0) {
    return (
      <div className="apps-grid">
        <p className="no-apps">No apps available yet. Add apps to apps.json to get started!</p>
      </div>
    );
  }

  return (
    <div className="apps-grid">
      {apps.map((app, index) => (
        <AppCard key={index} app={app} />
      ))}
    </div>
  );
}

export default AppGrid;
