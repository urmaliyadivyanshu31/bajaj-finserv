const multer = require("multer");
const express = require("express");
const cors = require("cors");
const { validateJSON } = require("../utils/jsonValidator");
const { validateFile } = require("../utils/fileHandler");

// Multer setup to handle file uploads
const upload = multer();
const app = express();

app.use(express.json());

// Enable CORS for your specific origin
app.use(
  cors({
    origin: "https://bajaj-finserv-mocha-zeta.vercel.app", // Replace with your frontend URL
    methods: ["GET", "POST", "OPTIONS"], // Allow specific methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);

// POST route to handle data and file
app.post("/", upload.single("file"), (req, res) => {
  try {
    const { data, email, roll_number } = req.body;
    const file = req.file;

    // Check for required fields
    if (!data || !email || !roll_number) {
      return res.status(400).json({ is_success: false, message: "Missing fields" });
    }

    // Validate the JSON data
    const { isValid, numbers, alphabets, isPrimeFound, highestLowercase } =
      validateJSON(data);

    if (!isValid) {
      return res.status(400).json({ is_success: false, message: "Invalid JSON format" });
    }

    // Validate file (e.g., check file type or size)
    const fileInfo = validateFile(file);

    // Respond with the processed data
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

// Export the API
module.exports = app;
