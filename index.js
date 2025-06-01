import Fastify from 'fastify';
import formbody from '@fastify/formbody'; // correct usage
import fetch from 'node-fetch';

const fastify = Fastify();

// Register the plugin directly
await fastify.register(formbody);

fastify.post('/check-website', async (request, reply) => {
  try {
    const response = await fetch('http://3.6.235.10:8000/check-website', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request.body),
    });

    const result = await response.json();
    return result;

  } catch (err) {
    console.error('Proxy error:', err);
    reply.code(500).send({ error: 'Proxy failed' });
  }
});

fastify.listen({ port: process.env.PORT || 3000 }, (err) => {
  if (err) throw err;
  console.log('Proxy server running');
});
