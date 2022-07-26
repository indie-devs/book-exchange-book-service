import { CustomBadRequestException } from "src/common/exceptions/CustomBadRequestException";
import { CustomForbiddenException } from "src/common/exceptions/CustomForbiddenException";
import { CustomNotFoundException } from "src/common/exceptions/CustomNotFoundException";

export class BookExchangeSessionNotFoundException extends CustomNotFoundException {
    constructor(bookExchangeSessionId: string) {
        super(bookExchangeSessionId, "BookExchangeSession");
    }
}

export class BookExchangeSessionForbiddenException extends CustomForbiddenException {
    constructor(actorId: string, bookExchangeSessionId: string, action: string) {
        super(actorId, bookExchangeSessionId, action, "BookExchangeSession");
    }
}

export class BookExchangeSessionBadRequestException extends CustomBadRequestException {
    constructor(action: string) {
        super(action, "BookExchangeSession");
    }
}