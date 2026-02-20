const express = require("express");
const path = require("path");
const helmet = require("helmet");

const app = express();

/**
 * Security headers.
 * Note: Helmet's CSP can conflict with strict CSP you set at the platform.
 * This default is fine for a simple static site.
 */
app.use(
  helmet({
    contentSecurityPolicy: false, // keep it simple; enforce CSP via Azure headers if desired
  })
);

/**
 * Serve static files from /public
 * Your site lives in /public (including /public/assets).
 */
const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));

/**
 * Optional health endpoint for Azure diagnostics / your own checks.
 */
app.get("/healthz", (req, res) => res.status(200).send("ok"));

/**
 * For multi-page static sites, DO NOT use a wildcard fallback to index.html.
 * Let Express serve real files and return 404 otherwise.
 */

// Azure provides PORT; bind to 0.0.0.0 so the container can route traffic to it.
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on port ${PORT}`);
});
