import { bootstrap } from 'fastify-decorators';
import { FastifyInstance } from 'fastify';
import supertest from 'supertest';
import { resolve } from 'path';
import { FastifyServer } from '../../src/modern/server/FastifyServer';

export const membershipControllerTestCase = () => {
  let appServer: FastifyServer;
  let fastify: FastifyInstance;

  describe("Membership controller tests", () => {

    beforeAll(async () => {

      appServer = new FastifyServer();
      fastify = appServer['fastify'];

      // Explicitly wait for route registration
      await fastify.register(bootstrap, {
        directory: resolve(__dirname, '../../src/modern/controller'),
        mask: /\.routes\./
      });

      //appServer.start();

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

  });

};