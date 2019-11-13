import { ClassModule } from './interfaces';
import { Module } from './Module';
import { Container } from 'inversify';

export class ModuleBuilder {

    private target: ClassModule;

    private modules: Map<ClassModule, Module>;

    constructor(target: ClassModule) {
        this.target = target;
        this.modules = new Map();
    }

    initModule(target: ClassModule): Module {
        if (this.modules.has(target)) {
            return this.modules.get(target);
        }

        const module = new Module(target);

        for (const item of module.imports) {
            const importModule = this.initModule(item);
            for (const identifier of importModule.exports) {
                module.setProvider({
                    provide: identifier,
                    useContainer(container: Container) {
                        const provider = importModule.getProvider(identifier);
                        container.bind(identifier).toConstantValue(provider);
                    }
                })
            }
        }

        module.resolve();

        this.modules.set(target, module);

        return module;
    }

    buid(): Module {
        return this.initModule(this.target);
    }
}
