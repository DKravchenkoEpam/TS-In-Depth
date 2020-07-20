import { timeout } from '../decorators';

export abstract class ReferenceItem {
    private _publisher: string;
    static department: string = 'someDepartment';

    constructor (public title: string, protected year: number) {
        console.log('Creating a new ReferenceItem...');
    }

    @timeout(1000)
    printItem(): void {
        console.log('05.01 ====> ', `${this.title} was published in ${this.year}`, `Department => ${ReferenceItem.department}`);
    }

    get publisher(): string {
        return this._publisher.toUpperCase();
    }

    set publisher(newPublisher: string) {
        this._publisher = newPublisher;
    }

    abstract printCitation(): void;
}
