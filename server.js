const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from React build directory
app.use(express.static('dist'));

// API endpoint to get all apps
app.get('/api/apps', (req, res) => {
  try {
    const appsData = fs.readFileSync('apps.json', 'utf8');
    res.json(JSON.parse(appsData));
  } catch (error) {
    console.error('Error reading apps.json:', error);
    res.status(500).json({ error: 'Failed to load apps data' });
  }
});

// Serve DMG files with proper headers
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'dmgs', filename);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  // Set headers for DMG download
  res.setHeader('Content-Type', 'application/x-apple-diskimage');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

  // Send file
  res.sendFile(filePath);
});

// Serve React app for all other routes (client-side routing)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 notSoBoringApps is running on http://localhost:${PORT}`);
  console.log(`📦 Add your DMG files to the 'dmgs' folder`);
  console.log(`✏️  Edit 'apps.json' to update app information`);
});
