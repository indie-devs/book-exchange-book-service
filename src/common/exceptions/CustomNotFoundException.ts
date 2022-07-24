import { NotFoundException } from "@nestjs/common";

export class CustomNotFoundException extends NotFoundException {
    constructor(id: string, type: string) {
        super(`${type} with id ${id} not found`);
    }
}