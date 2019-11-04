import { expect } from 'chai';
import { injectable } from 'inversify';
import { module, bootstrapModule } from 'src';

describe('ModuleBuilder', () => {

    it('two providers', () => {

        let expectA: A;

        @injectable()
        class A {}

        @injectable()
        class B {
            constructor(a: A) {
                expectA = a;
            }
        }

        @module({
            providers: [
                A,
                B
            ]
        })
        class TestModule {}

        const testModule = bootstrapModule(TestModule);

        testModule.getProvider(B);

        expect(expectA).to.instanceOf(A);
    })

    it('three providers', () => {

        let expectA1: A;
        let expectA2: A;
        let expectB: B;

        @injectable()
        class A {}

        @injectable()
        class B {
            constructor(a: A) {
                expectA1 = a;
            }
        }

        @injectable()
        class C {
            constructor(a: A, b: B) {
                expectA2 = a;
                expectB = b;
            }
        }

        @module({
            providers: [
                A,
                B,
                C
            ]
        })
        class TestModule {}

        const testModule = bootstrapModule(TestModule);

        testModule.getProvider(C);

        expect(expectA1).to.instanceOf(A);
        expect(expectA2).to.instanceOf(A);
        expect(expectB).to.instanceOf(B);
        
    })

    it('import module', () => {

        let expectA: A;

        @injectable()
        class A {}

        @injectable()
        class B {
            constructor(a: A) {
                expectA = a;
            }
        }
       
        @module({
            exports: [
                A
            ],
            providers: [
                A
            ]
        })
        class ImportModule {}

        @module({
            imports: [
                ImportModule
            ],
            providers: [
                B
            ]
        })
        class TestModule {}

        const testModule = bootstrapModule(TestModule);

        testModule.getProvider(B);

        expect(expectA).to.instanceOf(A);
    })

})