import { Schema, model, Document, Types } from 'mongoose';

interface IRole extends Document {
    user: Types.ObjectId;
    value: string;
    description: string;
}

const RoleSchema = new Schema<IRole>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    value: { type: String, unique: true, required: true },
    description: { type: String, required: true },
});

const RoleModel = model<IRole>('Role', RoleSchema);

export default RoleModel;