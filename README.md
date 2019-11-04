# inversify-modules

## Use
```typescript
// Foo module
@injectable()
class FooProviderInner {}

@injectable()
class FooProvider {
    constructor(fooProviderInner: FooProviderInner) {}
}

@module({
    exports: [
        FooProvider
    ],
    providers: [
        FooProviderInner,
        FooProvider
    ]
})
class FooModule {}

// Bar module
@injectable()
class BarProvider {
    constructor(fooProvider: FooProvider) {}
}

@module({
    imports: [
        FooModule
    ],
    providers: [
        BarProvider
    ]
})
class BarModule {}

// Init root module
bootstrapModule(BarModule);
```

## Tests

```bash
npm run test
```
