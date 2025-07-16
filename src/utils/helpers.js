export const generateShortCode = () => {
  return Math.random().toString(36).substring(2, 8);
};

export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const getExpiryDate = (minutes = 30) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + minutes);
  return date;
};