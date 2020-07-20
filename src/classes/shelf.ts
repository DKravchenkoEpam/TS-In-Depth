import { ShelfItem } from '../interfaces';

export default class<T extends ShelfItem>{
    private _items: Array<T> = [];

    add(item: T):void {
        this._items.push(item);
    }

    getFirst(): T{
        return this._items[0];
    }

    find(title: string): T {
        return this._items.find((el) => el.title === title);
    }

    printTitles(): void {
        this._items.forEach(el => console.log('07.03.01 ===> ', el.title));
    }
}
