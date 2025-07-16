import React from 'react';
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper,
  Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function UrlStats({ urls }) {
  return (
    <div>
      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
        URL Statistics
      </Typography>
      
      {urls.map((url, index) => (
        <Accordion key={index} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ width: '30%', flexShrink: 0 }}>
              {url.shortCode}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {url.original.length > 40 
                ? `${url.original.substring(0, 40)}...` 
                : url.original}
            </Typography>
            <Chip 
              label={`${url.clicks} clicks`} 
              color="primary" 
              size="small" 
              sx={{ ml: 2 }}
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>Original URL:</strong> {url.original}
            </Typography>
            <Typography>
              <strong>Short URL:</strong> {window.location.origin}/{url.shortCode}
            </Typography>
            <Typography>
              <strong>Created:</strong> {new Date(url.createdAt).toLocaleString()}
            </Typography>
            <Typography>
              <strong>Expires:</strong> {new Date(url.expiryDate).toLocaleString()}
            </Typography>
            
            {url.clickData.length > 0 && (
              <>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Click Details
                </Typography>
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Timestamp</TableCell>
                        <TableCell>Source</TableCell>
                        <TableCell>Location</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {url.clickData.map((click, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            {new Date(click.timestamp).toLocaleString()}
                          </TableCell>
                          <TableCell>{click.source || 'Direct'}</TableCell>
                          <TableCell>{click.location || 'Unknown'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}