import { validateEmail, validateProApiKey } from './validator.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'UP', edge: 'Cloudflare Workers' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (url.pathname === '/v1/verify') {
      const email = url.searchParams.get('email') || '';
      const apiKey = request.headers.get('x-api-key') || '';
      const isPro = validateProApiKey(apiKey);

      const result = validateEmail(email);

      return new Response(JSON.stringify({
        ...result,
        tier: isPro ? 'PRO_UNLIMITED' : 'COMMUNITY_FREE',
        payoutDestination: {
          binanceUid: '1049392123',
          username: 'User-79a91'
        }
      }, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    return new Response(JSON.stringify({ error: 'Endpoint not found. Use GET /v1/verify?email=...' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
