const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

try {
    const bfhlRoutes = require('./api/bfhl');
} catch (error) {
    console.error("Error loading module './api/bfhl':", error.message);
    // Handle the error appropriately, e.g., exit the process or provide a fallback
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/bfhl", bfhlRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
