import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import { log } from '../utils/loggingMiddleware';
import { generateShortCode, validateUrl, getExpiryDate } from '../utils/helpers';

export default function UrlForm({ onShorten }) {
  const [urls, setUrls] = useState([{ original: '', shortCode: '', validity: '' }]);
  const [errors, setErrors] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addUrlField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { original: '', shortCode: '', validity: '' }]);
    }
  };

  const removeUrlField = (index) => {
    if (urls.length > 1) {
      const newUrls = urls.filter((_, i) => i !== index);
      setUrls(newUrls);
    }
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  const newErrors = [];
  const validUrls = [];
  let hasErrors = false;

 
  const customCodes = urls
    .map(url => url.shortCode)
    .filter(code => code !== '');

  const hasDuplicates = new Set(customCodes).size !== customCodes.length;

  urls.forEach((url, index) => {
    const currentErrors = {};
    
  
    if (!url.original) {
      currentErrors.original = 'URL is required';
    } else if (!validateUrl(url.original)) {
      currentErrors.original = 'Invalid URL format (must include http:// or https://)';
    }

   
    if (url.shortCode && !/^[a-zA-Z0-9_-]+$/.test(url.shortCode)) {
      currentErrors.shortCode = 'Only letters, numbers, hyphens and underscores allowed';
    } else if (hasDuplicates && url.shortCode) {
      currentErrors.shortCode = 'Custom code must be unique';
    }

   
    if (url.validity && isNaN(parseInt(url.validity))) {
      currentErrors.validity = 'Must be a whole number';
    }

    if (Object.keys(currentErrors).length > 0) {
      newErrors[index] = currentErrors;
      hasErrors = true;
      return;
    }

  
    const shortCode = url.shortCode || generateShortCode();
    const validity = url.validity ? parseInt(url.validity) : 30;
    const expiryDate = getExpiryDate(validity);

    validUrls.push({
      original: url.original,
      shortCode,
      expiryDate,
      clicks: 0,
      clickData: []
    });
  });

  setErrors(newErrors);

  if (!hasErrors && validUrls.length > 0) {
    log('URL_SHORTENED', { count: validUrls.length });
    onShorten(validUrls);
  }
};

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Shorten URLs
      </Typography>
      
      {urls.map((url, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Original URL"
              value={url.original}
              onChange={(e) => handleChange(index, 'original', e.target.value)}
              error={!!errors[index]?.original}
              helperText={errors[index]?.original}
              required
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              fullWidth
              label="Custom Code (optional)"
              value={url.shortCode}
              onChange={(e) => handleChange(index, 'shortCode', e.target.value)}
            />
          </Grid>
          <Grid item xs={4} sm={2}>
            <TextField
              fullWidth
              label="Validity (mins)"
              type="number"
              value={url.validity}
              onChange={(e) => handleChange(index, 'validity', e.target.value)}
              error={!!errors[index]?.validity}
              helperText={errors[index]?.validity || 'Default: 30'}
            />
          </Grid>
          <Grid item xs={2} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
            {urls.length > 1 && (
              <Button 
                variant="outlined" 
                color="error"
                onClick={() => removeUrlField(index)}
              >
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      ))}

      <Grid container spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            onClick={addUrlField}
            disabled={urls.length >= 5}
          >
            Add Another URL
          </Button>
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            Shorten URLs
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}