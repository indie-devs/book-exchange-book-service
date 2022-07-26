import { CustomBadRequestException } from "src/common/exceptions/CustomBadRequestException";
import { CustomForbiddenException } from "src/common/exceptions/CustomForbiddenException";
import { CustomNotFoundException } from "src/common/exceptions/CustomNotFoundException";
import { CustomUnknownException } from "src/common/exceptions/CustomUnknownException";

export class BookNotFoundException extends CustomNotFoundException {
    constructor(bookId: string) {
        super(bookId, "Book");
    }
}

export class BookBadRequestException extends CustomBadRequestException {
    constructor(action: string) {
        super(action, "Book");
    }
}

export class BookUnknownException extends CustomUnknownException {
    constructor(action: string, additionalInfo: string) {
        super(action, "Book", additionalInfo);
    }
}

export class BookForbiddenException extends CustomForbiddenException {
    constructor(actorId: string, bookId: string, action: string) {
        super(actorId, bookId, action, "Book");
    }
}