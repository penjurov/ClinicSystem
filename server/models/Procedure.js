var mongoose = require('mongoose'),
	procedureSchema = mongoose.Schema({
		name: {
			type: String,
			require: '{PATH} is required',
			unique: true
		},
		desc: {
			type: String,
			require: '{PATH} is required'
		},
		recovery: String
	}),
	Procedure = mongoose.model('Procedure', procedureSchema);

module.exports.seedInitialProcedures = function () {
	'use strict';

	Procedure.find({}).exec(function (err, collection) {
		if (err) {
			console.log('Cannot find procedures: ' + err);
			return;
		}

		if (collection.length === 0) {
			Procedure.create({
				name: 'Breast implant',
				desc: 'A breast implant is a prosthesis used to change the size, form, and texture of a woman’s breast; in plastic surgery, breast implants are applied for post–mastectomy breast reconstruction; for correcting congenital defects and deformities of the chest wall; for aesthetic breast augmentation; and for creating breasts in the male-to-female transsexual patient.',
				recovery: 'The surgical scars of a breast augmentation mammoplasty develop approximately at 6-weeks post-operative, and fade within months. Depending upon the daily-life physical activities required of the woman, the breast augmentation patient usually resumes her normal life at 1-week post-operative. Moreover, women whose breast implants were emplaced beneath the chest muscles (submuscular placement) usually have a longer, slightly more painful convalescence, because of the healing of the incisions to the chest muscles. Usually, she does not exercise or engage in strenuous physical activities for approximately 6 weeks. During the initial post-operative recovery, the woman is encouraged to regularly exercise (flex and move) her arm to alleviate pain and discomfort; if required, analgesic indwelling medication catheters can alleviate pain.e'
			});

			Procedure.create({
				name: 'Pregnancy test',
				desc: 'Can check if you created a new life',
				recovery: 'Nine month recovery'
			});

			Procedure.create({
				name: 'Relief pain knee (anesthesia) ',
				desc: 'After hard sport trauma in left knee',
				recovery: '2 week recovery without activity'
			});

			console.log("Procedures funny data seeded!");
		}
	});
};