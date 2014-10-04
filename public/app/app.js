'use strict';

var app = angular.module('myApp', ['ngRoute', 'ngResource', 'ngCookies', 'ui.bootstrap', 'google-maps']).
    config(['$routeProvider', function($routeProvider) {
        var routeUserChecks = {
            adminRole: {
                authenticate: function(auth) {
                    return auth.isAuthorizedForRole('specialist');
                }
            },
            authenticated: {
                authenticate: function(auth) {
                    return auth.isAuthenticated();
                }
            }
        };

        $routeProvider
            .when('/register-patient', {
                templateUrl: '/partials/patient/patient-register',
                controller: 'SignUpCtrl',
                resolve: routeUserChecks.adminRole
            })
           .when('/register-specialist', {
                templateUrl: '/partials/specialist/specialist-register',
                controller: 'SignUpCtrl',
                resolve: routeUserChecks.adminRole
            })
            .when('/profile-specialist', {
                templateUrl: '/partials/specialist/specialist-profile',
                controller: 'ProfileCtrl',
                resolve: routeUserChecks.adminRole
            })
            .when('/profile-patient', {
                templateUrl: '/partials/patient/patient-profile',
                controller: 'ProfileCtrl',
                resolve: routeUserChecks.authenticated
            })
            /*            .when('/new-examination', {
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
            })*/
            .otherwise({ redirectTo: '/' });
    }])
    .value('toastr', toastr);

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    })
});
