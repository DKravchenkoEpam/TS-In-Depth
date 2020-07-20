import {Book, LibMgr} from './interfaces';
import { bookCategories } from './enums';
import { BookProperties, BookOrUndefined } from './types';

export function getAllBooks(): Book[] {
    return [
        { title: 'Refactoring JavaScript', category: bookCategories['JavaScript'], author: 'Evan Burchard', available: true, id: 0 },
        { title: 'JavaScript Testing',  category: bookCategories.JavaScript, author: 'Liang Yuxian Eugene', available: false, id: 1 },
        { title: 'CSS Secrets',  category: bookCategories['CSS'], author: 'Lea Verou', available: true, id: 2 },
        { title: 'Mastering JavaScript Object-Oriented Programming', category: bookCategories['JavaScript'], author: 'Andrea Chiarelli', available: true, id: 3 }
    ];
}

export function getBookById(id: number): BookOrUndefined {
    const books = getAllBooks();

    return books.find((book) => book.id === id);
}

export function logFirstAvailable(bookCollection = getAllBooks()): void {
    console.log('logFirstAvailable');

    console.log(bookCollection);
    const book: any = bookCollection.find((book: any) => book.available);
    console.log(book && book.title);
}

export function getBookTitlesByCategory(category = bookCategories.JavaScript): string[] {
    // const books: string[] = [];
    const booksCollection = getAllBooks();

    const books: string[] = [];

    booksCollection.forEach((book) => {
        if (book.category === category) {
            books.push(book.title);
        }
    });

    return books;
}

export function logBookTitles(bookTitles: string[]): void {
    console.log('03.01', bookTitles);

    bookTitles.forEach(title => console.log('03.01 =================> ', title));
}

export function getBookAuthorByIndex(bookIndex: number): [string, string] {
    const books = getAllBooks();

    const book = books[bookIndex];

    return [book.title, book.author];
}

export function calcTotalPages(libs: readonly any[]): bigint {
    return libs.reduce((pages: bigint, lib) => pages + (BigInt(lib.books) * BigInt(lib.avgPagesPerBook)), BigInt(0));
}

export function createCustomerID(name: string, id: number): string {
    return `name => ${name}, id => ${id}`;
}

export function createCustomer(name: string, age?: number, city?: string): void {
    let result: string = '';

    result = `name => ${name} |`;

    if (age) {
        result = `${result} age => ${age} |`;
    }

    if (city) {
        result = `${result} city => ${city} |`;
    }

    console.log(result);
}

export function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
    const result: string[] = [];

    createCustomer(customer);

    bookIDs.forEach((id) => {
        const book = getBookById(id);

        if (book && book.available) {
            result.push(book.title);
        }
    });

    return result;
}

export function getTitles(author: string): any[];
export function getTitles(available: boolean): any[];
export function getTitles(id: number, available: boolean): any[];

export function getTitles(...bookProperties: any[]) {
    const books = getAllBooks();

    return books.filter((book) => {
        let result = false;
        const [bookProperty, availability] = bookProperties;

        switch (typeof bookProperties[0]) {
            case 'string': {
                if (book.author === bookProperty) {
                    result = true;
                }

                break;
            }

            case 'boolean': {
                if (book.available === bookProperty) {
                    result = true;
                }

                break;
            }

            case 'number': {
                if (book.id === bookProperty  && book.available === availability) {
                    result = true;
                }

                break;
            }

            default:
                throw new Error('getTitles should receive min one argument');
        }

        return result;
    });
}


export function assertStringValue(value: any): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('value should have been a string');
    }
}

export function bookTitleTransform(title: any): string {
    assertStringValue(title);
    return title.split('').reverse().join('');
}

export function printBook(book: Book): void {
    console.log('04.01 =====>', `${book.title} by ${book.author}`);
}

export function getBookProp(book: Book, prop: BookProperties): number | string | boolean {
    let result;

    if (book[`${prop}`] instanceof Function) {
        result = book[`${prop}`].name;
    } else {
        result = book[`${prop}`];
    }
    return result;
}

export function purge<T>(inventory: Array<T>): Array<T> {
    return inventory.slice(2);
}

export function getBooksByCategory(category: bookCategories, callback: LibMgr): void {
    setTimeout(() => {
        console.log('09.01.01 ===> ');
        try {
            const books = getBookTitlesByCategory(category);
            if (books.length) {
                callback(null, books);
            } else {
                throw new Error('No books found.');
            }
        }
        catch (e) {
            callback(e, null);
        }
    }, 3000);
}

export const logCategorySearch: LibMgr = function(err, titles) {
    if(err) {
        console.log('09.01.02 ====> ', err.message);
        return;
    }

    console.log('09.01.02 ====> logCategorySearch', titles);
}

export function getBooksByCategoryPromise(category: bookCategories): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        setTimeout(() => {
            console.log('09.02.01 ===> ');
            const books = getBookTitlesByCategory(category);
            if (books.length) {
                resolve(books);
            } else {
                reject('No books found.');
            }
        }, 2000)
    });
}

export async function logSearchResults(category: bookCategories): Promise<void> {
    try {
        const result: string[] = await getBooksByCategoryPromise(category);
        console.log(result);
    } catch (e) {
        console.log(e);
    }
}
