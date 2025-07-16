import React, { useState, useEffect } from "react";
import { Log } from "../utils/logger";
import { TextField, Button, Box, Typography } from "@mui/material";

function ShortenerPage() {
  const [longUrl, setLongUrl] = useState("");
  const [validity, setValidity] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [result, setResult] = useState(null);


  useEffect(() => {
    Log("frontend", "info", "page", "ShortenerPage loaded");
  }, []);

  const handleSubmit = async () => {
    if (!longUrl) {
      await Log("frontend", "error", "form", "Long URL is required");
      alert("Please enter the long URL");
      return;
    }

    let validMinutes = parseInt(validity);
    if (isNaN(validMinutes)) {
      validMinutes = 30;
      await Log("frontend", "warn", "form", "Validity not provided, defaulting to 30");
    }

    const payload = {
      longUrl,
      validity: validMinutes,
      shortcode: shortcode || undefined,
    };

    try {
      const res = await fetch("http://localhost:5000/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setResult(data);
      await Log("frontend", "info", "api", "Short URL created successfully");
    } catch (err) {
      await Log("frontend", "error", "api", `Failed to shorten URL: ${err.message}`);
      alert("Error shortening URL.");
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4">URL Shortener</Typography>
      <TextField
        label="Long URL"
        fullWidth
        margin="normal"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
      />
      <TextField
        label="Validity (mins)"
        fullWidth
        margin="normal"
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
      />
      <TextField
        label="Custom Shortcode (optional)"
        fullWidth
        margin="normal"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Shorten
      </Button>

      {result && (
        <Box mt={2}>
          <Typography>Short URL: {result.shortUrl}</Typography>
          <Typography>Expires At: {result.expiry}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default ShortenerPage;
