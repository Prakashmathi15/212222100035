import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { log } from '../utils/loggingMiddleware';

export default function Navbar() {
  const handleNavigation = (page) => {
    log('NAVIGATION', { page });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          URL Shortener
        </Typography>
        <Button 
          color="inherit" 
          component={Link} 
          to="/"
          onClick={() => handleNavigation('home')}
        >
          Home
        </Button>
        <Button 
          color="inherit" 
          component={Link} 
          to="/stats"
          onClick={() => handleNavigation('stats')}
        >
          Statistics
        </Button>
      </Toolbar>
    </AppBar>
  );
}