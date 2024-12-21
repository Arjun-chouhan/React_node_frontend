const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// Metadata for different routes
const routeMetadata = {
  "/": {
    title: "Home - My App12112",
    description: "Welcome to our React application home page",
  },
  "/about": {
    title: "About Us - My App12312312",
    description: "Learn more about our company and our mission",
  },
  "/contact": {
    title: "Contact Us - My App1231231",
    description: "Get in touch with us - we'd love to hear from you",
  },
};

// Function to generate metadata for dynamic routes
function getDynamicMetadata(path) {
  // Remove '/location' prefix and split the remaining path
  const parts = path
    .replace(/^\/location/, "")
    .split("/")
    .filter(Boolean);
  let title = "Locations";
  let description = "Explore our locations";

  if (parts.length > 0) {
    const [region, province, city] = parts;
    const locations = [];

    if (region) {
      const capitalizedRegion =
        region.charAt(0).toUpperCase() + region.slice(1);
      locations.push(capitalizedRegion);
      title = `${capitalizedRegion} Region`;
      description = `Explore the ${capitalizedRegion} region`;
    }

    if (province) {
      const capitalizedProvince =
        province.charAt(0).toUpperCase() + province.slice(1);
      locations.push(capitalizedProvince);
      title = `${capitalizedProvince}, ${title}`;
      description = `Explore ${capitalizedProvince} in the ${region} region`;
    }

    if (city) {
      const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);
      locations.push(capitalizedCity);
      title = `${capitalizedCity}, ${title}`;
      description = `Discover ${capitalizedCity} in ${province}, ${region}`;
    }
  }

  return { title, description };
}

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, "build")));

// Function to serve HTML with correct metadata
const serveHTML = (req, res) => {
  console.log("Serving path:", req.path);

  // Check if it's a location route
  const isLocationRoute = req.path.startsWith("/location");
  const metadata = isLocationRoute
    ? getDynamicMetadata(req.path)
    : routeMetadata[req.path] || {
        title: "My App",
        description: "Welcome to our React application",
      };

  const indexPath = path.join(__dirname, "build", "index.html");
  fs.readFile(indexPath, "utf8", (err, htmlData) => {
    if (err) {
      console.error("Error reading index.html", err);
      return res.status(500).send("Error loading page");
    }

    // Handle minified content carefully
    const updatedHtml = htmlData
      .replace(/<title>[^<]*<\/title>/, `<title>${metadata.title}</title>`)
      .replace(
        /<meta\s+name="description"\s+content="[^"]*"/,
        `<meta name="description" content="${metadata.description}"`
      );

    // Set proper content type
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(updatedHtml);
  });
};

// Handle all routes that should render the React app
app.get(["/", "/about", "/contact"], serveHTML);

// Handle location route with optional parameters
app.get("/location/:region?/:province?/:city?", serveHTML);

// Handle other routes that might be API endpoints or static files
app.get("*", (req, res) => {
  // First check if it's a static file
  const staticFilePath = path.join(__dirname, "build", req.path);
  if (fs.existsSync(staticFilePath) && fs.statSync(staticFilePath).isFile()) {
    return res.sendFile(staticFilePath);
  }

  // If not a static file, serve the React app
  serveHTML(req, res);
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
