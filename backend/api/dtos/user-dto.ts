import { Types } from 'mongoose';

export default class UserDto {
    email: string;
    _id: Types.ObjectId;
    role: string;
    isActivated: boolean;

    constructor(model: UserDto) {
        this.email = model.email;
        this._id = model._id;
        this.role = model.role;
        this.isActivated = model.isActivated;
    }
} 
