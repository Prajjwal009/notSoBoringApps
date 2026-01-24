function AppCard({ app }) {
  const handleImageError = (e) => {
    e.target.src = `https://via.placeholder.com/80?text=${app.name.charAt(0)}`;
  };

  return (
    <div className="app-card">
      <div className="app-icon">
        <img
          src={app.icon}
          alt={`${app.name} icon`}
          onError={handleImageError}
        />
      </div>
      <div className="app-info">
        <h3 className="app-name">{app.name}</h3>
        <span className="app-version">v{app.version}</span>
        <p className="app-description">{app.description}</p>
        <span className="app-category">{app.category}</span>
      </div>
      <div className="app-actions">
        <a href={`/download/${app.dmgFile}`} className="btn-download" download>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 12L3 7L4.4 5.6L7 8.2V0H9V8.2L11.6 5.6L13 7L8 12Z" fill="currentColor"/>
            <path d="M0 14H16V16H0V14Z" fill="currentColor"/>
          </svg>
          Download
        </a>
      </div>
    </div>
  );
}

export default AppCard;
