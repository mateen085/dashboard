const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/save-transcript', (req, res) => {
  const transcript = req.body.transcript;
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `transcript-${timestamp}.txt`;

  fs.writeFile(`./transcripts/${filename}`, transcript, (err) => {
    if (err) {
      console.error('Error saving transcript:', err);
      return res.status(500).send('Failed to save.');
    }
    console.log(`Transcript saved: ${filename}`);
    res.send('Saved successfully.');
  });
});

// Ensure transcripts folder exists
const transcriptsPath = './transcripts';
if (!fs.existsSync(transcriptsPath)) {
  fs.mkdirSync(transcriptsPath);
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

