export const log = (action, data) => {
  
  const timestamp = new Date().toISOString();
  const logEntry = { timestamp, action, data };
  
  
  console.log('LOGGING:', logEntry);
  
 
  const logs = JSON.parse(localStorage.getItem('urlShortenerLogs')) || [];
  logs.push(logEntry);
  localStorage.setItem('urlShortenerLogs', JSON.stringify(logs));
};