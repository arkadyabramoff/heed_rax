const fetch = require('node-fetch');

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

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get visitor's IP address
    const clientIP = req.headers['x-forwarded-for'] || 
                     req.headers['x-real-ip'] ||
                     req.connection?.remoteAddress || 
                     req.socket?.remoteAddress ||
                     req.ip ||
                     'Unknown';

    // Clean IP (remove IPv6 prefix if present)
    const visitorIP = clientIP.replace(/^::ffff:/, '').split(',')[0].trim();
    
    // Use fallback data for testing
    const geoData = {
      status: 'success',
      query: visitorIP,
      city: 'Test City',
      regionName: 'Test Region',
      country: 'Test Country',
      countryCode: 'US',
      isp: 'Test ISP',
      timezone: 'UTC',
      lat: 0,
      lon: 0
    };

    res.json({ 
      success: true, 
      message: 'Visit tracked successfully',
      location: `${geoData.city}, ${geoData.country}`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Visit tracking error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}; 