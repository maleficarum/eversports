export interface IValidator {

    isValid(entity: Record<string, string | number>): boolean;

}