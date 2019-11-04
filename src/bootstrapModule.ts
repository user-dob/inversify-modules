import { ClassModule } from 'src/interfaces';
import { Module } from 'src/Module';
import { ModuleBuilder } from 'src/ModuleBuilder';

export const bootstrapModule = (target: ClassModule): Module => {
    const builder = new ModuleBuilder(target);
    return builder.buid();
}
