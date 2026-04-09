const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    const url = new URL(request.url);

    if (url.pathname === '/api/analyze' && request.method === 'POST') {
      try {
        const body = await request.json();

        const res = await fetch('https://api.x.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.GROK_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'grok-3',
            max_tokens: 2000,
            messages: body.messages,
          }),
        });

        const data = await res.json();
        const text = data.choices?.[0]?.message?.content || '';

        return new Response(JSON.stringify({ content: [{ text }] }), {
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      }
    }

    return env.ASSETS.fetch(request);
  },
};
