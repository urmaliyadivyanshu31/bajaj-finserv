const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",  // You can specify a specific domain or environment variable
}));
app.use(express.json());  // Use built-in JSON parsing
app.use(express.urlencoded({ extended: true }));  // Built-in URL encoding

// Dynamically import the routes
let bfhlRoutes;
try {
    bfhlRoutes = require('./api/bfhl'); // Ensure this file exists and has the routes correctly defined
} catch (error) {
    console.error("Error loading module './api/bfhl':", error.message);
    process.exit(1);  // Exit the application if the route cannot be loaded
}

// Routes
app.use("/bfhl", bfhlRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
