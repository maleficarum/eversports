/**
 * Factory for the bunyan logger creation.
 *
 * @interface ILoggerFactory
 */

import * as bunyan from 'bunyan';
import { ILoggerFactory } from "../ILoggerFactory";

/**
 * Enum with Bunyan log levels
 */
export enum BunyanLoggerLevel {
    FATAL = 60,
    ERROR = 50,
    WARN = 40,
    INFO = 30,
    DEBUG = 20,
    TRACE = 10
}

export class BunyanLoggerFactory implements ILoggerFactory { 

    private static instance: BunyanLoggerFactory;

    private constructor() {}

    static getInstance(): ILoggerFactory {
        if(!BunyanLoggerFactory.instance) {
            BunyanLoggerFactory.instance = new BunyanLoggerFactory();
        }

        return BunyanLoggerFactory.instance;
    }

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    createLogger(config: Record<string, any>): object {
        config.level = process.env.APPLICATION_ENVIRONMENT === 'production' ? BunyanLoggerLevel.INFO : BunyanLoggerLevel.DEBUG;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return  bunyan.createLogger(config);
    }
}
