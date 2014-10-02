'use strict';

var app = angular.module('myApp', ['ngRoute', 'ngResource', 'ngCookies', 'ui.bootstrap', 'google-maps']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/register-patient', {
                templateUrl: 'views/partials/register-patient.html',
                controller: 'SignUpCtrl'
            })
            .when('/register-specialist', {
                templateUrl: 'views/partials/register-specialist.html',
                controller: 'SignUpCtrl'
            })
            .when('/profile-specialist', {
                templateUrl: 'views/partials/profile-specialist.html',
                controller: 'SpecialistProfileCtrl'
            })
            .when('/profile-patient', {
                templateUrl: 'views/partials/profile-patient.html',
                controller: 'PatientProfileCtrl'
            })
            .when('/new-examination', {
                templateUrl: 'views/partials/new-examination.html',
                controller: 'NewExaminationCtrl'
            })
            .when('/list-examinations', {
                templateUrl: 'views/partials/list-examinations.html',
                controller: 'ListExaminationsCtrl'
            })
            .when('/view-examination', {
                templateUrl: 'views/partials/view-examination.html',
                controller: 'ViewExaminationCtrl'
            })
            .when('/patient-examinations', {
                templateUrl: 'views/partials/patient-examinations.html',
                controller: 'PatientExaminationsCtrl'
            })
            .when('/new-medicine', {
                templateUrl: 'views/partials/new-medicine.html',
                controller: 'NewMedicineCtrl'
            })
            .when('/edit-medicine', {
                templateUrl: 'views/partials/edit-medicine.html',
                controller: 'EditMedicineCtrl'
            })
            .when('/new-procedure', {
                templateUrl: 'views/partials/new-procedure.html',
                controller: 'NewProcedureCtrl'
            })
            .when('/edit-procedure', {
                templateUrl: 'views/partials/edit-procedure.html',
                controller: 'EditProcedureCtrl'
            })
            .when('/contact-us', {
                templateUrl: 'views/partials/contact-us.html',
                controller: 'ContactCtrl'
            })
            .otherwise({ redirectTo: '/' });
    }])
    .value('toastr', toastr)
    //.constant('baseServiceUrl', 'http://localhost:6022');
    .constant('baseServiceUrl', 'http://biomarketserver.apphb.com');
