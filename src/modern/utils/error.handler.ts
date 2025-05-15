import { FastifyRequest, FastifyReply } from "fastify";

/**
 * Extended Error interface for HTTP error handling
 * 
 * @description
 * This interface extends the native Error object to include
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
 * This function serves as a global error handler that:
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
 * // Throwing an error that this handler will process
 * // throw { statusCode: 404, message: 'Not Found' };
 * 
 * @example
 * // Response in production:
 * // {
 * //   "message": "Not Found",
 * //   "error": "Internal Server Error"
 * // }
 * 
 * @example
 *
 * //throw Error("This is an error");
 * 
 * @property {number} [error.statusCode=500] - HTTP status code
 * @property {string} error.message - Error description
 * @property {string} [error.stack] - Error stack trace (development only)
 * 
 * @see {@link https://fastify.io/docs/latest/Reference/Server/#seterrorhandler|Fastify Error Handler}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status|HTTP Status Codes}
 */
export const membershipErrorHandler = (error: HttpErrorHandler, request: FastifyRequest, reply: FastifyReply): void => {
  const statusCode = error.statusCode || 500;

  reply.status(statusCode).send({ 
    message: error.message,
    error: 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && {
    stack: error.stack
  })
  });
};