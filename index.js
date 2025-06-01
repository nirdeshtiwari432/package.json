import Fastify from 'fastify';
import fetch from 'node-fetch';
import formbody from '@fastify/formbody';
import cors from '@fastify/cors';

const fastify = Fastify();

// Register CORS — important!
await fastify.register(cors, {
  origin: true, // or set to a specific origin like 'https://kunwar-awadhiya.onrender.com'
});

// Register form body parser
fastify.register(formbody);

// Route to proxy check-website requests
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

// Start the server
fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' }, (err) => {
  if (err) throw err;
  console.log('✅ Proxy server running');
});
