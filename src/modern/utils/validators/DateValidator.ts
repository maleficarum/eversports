import { IValidator } from "./IValidator";

/**
 * Simple date format validator.
 */
export class DateValidator implements IValidator {

    /**
     * Validate the format of the given parameter
     * @param date The date in form of record { date: "YYYY-MMM-DDD" }
     * @returns true if it is a valid format
     */
    isValid({ date }: Record<string, string | number>): boolean {
        const parsedDate = new Date(date);

        return (parsedDate instanceof Date &&
            !isNaN(parsedDate.getTime()) &&
            parsedDate.toString() !== 'Invalid Date');
    }
};