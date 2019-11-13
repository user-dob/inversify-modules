import { Container, interfaces } from 'inversify';
import { ModuleProps, ClassModule, Provider } from './interfaces';
import { MODULE_METADATA_KEY } from './annotation/module';

export class Module {
    private container: Container;
    private target: ClassModule;

    readonly imports: Array<ClassModule>;
    readonly exports: Array<interfaces.ServiceIdentifier<any>>;
    private providers: Array<Provider>;

    constructor(target: ClassModule) {
        this.target = target;
        const props: ModuleProps = Reflect.getMetadata(MODULE_METADATA_KEY, target);
        if (!props) {
            throw new Error(`Missing required @module annotation in: ${target.name}.`); 
        }

        this.imports = props.imports || [];
        this.exports = props.exports || [];
        this.providers = props.providers || [];

        this.container = new Container({defaultScope: 'Singleton'})
    }

    getProvider<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T {
        return this.container.get<T>(serviceIdentifier);
    }

    setProvider(provider: Provider) {
        if (typeof provider === 'function') {
            provider = { provide: provider, useClass: provider };
        }

        const { provide } = provider;

        if (this.container.isBound(provide)) {
            return;
        }    

        if ('useClass' in provider) {
            return this.container.bind(provide).to(provider.useClass);
        }

        if ('useValue' in provider) {
            return this.container.bind(provide).toConstantValue(provider.useValue);
        }

        if ('useContainer' in provider) {
            return provider.useContainer(this.container);
        }
    }

    resolve() {
        for (const provider of this.providers) {
            this.setProvider(provider);
        }
        this.container.resolve(this.target);
    }

}