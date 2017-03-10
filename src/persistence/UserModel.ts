let 
    mongoose = require('mongoose'),

    Schema = mongoose.Schema,
    Mixed = Schema.Types.Mixed;

let 
    UserSchema = new Schema(
        {
            /* Identification */
            _id: { type: String, unique: true },
            name: { type: String, required: true },
            email: { type: String, required: true, unique: true, index: true },

            /* Activity tracking */
            created: { type: Date, required: true, 'default': Date.now },
            active: { type: Boolean, required: true, 'default': true },

            /* User preferences */
            time_zone: { type: Number, required: false },
            language: { type: String, required: false },
            theme: { type: String, required: false },

            /* Custom fields */
            custom_hdr: { type: Mixed, required: false },
            custom_dat: { type: Mixed, required: false }
        },
        {
            collection: 'users',
            autoIndex: true,
            strict: true
        }
    );

    UserSchema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;

            return ret;
        }
    });

module.exports = function(connection) {
    return connection.model('User', UserSchema);
};
