import sha256 from 'crypto-js/sha256';

export const generateRandomString = (length = 15) => {
  const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array(length)
    .fill(0)
    .map((item) => Math.floor(Math.random() * (charSet.length + 1)));
};

export const sha256Gen = (buffer) => {
  return sha256(buffer);
};

export const base64URLEncode = (str) => {
  return str.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};
