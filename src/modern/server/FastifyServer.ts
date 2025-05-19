import Fastify, { FastifyInstance } from 'fastify';
import dotenv from 'dotenv';
import { AppConfig } from '../../config/config';
import { bootstrap } from 'fastify-decorators';
import { resolve } from 'path';
import { membershipErrorHandler } from '../../modern/utils/error.handler';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import cors from '@fastify/cors';
import ajvErrors from 'ajv-errors';
import ajvFormats from 'ajv-formats';
import { BunyanLoggerFactory } from '../utils/factory/impl/BunyanLoggerFactory';
import { ILoggerFactory } from '../utils/factory/ILoggerFactory';

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
export class FastifyServer {

  private readonly fastify: FastifyInstance;
  private readonly port: number;
  private readonly host: string;
  private readonly environment: string;
  private readonly apiVersion: string;
  private loggerFactory: ILoggerFactory = BunyanLoggerFactory.getInstance();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private logger: any = this.loggerFactory.createLogger({ name: "FastifyServer" });

  constructor() {
    this.environment = process.env.APPLICATION_ENVIRONMENT ?? AppConfig.APPLICATION_ENVIRONMENT;
    this.port = process.env.HTTP_LISTENING_PORT ? Number(process.env.HTTP_LISTENING_PORT) : AppConfig.HTTP_LISTENING_PORT;
    this.host = process.env.HTTP_LISTENING_ADDRESS ?? AppConfig.HTTP_LISTENING_ADDRESS;
    this.apiVersion = AppConfig.EVERSPORTS_API_VERSION;

    this.fastify = Fastify({
      logger: true,
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

    await this.fastify.register(cors);
    
    if (this.shouldEnableSwagger()) {
      await this.configureSwagger();
    }
  }

  //TODO: Figure out how to handle Swagger enablement due jest not works with Swagger
  private shouldEnableSwagger(): boolean {
    return !(this.environment == 'production' || this.environment == 'test');
    //return false;
  }

  private async configureSwagger(): Promise<void> {
    this.logger.info(`Enabling swagger for environment ${this.environment}`);

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
      directory: resolve(__dirname, '../controller'),
      mask: /\.routes\./,
    });

    this.logger.info("Routes ready " + __dirname + "../controller");
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

      this.logger.info(`Server listening on ${this.host}:${this.port} and serving API version ${this.apiVersion}`);
      this.setupGracefulShutdown();
    } catch (error) {
      this.logger.error(error);
      process.exit(1);
    }
  }
}