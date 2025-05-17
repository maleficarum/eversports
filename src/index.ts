import Fastify, { FastifyInstance } from 'fastify';
import dotenv from 'dotenv';
import { AppConfig } from './config/config';
import { bootstrap } from 'fastify-decorators';
import { resolve } from 'path';
import { membershipErrorHandler } from './modern/utils/error.handler';
import { logger } from './modern/utils/logger';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import cors from '@fastify/cors';
import ajvErrors from 'ajv-errors';
import ajvFormats from 'ajv-formats';

dotenv.config();

/**
 * The entry point to the application.
 * 
 * @author Oscar I. Hernandez V.
 * 
 * @description
 * 
 * This Class bootstraps the HTTP server, configuring Fastify with the env vars or the default AppConfig.
 * 
 * @interface HttpErrorHandler
 * @extends Error
 * 
 * @property {number} [statusCode] - HTTP status code (default: 500 if not specified)
 * @property {string} message - Human-readable error description (required)
 */
export class AppServer {
  private readonly fastify: FastifyInstance;
  private readonly port: number;
  private readonly host: string;
  private readonly environment: string;
  private readonly apiVersion: string;

  constructor() {
    this.environment = process.env.APPLICATION_ENVIRONMENT ?? AppConfig.APPLICATION_ENVIRONMENT;
    this.port = process.env.HTTP_LISTENING_PORT ? Number(process.env.HTTP_LISTENING_PORT) : AppConfig.HTTP_LISTENING_PORT;
    this.host = process.env.HTTP_LISTENING_ADDRESS ?? AppConfig.HTTP_LISTENING_ADDRESS;
    this.apiVersion = AppConfig.EVERSPORTS_API_VERSION;

    this.fastify = Fastify({
      logger: process.env.LOGGING_ENABLED === 'true',
      ajv: {
        customOptions: {
          allErrors: true,
          coerceTypes: 'array',
          useDefaults: true
        },
        plugins: [ajvErrors, ajvFormats]
      }
    });
  }

  private async registerPlugins(): Promise<void> {
    this.fastify.setErrorHandler(membershipErrorHandler);
    logger.init(this.fastify.log);

    await this.fastify.register(cors);
    
    if (this.shouldEnableSwagger()) {
      await this.configureSwagger();
    }
  }

  //TODO: Figure out how to handle Swagger enablement due jest not works with Swagger
  private shouldEnableSwagger(): boolean {
    //return this.environment !== 'production';
    return false;
  }

  private async configureSwagger(): Promise<void> {
    this.fastify.log.info(`Enabling swagger for environment ${this.environment}`);

    await this.fastify.register(fastifySwagger, {
      openapi: {
        info: {
          title: 'Eversports API',
          description: 'API Documentation',
          version: this.apiVersion
        }
      }
    });

    await this.fastify.register(fastifySwaggerUi, {
      routePrefix: '/swagger',
      uiConfig: {
        docExpansion: 'list'
      }
    });
  }

  private async registerRoutes(): Promise<void> {
    await this.fastify.register(bootstrap, {
      directory: resolve(__dirname, 'modern/routes'),
      mask: /\.routes\./,
    });

    this.fastify.log.info("Routes ready");
  }

  private setupGracefulShutdown(): void {
    const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
    signals.forEach(signal => {
      process.on(signal, async () => {
        await this.fastify.close();
        process.exit(0);
      });
    });
  }

  public async start(): Promise<void> {
    try {
      await this.registerPlugins();
      await this.registerRoutes();
      
      await this.fastify.listen({
        port: this.port,
        host: this.host
      });

      this.fastify.log.info(`Server listening on ${this.host}:${this.port} and serving API version ${this.apiVersion}`);
      this.setupGracefulShutdown();
    } catch (error) {
      this.fastify.log.error(error);
      process.exit(1);
    }
  }
}

// Start the application
new AppServer().start();