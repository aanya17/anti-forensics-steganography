const MAX_NAME = 255;
module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Use POST for analysis summaries.' });
  }
  const body = req.body || {};
  const name = typeof body.name === 'string' ? body.name.slice(0, MAX_NAME) : 'unknown';
  const size = Number.isFinite(body.size) && body.size >= 0 ? body.size : null;
  const type = typeof body.detectedType === 'string' ? body.detectedType.slice(0, 100) : 'Unidentified / other';
  const mismatch = body.extensionMismatch === true;
  const metadataPresent = body.metadataPresent === true;
  const pixelDeviation = Number.isFinite(body.pixelDeviation) ? Math.max(0, Math.min(0.5, body.pixelDeviation)) : null;
  const indicators = [];
  if (mismatch) indicators.push({ code: 'EXTENSION_MISMATCH', severity: 'review', message: 'File extension and detected signature differ.' });
  if (metadataPresent) indicators.push({ code: 'METADATA_PRESENT', severity: 'info', message: 'A common metadata segment or chunk was detected.' });
  if (pixelDeviation !== null && pixelDeviation < 0.02) indicators.push({ code: 'LSB_NEAR_BALANCED', severity: 'info', message: 'Sampled RGB LSB values are near-balanced; this is not proof of hidden data.' });
  if (!indicators.length) indicators.push({ code: 'NO_RULE_TRIGGERED', severity: 'info', message: 'No configured lightweight rule triggered. This does not establish that the file is clean.' });
  return res.status(200).json({
    ok: true,
    engine: 'StegoForge rules-based triage',
    generatedAt: new Date().toISOString(),
    evidence: { name, sizeBytes: size, detectedType: type },
    indicators,
    conclusion: 'Preliminary triage only. Indicators are not proof of steganography, tampering, or authenticity.',
    limitations: ['This endpoint receives a small metadata summary, not the file itself.', 'No machine-learning model is run.', 'Validate findings using trusted forensic tools.']
  });
};
