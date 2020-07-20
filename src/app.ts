import { bookCategories } from './enums';

import {
    Author,
    Book,
    Librarian,
    Logger,
    Magazine
} from './interfaces';

import {
    RefBook,
    Shelf,
    UniversityLibrarian
} from './classes';

import {
    BookRequiredFields,
    CreateCustomerFunctionType,
    PersonBook,
    UpdatedBook
} from './types';

import {
    bookTitleTransform,
    calcTotalPages,
    checkoutBooks,
    createCustomer,
    createCustomerID,
    getAllBooks,
    getBookAuthorByIndex,
    getBookById,
    getBookProp,
    getBooksByCategory,
    getBooksByCategoryPromise,
    getBookTitlesByCategory,
    getTitles,
    logBookTitles,
    logCategorySearch,
    logFirstAvailable,
    logSearchResults,
    printBook,
    purge
} from './functions';

import('./classes')
    .then((templates) => {
        console.log(new templates.Reader());
    })
    .catch(e => console.log(e));

const inventory: Array<Book> = [
    { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: bookCategories.Software },
    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: bookCategories.Software },
    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: bookCategories.Software },
    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: bookCategories.Software }
]

console.log('07.01.01 ====> ', purge(getAllBooks()));
console.log('07.01.02 ====> ', purge(inventory));
console.log('07.01.03 ====> ', purge([1,2,3]));

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

const favoriteAuthor: Author = {
    name: 'someName',
    email: 'someEmail',
    numBooksPublished: 10
};

const favoriteLibrarian: Librarian = {
    name: 'someLibrarianName',
    email: 'someLibrarianEmail',
    department: 'someDepartment',
    assistCustomer: function(custName) {
        console.log('04.03 ===> ', `${custName}`, `Name ====> ${this.name}, Email ====> ${this.email}, Department ====> ${this.department}`);
    }
};

favoriteLibrarian.assistCustomer('someCustomer');

console.log(getAllBooks());

console.log('03.01 => ', getBookById(1));

logFirstAvailable();

logBookTitles(getBookTitlesByCategory());

console.log(getBookAuthorByIndex(3));

const cityLibs: readonly any[] = <const>[{ lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 }, { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 }, { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }];

console.log(calcTotalPages(cityLibs));

const myId: string = createCustomerID('Ann', 10);

console.log(myId);

let idGenerator: (name: string, id: number) => string;

idGenerator = (name, id) => {
    return `name => ${name}, id => ${id}`;
};

idGenerator = createCustomerID;

console.log(idGenerator('Ann', 10));

console.log('03.03 ====> ');
createCustomer('Den');

console.log('03.03 ====> ');
createCustomer('Den', 10);

console.log('03.03 ====> ');
createCustomer('Den', 10, 'Minsk');

const myBooks = checkoutBooks('Ann', 0, 1, 3);
console.log(myBooks);

const checkedOutBooks = getTitles(false);
console.log(checkedOutBooks);

console.log(bookTitleTransform('Hello'));

const myBook: BookRequiredFields = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: bookCategories.CSS,
    pages: 200,
    markDamaged: (reason) => {
        console.log('04.01 ===> ', `Damaged: ${reason}`);
    }
};

const newBook: UpdatedBook = {
    id: 6
}

printBook(myBook);

myBook.markDamaged('miss');

const logDamage: Logger = (reason) => console.log('04.02 ====> ', `Damaged: ${reason}`);

logDamage('some reason');

const offer: any = {
    book: {
        title: 'Essential TypeScript'
    },
    getTitle: function() {
        console.log(this.book.title);
    }
};

console.log('optional chaining', offer?.getTitle?.());
console.log(offer?.book?.title);

console.log('04.05 ====> ', getBookProp(myBook, 'title'));
console.log('04.05 ====> ', getBookProp(myBook, 'markDamaged'));

const refBook = new RefBook('someEncyclopedia', 2020, 1);
refBook.printCitation();

const favoriteLibrarian1: Librarian = new UniversityLibrarian('someName', 'someEmail', 'someDepartment');

favoriteLibrarian1.assistCustomer('customer');

const book: PersonBook = {
    name: 'name',
    email: 'email',
    id: 1,
    title: 'title',
    author: 'author',
    available: true,
    category: bookCategories.TypeScript,
};

console.log(book);

const bookShelf = new Shelf<Book>();

inventory.forEach((book) => bookShelf.add(book))
console.log('07.02.01 ===> ', bookShelf.getFirst());

const magazines: Magazine[] = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' }
];

const magazineShelf = new Shelf<Magazine>();
magazines.forEach((magazine) => magazineShelf.add(magazine));
console.log('07.02.02 ===> ', magazineShelf.getFirst());
magazineShelf.printTitles();
console.log('07.03.02 ===> ', magazineShelf.find('Five Points'));

const params: Parameters<CreateCustomerFunctionType> = ['hello'];

createCustomer(...params);
console.log('07.04.01 ===> ', params);

const uLabr = new UniversityLibrarian('name', 'email', 'department');
uLabr.name = 'name';
uLabr.name1 = 'hello';
console.log('08.06.01 ====> ', uLabr);
// uLabr.assistFaculty = () => console.log('hello');
uLabr.assistFaculty();
uLabr.assistCustomer('08.05.01');

const enc = new RefBook('someTitle', 2020, 1);
enc.copies = 3;
enc.printItem();
console.log('08.07.01 ====> ',enc)

getBooksByCategory(bookCategories.Angular, logCategorySearch);

getBooksByCategoryPromise(bookCategories.JavaScript)
    .then(data => {
        logCategorySearch(null, data);
        return data.length;
    }).then((length) => console.log('09.02.02', length))
    .catch(e => logCategorySearch(e, null));

console.log('start');
const promise = logSearchResults(bookCategories.Software);
console.log(promise);
console.log('end');
