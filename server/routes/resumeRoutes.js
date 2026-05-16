const express = require("express");

const router = express.Router();

const multer = require("multer");

const {
  parseResume
} = require(
  "../services/resumeParser"
);

// ==========================
// MULTER STORAGE
// ==========================

const storage =
  multer.diskStorage({

    destination: (
      req,
      file,
      cb
    ) => {

      cb(
        null,
        "uploads/"
      );
    },

    filename: (
      req,
      file,
      cb
    ) => {

      cb(
        null,
        Date.now() +
          "-" +
          file.originalname
      );
    }
  });

const upload =
  multer({
    storage
  });

// ==========================
// UPLOAD RESUME
// ==========================

router.post(
  "/upload",

  upload.single(
    "resume"
  ),

  async (
    req,
    res
  ) => {

    try {

      console.log(
        "Uploaded File:"
      );

      console.log(
        req.file
      );

      if (!req.file) {

        return res
          .status(400)
          .json({
            success: false,
            message:
              "No file uploaded"
          });
      }

      const result =
        await parseResume(
          req.file.path
        );

      // SAVE GLOBALLY
      global.latestResumeData =
        result.structuredData;

      res.json({

        success: true,

        extractedText:
          result.extractedText,

        structuredData:
          result.structuredData
      });

    } catch (error) {

      console.log(
        "UPLOAD ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          "Resume parsing failed"
      });
    }
  }
);

// ==========================
// GET LATEST RESUME
// ==========================

router.get(
  "/latest",

  async (
    req,
    res
  ) => {

    try {

      global.latestResumeData =
        global.latestResumeData || {};

      res.json({

        success: true,

        data:
          global.latestResumeData
      });

    } catch (error) {

      console.log(
        error
      );

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch latest resume"
      });
    }
  }
);

module.exports = router;