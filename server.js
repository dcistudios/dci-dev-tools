const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'up', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`DCI Dev Tools running at http://localhost:${PORT}`);
});
