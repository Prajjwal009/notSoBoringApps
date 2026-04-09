const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Newsletter API config (supports Buttondown or providers that expect payload.email_address)
const NEWSLETTER_API_URL = process.env.NEWSLETTER_API_URL || 'https://api.buttondown.com/v1/subscribers';
const BUTTONDOWN_API_KEY = process.env.BUTTONDOWN_API_KEY || '25675129-6404-43ee-8895-08f382307147';

const S3_BASE = process.env.S3_BASE_URL;


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
    const response = await fetch(NEWSLETTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${BUTTONDOWN_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        ip_address: ipAddress,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      res.json({ success: true, message: 'Successfully subscribed!' });
    } else {
      // Handle API errors (Buttondown, Loops, etc.)
      let errorMsg = data.detail || data.email?.[0] || data.message || 'Subscription failed';
      if (Array.isArray(data.error)) {
        const first = data.error[0];
        errorMsg = first?.msg || first?.message || errorMsg;
      }
      res.status(response.status).json({ error: errorMsg });
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ error: 'Failed to subscribe. Please try again.' });
  }
});

// GET /api/version → returns latest version metadata as JSON
app.get("/api/version", async (req, res) => {
  try {
    const response = await fetch(`${S3_BASE}/latest.json`);

    if (!response.ok) {
      return res.status(404).json({ error: "Version info not found" });
    }

    const data = await response.json();

    res.json({
      version: data.version,
      releaseDate: data.releaseDate,
      releaseNotes: data.releaseNotes,
      minimumOSVersion: data.minimumOSVersion,
      fileSize: data.fileSize,
    });
  } catch (err) {
    console.error("Version fetch error:", err);
    res.status(500).json({ error: "Failed to fetch version info" });
  }
});

// GET /download/dmg → redirects browser straight to S3 DMG file
app.get("/download/dmg", async (req, res) => {
  try {
    const response = await fetch(`${S3_BASE}/latest.json`);

    if (!response.ok) {
      return res.status(404).send("Version info not found");
    }

    const { downloadPath } = await response.json();
    const dmgUrl = `${S3_BASE}/${downloadPath}`;

    res.redirect(dmgUrl);
  } catch (err) {
    console.error("Download redirect error:", err);
    res.status(500).send("Failed to get download link");
  }
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
