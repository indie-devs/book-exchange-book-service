import { NotFoundException } from "@nestjs/common";

export class CustomNotFoundException extends NotFoundException {
    constructor(id: number, type: string) {
        super(`${type} with id ${id} not found`);
    }
}