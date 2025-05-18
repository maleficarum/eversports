export interface IEntityFactory {

    createEntity(entity: Record<string, any>): object;
    
}