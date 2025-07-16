import React, { useState, useEffect } from 'react';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';
import { log } from '../utils/loggingMiddleware';

export default function HomePage() {
  const [urls, setUrls] = useState([]);

 
  useEffect(() => {
    const savedUrls = JSON.parse(localStorage.getItem('shortenedUrls')) || [];
    
    const activeUrls = savedUrls.filter(url => 
      new Date(url.expiryDate) > new Date()
    );
    setUrls(activeUrls);
    log('PAGE_LOAD', { page: 'home', loadedUrls: activeUrls.length });
  }, []);

  const handleShorten = (newUrls) => {
    const withCreationDate = newUrls.map(url => ({
      ...url,
      createdAt: new Date().toISOString(),
      clicks: 0,
      clickData: []
    }));
    
    const updatedUrls = [...urls, ...withCreationDate];
    setUrls(updatedUrls);
   
    localStorage.setItem('shortenedUrls', JSON.stringify(updatedUrls));
    log('URLS_SHORTENED', { count: newUrls.length });
  };

  
  const cleanupExpiredUrls = () => {
    const activeUrls = urls.filter(url => 
      new Date(url.expiryDate) > new Date()
    );
    if (activeUrls.length !== urls.length) {
      setUrls(activeUrls);
      localStorage.setItem('shortenedUrls', JSON.stringify(activeUrls));
    }
  };

  
  useEffect(() => {
    const interval = setInterval(cleanupExpiredUrls, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [urls]);

  return (
    <div>
      <UrlForm onShorten={handleShorten} />
      {urls.length > 0 && <UrlList urls={urls} />}
    </div>
  );
}