"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let Mixed = mongoose_1.Schema.Types.Mixed;
exports.AccountsMongooseSchema = function (collection) {
    collection = collection || 'accounts';
    let schema = new mongoose_1.Schema({
        /* Identification */
        _id: { type: String },
        login: { type: String, required: true, unique: true, index: true },
        name: { type: String, required: true },
        /* Activity tracking */
        create_time: { type: Date, required: true, 'default': Date.now },
        deleted: { type: Boolean, required: false },
        active: { type: Boolean, required: true, 'default': true },
        /* User preferences */
        about: { type: String, required: false },
        time_zone: { type: String, required: false },
        language: { type: String, required: false },
        theme: { type: String, required: false },
        /* Custom fields */
        custom_hdr: { type: Mixed, required: false },
        custom_dat: { type: Mixed, required: false }
    }, {
        collection: collection,
        autoIndex: true,
        strict: true
    });
    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    return schema;
};
//# sourceMappingURL=AccountsMongooseSchema.js.map