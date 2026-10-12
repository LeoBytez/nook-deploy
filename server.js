// Nala's Nook status page: CECS3214 Homework #11 (Git, GitHub, deployment)
require('dotenv').config();
const path = require('path');
const express = require('express');

const app = express();

// The hosting platform assigns the port through the PORT environment variable
const PORT = process.env.PORT || 3000;

// Values that come from environment variables (set in the Render dashboard)
const config = {
  shopName: process.env.SHOP_NAME || "Nala's Nook",
  message: process.env.NOOK_MESSAGE || 'No message set. Add NOOK_MESSAGE to the environment.',
  environment: process.env.NODE_ENV || 'development',
};

// Navigation links shown at the top of every page
const NAV = [
  { href: '/', label: 'Home' },
  { href: '/hours', label: 'Hours' },
];

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const page = (title, body) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)} | ${escapeHtml(config.shopName)}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Nunito+Sans:wght@400;700&family=JetBrains+Mono:wght@500&display=swap">
<link rel="stylesheet" href="/styles.css">
</head>
<body>
<header>
  <div class="header-inner">
    <a class="logo" href="/">${escapeHtml(config.shopName)}</a>
    <nav><ul>${NAV.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join('')}</ul></nav>
  </div>
</header>
<main>${body}</main>
<footer><p>${escapeHtml(config.shopName)}, CECS3214 Homework #11</p></footer>
</body>
</html>`;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send(
    page(
      'Home',
      `<p class="eyebrow">Deployment status</p>
      <h1>Welcome to <em>${escapeHtml(config.shopName)}</em></h1>
      <p class="message">${escapeHtml(config.message)}</p>
      <div class="panel">
        <h2>Environment</h2>
        <dl>
          <dt>NODE_ENV</dt><dd>${escapeHtml(config.environment)}</dd>
          <dt>SHOP_NAME</dt><dd>${escapeHtml(config.shopName)}</dd>
          <dt>NOOK_MESSAGE</dt><dd>${process.env.NOOK_MESSAGE ? 'set' : 'not set'}</dd>
          <dt>Server time</dt><dd>${new Date().toISOString()}</dd>
        </dl>
      </div>`
    )
  );
});

// JSON health check, handy for confirming the deployed app is up
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    shop: config.shopName,
    environment: config.environment,
    messageSet: Boolean(process.env.NOOK_MESSAGE),
  });
});

// Opening hours page (feature/opening-hours)
app.use(require('./routes/hours')(page));

app.use((req, res) => {
  res.status(404).send(page('Not found', '<h1>Page not found</h1><p class="message">That page is not in the Nook.</p>'));
});

app.listen(PORT, () => {
  console.log(`${config.shopName} running on port ${PORT} (${config.environment})`);
});
