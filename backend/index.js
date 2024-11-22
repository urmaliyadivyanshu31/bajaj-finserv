const express = require("express");
const cors = require("cors");
require("dotenv").config();

let bfhlRoutes;

try {
    bfhlRoutes = require('./api/bfhl');
} catch (error) {
    console.error("Error loading module './api/bfhl':", error.message);
    process.exit(1);  // Exit if the route cannot be loaded
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());  // You can restrict it to a specific domain like so: cors({ origin: 'https://yourdomain.com' })
app.use(express.json());  // Use built-in JSON parsing
app.use(express.urlencoded({ extended: true }));  // Built-in URL encoding

// Routes
app.use("/bfhl", bfhlRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
