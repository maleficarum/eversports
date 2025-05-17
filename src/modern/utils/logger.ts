import { FastifyBaseLogger } from 'fastify';

/**
 * Defines a global logger that contains the fastify logger and its configuration
 */
export const logger: {
  instance: FastifyBaseLogger | null;
  init: (fastifyLogger: FastifyBaseLogger) => void;
  get: () => FastifyBaseLogger | null;
} = {
  instance: null,
  init: (fastifyLogger: FastifyBaseLogger) => (logger.instance = fastifyLogger),
  get: () => logger.instance,
};