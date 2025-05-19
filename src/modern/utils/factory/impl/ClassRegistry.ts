import { MembershipValidator } from '../../validators/MembershipValidator';
import { MembershipFactory } from './MembershipFactory';
import { MembershipPeriodFactory } from './MembershipPeriodFactory';

/**
 * Factory resgitry to hold all the entity factory in a Map to be instantiated 
 * by class name as string and using a constructor with the given arguments
 * 
 * @example
 * 
 * const membershipFactory: IEntityFactory = FactoryRegistry.create<MembershipFactory>("MembershipFactory", undefined);
 */
export class ClassRegistry {

    private static factoryRegistry = new Map<string, new (...args: unknown[]) => unknown>();

    static register<T>(name: string, ctor: new (...args: unknown[]) => T) {
        this.factoryRegistry.set(name, ctor);
    }

    static create<T>(name: string, ...args: unknown[]): T {
        const ctor = this.factoryRegistry.get(name);
        if (!ctor) {
            throw new Error(`Class ${name} not registered`);
        }
        return new ctor(...args) as T;
    }    
}

//Registration of the required classes
ClassRegistry.register("MembershipFactory", MembershipFactory);
ClassRegistry.register("MembershipPeriodFactory", MembershipPeriodFactory);
ClassRegistry.register("MembershipValidator", MembershipValidator);