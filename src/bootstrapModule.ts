import { ClassModule } from './interfaces';
import { ModuleBuilder } from './ModuleBuilder';

export const bootstrapModule = <T>(target: ClassModule<T>): T => {
    const builder = new ModuleBuilder(target);
    return builder.build().getProvider<T>(target);
}
