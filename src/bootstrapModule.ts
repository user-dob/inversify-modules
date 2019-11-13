import { ClassModule } from './interfaces';
import { Module } from './Module';
import { ModuleBuilder } from './ModuleBuilder';

export const bootstrapModule = (target: ClassModule): Module => {
    const builder = new ModuleBuilder(target);
    return builder.build();
}
