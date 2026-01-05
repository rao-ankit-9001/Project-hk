const express = require('express');
const router = express.Router();

function detectType(url) {
  const clean = url.split('?')[0].toLowerCase();
  const ext = clean.split('.').pop();
  if (['mp4','webm','ogg'].includes(ext)) return 'video';
  if (['webp','jpg','jpeg','png','gif','avif'].includes(ext)) return 'image';
  return 'unknown';
}

router.get('/media', (req, res) => {
  const raw = process.env.MEDIA_LINKS || '';
  const urls = raw.split(',').map(s => s.trim()).filter(Boolean);
  const items = urls.map((url, idx) => {
    const type = detectType(url);
    const thumbnail = type === 'image' ? url : (url + '#t=1');
    const caption = decodeURIComponent(url.split('/').pop().split('?')[0]);
    return { id: idx, url, type, thumbnail, caption };
  });
  res.json({ items });
});

module.exports = router;
