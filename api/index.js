module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.json({ 
    message: 'Hedera dApp Backend is running!', 
    status: 'success',
    timestamp: new Date().toISOString(),
    endpoints: {
      trackVisit: '/api/track-visit',
      balance: '/api/balance/:accountId'
    }
  });
}; 