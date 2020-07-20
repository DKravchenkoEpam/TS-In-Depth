import {Author, Book, Person} from './interfaces';

type BookProperties = keyof Book;
type PersonBook = Person & Book;
type BookOrUndefined = Book | undefined;
type BookRequiredFields = Required<Book>;
type UpdatedBook = Partial<Book>;
type AuthorWoEmail = Omit<Author, 'email'>;
type CreateCustomerFunctionType = (name: string, age?: number, city?: string) => void;

export {
    BookProperties,
    PersonBook,
    BookOrUndefined,
    BookRequiredFields,
    UpdatedBook,
    AuthorWoEmail,
    CreateCustomerFunctionType
}
