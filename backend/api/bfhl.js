const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { validateJSON } = require('../utils/jsonValidator');
const { validateFile } = require('../utils/fileHandler');

// Set up CORS
const app = express();

// Use CORS middleware for handling cross-origin requests
app.use(cors({
  origin: 'https://bajaj-finserv-mocha-zeta.vercel.app', // Allow requests from this frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify the allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  preflightContinue: false, // If you want to handle preflight requests automatically
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204 status
}));

// Multer setup (for file uploads)
const upload = multer({
  // Optionally specify a destination or storage engine for file uploads
  dest: 'uploads/',  // Example destination folder, adjust as needed
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB file size limit, adjust as needed
  }
});

// Middleware to parse JSON body
app.use(express.json());

// POST route to handle form submission with file upload
app.post('/', upload.single('file'), (req, res) => {
  try {
    const { data, email, roll_number } = req.body;
    const file = req.file;  // File is automatically added to `req.file` by multer

    // Validate presence of required fields
    if (!data || !email || !roll_number) {
      return res.status(400).json({ is_success: false, message: 'Missing fields' });
    }

    // Validate the JSON data
    const { isValid, numbers, alphabets, isPrimeFound, highestLowercase } = validateJSON(data);

    // Validate the uploaded file (assuming validateFile is a custom function)
    const fileInfo = validateFile(file);

    // Respond with processed data
    res.status(200).json({
      is_success: true,
      user_id: `${email.split('@')[0]}_${roll_number}`,
      email,
      roll_number,
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercase,
      is_prime_found: isPrimeFound,
      ...fileInfo, // Include additional file info like size/type, if needed
    });
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ is_success: false, error: error.message });
  }
});

// Start the server (assuming you're using port 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
