import { Types } from 'mongoose';

export default class UserDto {
    email: string;
    id: Types.ObjectId;
    role: string;
    isActivated: boolean;

    constructor(model: { email: string; _id: Types.ObjectId; isActivated: boolean; role: string }) {
        this.email = model.email;
        this.id = model._id;
        this.role = model.role;
        this.isActivated = model.isActivated;
    }
} 