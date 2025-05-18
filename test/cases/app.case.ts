import { FastifyServer } from '../../src/index';
import { bootstrap } from 'fastify-decorators';
import { resolve } from 'path';
import { FastifyInstance } from 'fastify';
import supertest from 'supertest';

export const appTest = () => {
  let appServer: FastifyServer;
  let fastify: FastifyInstance;

  beforeAll(async () => {
    appServer = new FastifyServer();
    fastify = appServer['fastify'];

    // Explicitly wait for route registration
    await fastify.register(bootstrap, {
      directory: resolve(__dirname, '../../src/modern/routes'),
      mask: /\.routes\./
    });

    appServer.start();

    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
  });

  it('should have registered routes', () => {
    expect(fastify.hasRoute({ method: 'GET', url: '/memberships' })).toBe(true);
    expect(fastify.hasRoute({ method: 'POST', url: '/memberships' })).toBe(true);
    expect(fastify.hasRoute({ method: 'GET', url: '/health' })).toBe(true);
  });

  it('should has a list of membership', async () => {
    const response = await supertest(fastify.server).get('/health').expect(200)
    const healthData = response.body;

    const expectedShape = {
        health: expect.objectContaining({
          status: 'OK',
          startupTimeInMillisecs: expect.any(Number),
          uptimeInMillisec: expect.any(Number)
        })
      };

    expect(healthData).toEqual(expect.objectContaining(expectedShape));
  });
};