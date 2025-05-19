export interface IEntityFactory {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createEntity(entity: Record<string, any>): object;
    
}