const multer = require("multer");
const express = require("express");
const { validateJSON } = require("../utils/jsonValidator");
const { validateFile } = require("../utils/fileHandler");

// Multer setup
const upload = multer();
const app = express();

app.use(express.json());

// POST route
app.post("/", upload.single("file"), (req, res) => {
  try {
    const { data, email, roll_number } = req.body;
    const file = req.file;

    if (!data || !email || !roll_number) {
      return res.status(400).json({ is_success: false, message: "Missing fields" });
    }

    // Validate JSON
    const { isValid, numbers, alphabets, isPrimeFound, highestLowercase } =
      validateJSON(data);

    // Validate file
    const fileInfo = validateFile(file);

    // Respond
    res.status(200).json({
      is_success: true,
      user_id: `${email.split("@")[0]}_${roll_number}`,
      email,
      roll_number,
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercase,
      is_prime_found: isPrimeFound,
      ...fileInfo,
    });
  } catch (error) {
    res.status(500).json({ is_success: false, error: error.message });
  }
});

module.exports = app;
