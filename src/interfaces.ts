import { Container, interfaces } from 'inversify';

export type ClassModule<T = any> = interfaces.Newable<T>;

export type ClassProvider = {
    provide: interfaces.ServiceIdentifier<any>;
    useClass: interfaces.Newable<any>;
}

export type ValueProvider = {
    provide: interfaces.ServiceIdentifier<any>;
    useValue: any;
}

export type ContainerProvider = {
    provide: interfaces.ServiceIdentifier<any>;
    useContainer: (container: Container) => void;
}

export type Provider = interfaces.Newable<any> | ClassProvider | ValueProvider | ContainerProvider;

export type ModuleProps = {
    imports?: Array<ClassModule>;
    exports?: Array<interfaces.ServiceIdentifier<any>>;
    providers?: Array<Provider>;
};