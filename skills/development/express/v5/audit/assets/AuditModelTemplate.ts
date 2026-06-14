import { Schema } from 'mongoose';
import { auditPlugin } from '../../../common/models/plugins/auditPlugin.js';

export const buildAuditedSchema = () => {
    const schema = new Schema(
        {
            title: { type: String, required: true, trim: true },
        },
        { timestamps: true },
    );

    schema.plugin(auditPlugin);
    return schema;
};
