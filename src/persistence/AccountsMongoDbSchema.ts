import { Schema } from 'mongoose';
let Mixed = Schema.Types.Mixed;

export let AccountsMongoDbSchema = function(collection?: string) {
    collection = collection || 'accounts';

    let schema = new Schema(
        {
            /* Identification */
            _id: { type: String },
            login: { type: String, required: true, unique: true, index: true },
            name: { type: String, required: true },

            /* Activity tracking */
            create_time: { type: Date, required: true, 'default': Date.now },
            active: { type: Boolean, required: true, 'default': true },

            /* User preferences */
            about: { type: String, required: false },
            time_zone: { type: String, required: false },
            language: { type: String, required: false },
            theme: { type: String, required: false },

            /* Custom fields */
            custom_hdr: { type: Mixed, required: false },
            custom_dat: { type: Mixed, required: false }
        },
        {
            collection: collection,
            autoIndex: true,
            strict: true
        }
    );

    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;

            return ret;
        }
    });

    return schema;
}
