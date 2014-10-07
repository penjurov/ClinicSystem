var mongoose = require('mongoose');

var examinationSchema = mongoose.Schema({
    patientFirstName: { type: String, require: '{PATH} is required'},
    patientLastName: { type: String, require: '{PATH} is required' },
    age: Number
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
                    patientFirstName: 'Pesho',
                    patientLastName: 'Petrov',
                    age: 13
                })
            }
        })
    }
};