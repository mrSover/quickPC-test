"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDto {
    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.role = model.role;
        this.isActivated = model.isActivated;
    }
}
exports.default = UserDto;
