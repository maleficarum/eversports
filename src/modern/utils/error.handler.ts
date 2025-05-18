import { FastifyRequest, FastifyReply } from "fastify";

/**
 * Extended Error interface for HTTP error handling
 * 
 * @author Oscar I. Hernandez V.
 * 
 * @description
 * Extension for the standard Error Handler definition
 * HTTP-specific error information for API responses.
 * 
 * @interface HttpErrorHandler
 * @extends Error
 * 
 * @property {number} [statusCode] - HTTP status code (default: 500 if not specified)
 * @property {string} message - Human-readable error description (required)
 */

interface HttpErrorHandler extends Error {
  statusCode?: number;
  message: string;
}

/**
 * Centralized error handler for Fastify applications
 * 
 * @description
 * Centrilized and standarized error handler for all application required to extends and customize the errors
 * - Standardizes error responses across the API
 * - Provides appropriate HTTP status codes
 * - Includes error details in development mode
 * 
 * @template {HttpErrorHandler} T
 * @param {T} error - The error object to handle
 * @param {FastifyRequest} request - The Fastify request object that is throwing the error
 * @param {FastifyReply} reply - The Fastify reply object to send the generated response
 * @returns {void}
 * 
 * @example
 *  Throwing an error that this handler will process
 *  throw { statusCode: 404, message: 'Not Found' };
 * 
 * @property {number} [error.statusCode=500] - HTTP status code
 * @property {string} error.message - Error description
 * @property {string} [error.stack] - Error stack trace (development only)
 * 
 */
export const membershipErrorHandler = (error: HttpErrorHandler, request: FastifyRequest, reply: FastifyReply): void => {
  const statusCode = error.statusCode || 500;

  reply.status(statusCode).send({ 
    message: error.message.replace(/\bbody\/[^\s]+\b/g, "").replace(/\s+/g, " ").replace(/\bbody\b|\s+|,/g, '').trim(),
    error: 'Internal Server Error',
    ...(process.env.APPLICATION_ENVIRONMENT !== 'production' && {
    stack: error.stack
  })
  });
};