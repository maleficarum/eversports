import { FastifyServer } from '../../src/modern/server/FastifyServer';
import { bootstrap } from 'fastify-decorators';
import { resolve } from 'path';
import { FastifyInstance } from 'fastify';
import supertest from 'supertest';

export const appTest = () => {

  let appServer: FastifyServer;
  let fastify: FastifyInstance;
  const APPLICATION_ENVIRONMENT = "test";

  beforeAll(async () => {
    process.env.APPLICATION_ENVIRONMENT = APPLICATION_ENVIRONMENT;
    appServer = new FastifyServer();
    fastify = appServer['fastify'];

    // Explicitly wait for route registration
    await fastify.register(bootstrap, {
      directory: resolve(__dirname, '../../src/modern/controller'),
      mask: /\.routes\./
    });

    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
  });

  it('should has a list all health information', async () => {
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