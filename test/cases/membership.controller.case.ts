import { bootstrap } from 'fastify-decorators';
import { FastifyInstance } from 'fastify';
import supertest from 'supertest';
import { resolve } from 'path';
import { AppServer } from '../../src/index';

export const membershipControllerTestCase = () => {
  let appServer: AppServer;
  let fastify: FastifyInstance;

  describe("Membership controller tests", () => {

    beforeAll(async () => {

      appServer = new AppServer();
      fastify = appServer['fastify'];

      // Explicitly wait for route registration
      await fastify.register(bootstrap, {
        directory: resolve(__dirname, '../../src/modern/routes'),
        mask: /\.routes\./
      });

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