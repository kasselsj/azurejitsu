const express = require("express");
const path = require("path");
const helmet = require("helmet");

const app = express();

// Helmet is fine, but enforce CSP via Azure headers if you want strict CSP.
app.use(helmet({ contentSecurityPolicy: false }));

// Serve static files from /public (includes /public/assets)
const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));

// Health endpoint for quick checks
app.get("/healthz", (req, res) => res.status(200).send("ok"));

// IMPORTANT: bind to Azure-provided PORT and 0.0.0.0
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening on ${PORT}`);
});
