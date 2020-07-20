import * as Interfaces from '../interfaces';
import {format, logger, logMethod, logParameter, writable} from '../decorators';

@logger
export class UniversityLibrarian implements Interfaces.Librarian {
    @format() name1: string;

    constructor(public name: string, public email: string, public department: string ) {}

    @logMethod
    assistCustomer(@logParameter castName: string) {
        console.log('05.04 ====> ', `${this.name} is assisting ${castName}`);
    }

    @writable(false)
    assistFaculty() {
        console.log('08.03.02 ===> Assisting faculty');
    }

    teachCommunity() {
        console.log('08.03.02 ===> Teaching community');
    }
}
