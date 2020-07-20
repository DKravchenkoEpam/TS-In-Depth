import { ReferenceItem } from './referenceItem';
import {positiveInteger} from '../decorators';

export default class extends ReferenceItem {
    private _copies: number;

    constructor(title: string, year: number, public edition: number) {
        super(title, year);
    }

    get copies(): number {
        return this.copies;
    }

    @positiveInteger
    set copies(value) {
        this._copies = value;
    }

    printItem() {
        super.printItem();
        console.log('05.02 ====> ', `Edition: ${this.edition} year`);
    }

    printCitation(): void {
        console.log('05.03 ===> ', `Title -> ${this.title}, Year -> ${this.year}`);
    }
}
