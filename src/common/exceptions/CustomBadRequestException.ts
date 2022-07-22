import { BadRequestException, NotFoundException } from "@nestjs/common";

export class CustomBadRequestException extends BadRequestException {
    constructor(action: string, type: string) {
        super(`Bad request on ${action} with domain ${type}`);
    }
}