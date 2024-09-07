import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    isActivated: boolean;
    role: string;
    activationLink?: string;
}

const UserSchema = new Schema<IUser>({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    role: { type: String, default: 'USER'},
    activationLink: { type: String },
});

const UserModel = model<IUser>('User', UserSchema);

export default UserModel;