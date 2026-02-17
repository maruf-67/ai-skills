import mongoose, { Schema } from 'mongoose';
import { auditPlugin } from '../../../common/models/plugins/auditPlugin.js';

export interface IEntity {
    name: string;
    slug: string;
}

const entitySchema = new Schema<IEntity>(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, trim: true },
    },
    { timestamps: true },
);

entitySchema.plugin(auditPlugin);
entitySchema.index({ slug: 1 }, { unique: true });

export const EntityModel = mongoose.model<IEntity>('Entity', entitySchema);
