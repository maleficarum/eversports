export interface IValidator {

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    isValid(entity: Record<string, string | number>): boolean;

}