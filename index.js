import Fastify from 'fastify';
import formbody from '@fastify/formbody';
import fetch from 'node-fetch';

const fastify = Fastify();

fastify.register(formbody);

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

const start = async () => {
  try {
    await fastify.listen({
      port: process.env.PORT || 3000,
      host: '0.0.0.0' // This line is REQUIRED for Render
    });
    console.log('✅ Proxy server running');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
