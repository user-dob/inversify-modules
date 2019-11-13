import { injectable } from 'inversify';
import { ClassModule, ModuleProps } from '../interfaces';

export const MODULE_METADATA_KEY = Symbol.for('MODULE_METADATA_KEY');

export const module = (props: ModuleProps) => {
    return (target: ClassModule) => {
        if (Reflect.hasOwnMetadata(MODULE_METADATA_KEY, target)) {
            throw new Error('Cannot apply @module decorator multiple times.');
        }
        
        target = injectable()(target);
        Reflect.defineMetadata(MODULE_METADATA_KEY, props, target);
    };
};
