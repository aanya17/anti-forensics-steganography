module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(200).json({
    ok: true,
    service: 'StegoForge lightweight forensic triage API',
    version: '1.0.0',
    mode: 'serverless',
    fileUploads: false,
    timestamp: new Date().toISOString()
  });
};
