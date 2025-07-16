import React, { useState, useEffect } from 'react';
import UrlStats from '../components/UrlStats';
import { log } from '../utils/loggingMiddleware';

export default function StatsPage() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const savedUrls = JSON.parse(localStorage.getItem('shortenedUrls')) || [];
    setUrls(savedUrls);
    log('PAGE_LOAD', { page: 'stats', loadedUrls: savedUrls.length });
  }, []);

  return (
    <div>
      <UrlStats urls={urls} />
    </div>
  );
}