const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Buttondown API config
const BUTTONDOWN_API_KEY = process.env.BUTTONDOWN_API_KEY || '25675129-6404-43ee-8895-08f382307147';

// Middleware
app.set('trust proxy', true);
app.use(express.json());
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

// Newsletter subscription endpoint
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Get client IP address
  const ipAddress = req.ip || req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

  try {
    const response = await fetch('https://api.buttondown.com/v1/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${BUTTONDOWN_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        ip_address: ipAddress
      }),
    });

    const data = await response.json();

    if (response.ok) {
      res.json({ success: true, message: 'Successfully subscribed!' });
    } else {
      // Handle Buttondown API errors
      const errorMsg = data.detail || data.email?.[0] || 'Subscription failed';
      res.status(response.status).json({ error: errorMsg });
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ error: 'Failed to subscribe. Please try again.' });
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
