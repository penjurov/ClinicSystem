var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var examinationSchema = new Schema({
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
});

var Examination = mongoose.model('Examination', examinationSchema);

module.exports = {
    Examination: Examination,
    seedInitialExaminations: function(){
        Examination.find({}).exec(function(err, result){
            if(err){
                return console.log(err);
            }

            if(result.length === 0){
                Examination.create({
                    Information: 'Has fever',
                    Result: 'Patient is sick'
                });

                console.log('Seed examination added');
            }
        });
    }
};