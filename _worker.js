const res = await fetch('https://api.x.ai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${env.GROK_API_KEY}`,
  },
  body: JSON.stringify({
    model: 'grok-3',
    max_tokens: 1000,
    messages: body.messages,
  }),
});

const data = await res.json();
// Grok는 OpenAI 형식으로 응답해요
const text = data.choices?.[0]?.message?.content || '';
return new Response(JSON.stringify({ content: [{ text }] }), {
  headers: { 'Content-Type': 'application/json', ...CORS },
});
