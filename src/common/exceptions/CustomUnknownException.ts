import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

export class CustomUnknownException extends InternalServerErrorException {
    constructor(action: string, type: string, additionalInfo: string) {
        super(`${action} on domain ${type} failed${additionalInfo ? ' with error ' + additionalInfo : ''}`);
    }
}