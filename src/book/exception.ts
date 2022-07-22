import { CustomBadRequestException } from "src/common/exceptions/CustomBadRequestException";
import { CustomNotFoundException } from "src/common/exceptions/CustomNotFoundException";
import { CustomUnknownException } from "src/common/exceptions/CustomUnknownException";

export class BookNotFoundException extends CustomNotFoundException {
    constructor(bookId: number) {
        super(bookId, "Book");
    }
}

export class BookExchangeBadRequestException extends CustomBadRequestException {
    constructor(action: string) {
        super(action, "Book");
    }
}

export class BookUnknownException extends CustomUnknownException {
    constructor(action: string, additionalInfo: string) {
        super(action, "Book", additionalInfo);
    }
}