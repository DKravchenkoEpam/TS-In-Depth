import {bookCategories} from "./enums";

export function sealed(param: any): Function {
    return (target: Function): void  => {
        console.log(`Sealing the constructor ${param}`);
        Object.seal(target);
        Object.seal(target.prototype);
    }
}

export function logger<TFunction extends Function>(target: TFunction): TFunction {
    const newConstructor: Function =  function () {
        console.log('Creating new instance');
        console.log(target);
        this.age = 30;
    };

    newConstructor.prototype = Object.create(target.prototype);
    newConstructor.prototype.printLibrarian = (): void => {
        console.log(`Librarian name:  ${this.name}, Librarian age: ${this.age}. `);
    }

    return newConstructor as TFunction;
}

export function writable(isWritable: boolean) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
        console.log('08.03.01 ===>', target);
        console.log(`08.03.01 ===> ${methodName}`)
        console.log(`08.03.01 ===> Parameter: ${isWritable}`);
        descriptor.writable = isWritable;
    }
}

export function timeout(delay: number) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
        console.log('08.04.01 ===> ', delay);
        const method = target[`${methodName}`];

        descriptor.value = function (...args: any[]) {
            setTimeout(() => {
                method.call(this, args);
            }, delay);
        }

        return descriptor;
    }
}

export function logParameter(target: any, methodName: string, parameterIndex: number) {
    if (!Array.isArray(target[`${methodName}_decor_params_indexes`])) {
        target[`${methodName}_decor_params_indexes`] = [];
    }

    target[`${methodName}_decor_params_indexes`].push(parameterIndex);
}

export function logMethod(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = { value: descriptor.value };

    descriptor.value = function (...args: any[] ) {
       const indexArr = target[`${methodName}_decor_params_indexes`] || [];
       indexArr.forEach(el => console.log(`Method: ${methodName}, ParamIndex: ${el}, ParamValue: ${args[el]}`));

        return originalMethod.value.call(this, args);
    };

    return descriptor;
}

function makeProperty<T>(
    prototype: any,
    propertyName: string,
    getTransformer: (value: any) => T,
    setTransformer: (value: any) => T
) {
    const values = new Map<any, T>();

    Object.defineProperty(prototype, propertyName, {
        set(firstValue: any) {
            Object.defineProperty(this, propertyName, {
                get(): any {
                    if(getTransformer){
                        return getTransformer(values.get(this));
                    } else {
                        return values.get(this);
                    }
                },
                set(value: any) {
                    if (setTransformer) {
                        values.set(this, setTransformer(value))
                    } else {
                        values.set(this, value);
                    }
                },
                enumerable: true
            });

            this[propertyName] = firstValue;
        },

        enumerable: true,
        configurable: true
    });
}

export function format(pref: string = 'Mr. / Mrs.') {
    return function (target: any, propertyName: string) {
        makeProperty(target, propertyName, value => `${pref}${value}`, value => value)
    }
}

export function positiveInteger(target: any, propName: string, descriptor: PropertyDescriptor) {
    const originalSetter = descriptor.set;

    descriptor.set = function (value: number): void {
        if (value < 1 ||!Number.isInteger(value)) {
            throw new Error('Value should be more than one and integer')
        }

        originalSetter.call(this, value);
    }

    return descriptor;
}
