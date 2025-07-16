// Add these imports at the top of App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Typography } from '@mui/material';
import { log } from './utils/loggingMiddleware';
import HomePage from './pages/HomePage';
import StatsPage from './pages/StatsPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/:shortCode" element={<RedirectHandler />} />
      </Routes>
    </Router>
  );
}


function RedirectHandler() {
  const { shortCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUrls = JSON.parse(localStorage.getItem('shortenedUrls')) || [];
    const urlData = savedUrls.find(url => url.shortCode === shortCode);

    if (urlData) {
      
      if (new Date(urlData.expiryDate) < new Date()) {
        log('URL_EXPIRED', { shortCode });
        navigate('/?expired=' + shortCode);
        return;
      }

      
      const updatedUrls = savedUrls.map(url => {
        if (url.shortCode === shortCode) {
          const clickData = {
            timestamp: new Date().toISOString(),
            source: document.referrer || 'Direct',
            location: navigator.geolocation ? 'Approximate location available' : 'Unknown'
          };
          
          return {
            ...url,
            clicks: url.clicks + 1,
            clickData: [...url.clickData, clickData]
          };
        }
        return url;
      });

      localStorage.setItem('shortenedUrls', JSON.stringify(updatedUrls));
      log('URL_REDIRECT', { shortCode, destination: urlData.original });
      window.location.href = urlData.original;
    } else {
      navigate('/?notfound=' + shortCode);
    }
  }, [shortCode, navigate]);

  return <Typography>Redirecting...</Typography>;
}

export default App;