import http from 'http';
import { validateEmail, validateProApiKey } from './validator.js';

const PORT = process.env.PORT || 3000;
const TARGET_BINANCE_UID = '1049392123';

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Api-Key');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health
  if (pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'UP', service: 'Disposable Email Validator API' }));
    return;
  }

  // GET /v1/verify?email=test@mailinator.com
  if (pathname === '/v1/verify' && req.method === 'GET') {
    const email = url.searchParams.get('email') || '';
    const apiKey = req.headers['x-api-key'] || url.searchParams.get('api_key') || '';
    const isPro = validateProApiKey(apiKey);

    const result = validateEmail(email);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      ...result,
      tier: isPro ? 'PRO_UNLIMITED' : 'COMMUNITY_FREE',
      payoutDestination: {
        binanceUid: TARGET_BINANCE_UID,
        proUpgrade: '$15 USDT Lifetime (User-79a91)'
      }
    }, null, 2));
    return;
  }

  // POST /v1/verify
  if (pathname === '/v1/verify' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        const email = data.email || '';
        const apiKey = req.headers['x-api-key'] || data.apiKey || '';
        const isPro = validateProApiKey(apiKey);

        const result = validateEmail(email);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          ...result,
          tier: isPro ? 'PRO_UNLIMITED' : 'COMMUNITY_FREE',
          payoutDestination: {
            binanceUid: TARGET_BINANCE_UID,
            proUpgrade: '$15 USDT Lifetime (User-79a91)'
          }
        }, null, 2));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // Default Landing / Doc
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Disposable Email Validator API</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-950 text-gray-200 p-8 font-mono">
      <div class="max-w-2xl mx-auto border border-gray-800 rounded-xl p-6 bg-gray-900 shadow-xl">
        <h1 class="text-xl font-bold text-yellow-400 mb-2">⚡ Disposable Email Validator Micro-API</h1>
        <p class="text-xs text-gray-400 mb-4">Detect burner emails and fraud signups in sub-5ms.</p>
        <div class="bg-black/60 p-3 rounded-lg text-xs mb-4">
          <code>GET /v1/verify?email=user@mailinator.com</code>
        </div>
        <p class="text-xs text-gray-400">Pro Unlimited API Key: Send $15 USDT via Binance Pay to UID: <strong>1049392123</strong> (User-79a91).</p>
      </div>
    </body>
    </html>
  `);
});

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => {
    console.log(`🚀 Disposable Email Validator API running on port ${PORT}`);
    console.log(`💳 Binance Pay Pro Licensing: UID ${TARGET_BINANCE_UID}`);
  });
}

export { server };
