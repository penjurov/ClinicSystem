var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    examinationSchema = new Schema({
        Specialist: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        Patient: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        Information: String,
        Procedure: {
            type: Schema.ObjectId,
            ref: 'Procedure'
        },
        Medicine: {
            type: Schema.ObjectId,
            ref: 'Medicine'
        },
        Result: String
    }),
    Examination = mongoose.model('Examination', examinationSchema);

module.exports = {
    Examination: Examination
};