import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Typography,
  Link,
  Chip
} from '@mui/material';
import { log } from '../utils/loggingMiddleware';

export default function UrlList({ urls }) {
  const handleClick = (shortCode) => {
    log('URL_COPIED', { shortCode });
    navigator.clipboard.writeText(`${window.location.origin}/${shortCode}`);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Your Shortened URLs
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Original URL</TableCell>
            <TableCell>Short URL</TableCell>
            <TableCell>Expires</TableCell>
            <TableCell>Clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.map((url, index) => (
            <TableRow key={index}>
              <TableCell>
                <Link href={url.original} target="_blank" rel="noopener">
                  {url.original.length > 50 
                    ? `${url.original.substring(0, 50)}...` 
                    : url.original}
                </Link>
              </TableCell>
              <TableCell>
                <Link 
                  href={`/${url.shortCode}`} 
                  onClick={() => handleClick(url.shortCode)}
                >
                  {url.shortCode}
                </Link>
                <Chip 
                  label="Copy" 
                  size="small" 
                  onClick={() => handleClick(url.shortCode)}
                  sx={{ ml: 1 }}
                />
              </TableCell>
              <TableCell>
                {new Date(url.expiryDate).toLocaleString()}
              </TableCell>
              <TableCell>{url.clicks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}