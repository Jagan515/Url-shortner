const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ShortUniqueId = require("short-unique-id");
require("dotenv").config();

const app = express();
const port = 5001;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.use(express.json());
app.use(cors());

// URL Schema
const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, unique: true },
  customAlias: { type: String, unique: true, sparse: true },
});

const Url = mongoose.model("Url", urlSchema);

// Generate unique short ID
const uid = new ShortUniqueId({ length: 6 });

// Shorten URL Endpoint
app.post("/shorten", async (req, res) => {
  const { originalUrl, customAlias } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL is required." });
  }

  try {
    let shortUrl;

    if (customAlias) {
      const existingAlias = await Url.findOne({ customAlias });
      if (existingAlias) {
        return res.status(400).json({ error: "Custom alias already in use." });
      }
      shortUrl = `http://localhost:${port}/${customAlias}`;
    } else {
      let uniqueId;
      do {
        uniqueId = uid();
      } while (await Url.findOne({ shortUrl: `http://localhost:${port}/${uniqueId}` }));

      shortUrl = `http://localhost:${port}/${uniqueId}`;
    }

    const newUrl = new Url({ originalUrl, shortUrl, customAlias: customAlias || null });
    await newUrl.save();

    res.status(201).json({ shortUrl });
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Redirect Endpoint
app.get("/:alias", async (req, res) => {
  const { alias } = req.params;

  try {
    const urlEntry = await Url.findOne({
      $or: [{ shortUrl: `http://localhost:${port}/${alias}` }, { customAlias: alias }],
    });

    if (urlEntry) {
      return res.redirect(urlEntry.originalUrl);
    }

    res.status(404).json({ error: "Short URL not found." });
  } catch (error) {
    console.error("Error finding URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
