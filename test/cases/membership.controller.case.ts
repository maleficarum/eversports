import { bootstrap } from 'fastify-decorators';
import { FastifyInstance } from 'fastify';
import { resolve } from 'path';
import { FastifyServer } from '../../src/modern/server/FastifyServer';
import { loadTestJson } from './helpers/loadTestPayload.helper';
import { MembershipValidator } from '../../src/modern/utils/validators/MembershipValidator';

export const membershipControllerTestCase = () => {
  let appServer: FastifyServer;
  let fastify: FastifyInstance;
  const EXPECTED_HTTP_ERROR_CODE = 400;
  const EXPECTED_HTTP_SUCCESS_CODE = 200;
  const EXPECTED_HEALTH_STATUS = "OK";

  describe("Membership controller tests", () => {

    beforeAll(async () => {

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

    it('should have registered routes', () => {
      expect(fastify.hasRoute({ method: 'GET', url: '/memberships' })).toBe(true);
      expect(fastify.hasRoute({ method: 'POST', url: '/memberships' })).toBe(true);
      expect(fastify.hasRoute({ method: 'GET', url: '/health' })).toBe(true);
    });

  });

  describe("Membership health route test", () => {

    beforeAll(async () => {

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

    it('should show health status', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/health'
      });

      expect(response.statusCode).toEqual(EXPECTED_HTTP_SUCCESS_CODE);
      expect(response.json().health.status).toEqual(EXPECTED_HEALTH_STATUS);
    });

  });

  describe("Cash method validation", () => {

    beforeAll(async () => {

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

    it('should validate recurring price gt 100 for cash mayment method', async () => {
      const membership = loadTestJson(__dirname, 'cashPriceBelow100.json');
      const response = await fastify.inject({
        method: 'POST',
        url: '/memberships',
        payload: membership
      });

      expect(response.json().message).toEqual(MembershipValidator.ERROR_MESSAGES.CASH_PRICE_BELOW_MINIMUM);
      expect(response.json().statusCode).toEqual(EXPECTED_HTTP_ERROR_CODE);
    });

  });

  describe("Monthly billing interval validation", () => {

    beforeAll(async () => {

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

    it('should validate billing period gt 12 for monthly billing interval', async () => {
      const membership = loadTestJson(__dirname, 'billingPeriodsMoreThan12Months.json');
      const response = await fastify.inject({
        method: 'POST',
        url: '/memberships',
        payload: membership
      });

      expect(response.json().message).toEqual(MembershipValidator.ERROR_MESSAGES.MONTHLY_BILLING_EXCEEDS_MAX);
      expect(response.json().statusCode).toEqual(EXPECTED_HTTP_ERROR_CODE);
    });


    it('should validate billing period lt 6 for monthly billing interval', async () => {
      const membership = loadTestJson(__dirname, 'billingPeriodsLessThan6Months.json');
      const response = await fastify.inject({
        method: 'POST',
        url: '/memberships',
        payload: membership
      });

      expect(response.json().message).toEqual(MembershipValidator.ERROR_MESSAGES.MONTHLY_BILLING_BELOW_MIN);
      expect(response.json().statusCode).toEqual(EXPECTED_HTTP_ERROR_CODE);
    });
  });

  describe("Yearly billing interval validation", () => {

    beforeAll(async () => {

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

    it('should validate billing period gt 10 years', async () => {
      const membership = loadTestJson(__dirname, 'billingPeriodsMoreThan10Years.json');
      const response = await fastify.inject({
        method: 'POST',
        url: '/memberships',
        payload: membership
      });

      expect(response.json().message).toEqual(MembershipValidator.ERROR_MESSAGES.YEARLY_BILLING_EXCEEDS_MAX);
      expect(response.json().statusCode).toEqual(EXPECTED_HTTP_ERROR_CODE);
    });

    it('should validate billing period lt 3 years', async () => {
      const membership = loadTestJson(__dirname, 'billingPeriodsLessThan3Years.json');
      const response = await fastify.inject({
        method: 'POST',
        url: '/memberships',
        payload: membership
      });

      expect(response.json().message).toEqual(MembershipValidator.ERROR_MESSAGES.YEARLY_BILLING_BELOW_MIN);
      expect(response.json().statusCode).toEqual(EXPECTED_HTTP_ERROR_CODE);
    });

  });

};