/**
 * Interface defining the basic logger instantiation
 * 
 * @example
 * 
 * new [ExampleLoggerFactory].createLogger("MyController", {
 *  level: 1
 * });
 *
 * or
 *
 * [ExampleLoggerFactory].getInstance().createLogger("MyController", {
 *  level: 1
 * });
 */

export interface ILoggerFactory {

    /**
     * Function building specific logger
     * 
     * @param config The object containing the specific logger config for each logger type.
     */
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    createLogger(config: Record<string, any>): object;
}