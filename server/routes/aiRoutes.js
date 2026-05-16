const express = require('express');
const {
  semanticMap
} = require('../services/semanticService');

const router = express.Router();

router.post('/map', async (req, res) => {
  try {
    const { label, resume } = req.body;

    const result = await semanticMap(
      label,
      resume
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: 'AI mapping failed'
    });
    }
});

module.exports = router;