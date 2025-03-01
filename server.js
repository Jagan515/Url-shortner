const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ShortUniqueId = require("short-unique-id");

const app = express();
const port = 5001;

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/yourDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


// URL Schema
const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  customAlias: { type: String, unique: true, sparse: true },
});

const Url = mongoose.model("Url", urlSchema);

app.use(express.json());
app.use(cors());

// Generate a short ID if no custom alias is provided
const uid = new ShortUniqueId({ length: 6 });

// Shorten URL Endpoint
app.post("/shorten", async (req, res) => {
  const { originalUrl, customAlias } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL is required." });
  }

  let shortUrl;

  try {
    // Check if custom alias is provided and available
    if (customAlias) {
      const existingAlias = await Url.findOne({ customAlias });
      if (existingAlias) {
        return res.status(400).json({ error: "Custom alias already in use." });
      }
      shortUrl = `http://localhost:5001/${customAlias}`;
    } else {
      // Generate unique short URL
      let uniqueId;
      do {
        uniqueId = uid();
      } while (await Url.findOne({ shortUrl: `http://localhost:5001/${uniqueId}` }));

      shortUrl = `http://localhost:5001/${uniqueId}`;
    }

    // Save to MongoDB
    const newUrl = new Url({ originalUrl, shortUrl, customAlias });
    await newUrl.save();

    res.json({ shortUrl });
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Redirect Endpoint
app.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const urlEntry = await Url.findOne({
      $or: [{ shortUrl: `http://localhost:5001/${shortUrl}` }, { customAlias: shortUrl }],
    });

    if (urlEntry) {
      res.redirect(urlEntry.originalUrl);
    } else {
      res.status(404).json({ error: "Short URL not found." });
    }
  } catch (error) {
    console.error("Error finding URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
