import Fastify from "fastify";
import dotenv from 'dotenv'; 
import { AppConfig } from "./config/config";
import { bootstrap } from 'fastify-decorators';
import { resolve } from 'path';
import { membershipErrorHandler } from './modern/utils/error.handler';
import { logger } from './modern/utils/logger';

dotenv.config();

const fastify = Fastify({
  logger: process.env.LOGGING_ENABLED === 'true'
});

//Set the custom predefined error habdler
fastify.setErrorHandler(membershipErrorHandler);

 (async () => {
  const listeningPort: number = process.env.HTTP_LISTENING_PORT ? 
                                Number(process.env.HTTP_LISTENING_PORT) : AppConfig.HTTP_LISTENING_PORT;
  const listeningAddress: string = process.env.HTTP_LISTENING_ADDRESS || AppConfig.HTTP_LISTENING_ADDRESS;

  fastify.log.info(`HTTP listener on ${listeningAddress}:${listeningPort}`)

  //Register the restify logger and make it available for all the application
  logger.init(fastify.log);

  //Register all the routes within the 'modern/routes' directory
  fastify.register(bootstrap, {
    directory: resolve(__dirname, 'modern/routes'),
    mask: /\.routes\./,
  });

  await fastify.listen({
    port: listeningPort,
    host: listeningAddress
  });

  ["SIGINT", "SIGTERM"].forEach((signal) => {
    process.on(signal, async () => {
        await fastify.close();
        process.exit(0);
    });
  });
 })();