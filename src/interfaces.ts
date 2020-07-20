import { bookCategories } from './enums';

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: bookCategories;
    pages?: number;
    markDamaged?: DamageLogger;
}

interface DamageLogger {
    (arg1: string): void;
}

interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    numBooksPublished: number;
}

interface Librarian extends Person {
    department: string;
    assistCustomer: (custName: string) => void;
}

interface Magazine {
    title: string;
    publisher: string;
}

interface ShelfItem {
    title: string;
}

interface LibMgr {
    (err: Error, titles: string[]): void
}

export {
    Book,
    DamageLogger as Logger,
    Person,
    Author,
    Librarian,
    Magazine,
    ShelfItem,
    LibMgr
};
