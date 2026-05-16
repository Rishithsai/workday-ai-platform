const fs = require('fs');
const mammoth = require('mammoth');
const pdf = require('pdf-parse');
const Resume = require('../models/Resume');
const {
  parseResumeWithAI
} = require('../services/parserService');

exports.uploadResume = async (req, res) => {
  try {
    const filePath = req.file.path;

    let text = '';

     if (req.file.mimetype.includes('pdf')) {
      const dataBuffer = fs.readFileSync(filePath);
      const parsed = await pdf(dataBuffer);
      text = parsed.text;
    } else {
      const result = await mammoth.extractRawText({
        path: filePath
      });

      text = result.value;
    }

    const structured = await parseResumeWithAI(text);

    const savedResume = await Resume.create(
      structured
    );

    res.json(savedResume);
    } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Resume parsing failed'
    });
  }
};