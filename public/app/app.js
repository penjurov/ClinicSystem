'use strict';

var app = angular.module('myApp', ['ngRoute', 'ngResource', 'ngCookies', 'ui.bootstrap', 'google-maps']).
    config(['$routeProvider', function($routeProvider) {
        var routeUserChecks = {
            adminRole: {
                authenticate: function(auth) {
                    return auth.isAuthorizedForRole('specialist');
                }
            },
            patientRole: {
                authenticate: function(auth) {
                    return auth.isAuthorizedForRole('patient');
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
            .when('/list-patients', {
                templateUrl: '/partials/patient/list-patients',
                controller: 'ListPatientsCtrl',
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
                resolve: routeUserChecks.patientRole
            })
            .when('/new-medicine', {
                templateUrl: '/partials/medicine/new-medicine',
                controller: 'MedicineCtrl',
                resolve: routeUserChecks.adminRole
            })
            .when('/edit-medicine', {
                templateUrl: '/partials/medicine/edit-medicine',
                controller: 'MedicineCtrl',
                resolve: routeUserChecks.adminRole
            })
            .when('/new-procedure', {
                templateUrl: '/partials/procedure/new-procedure',
                controller: 'ProcedureCtrl',
                resolve: routeUserChecks.adminRole
            })
            .when('/edit-procedure', {
                templateUrl: '/partials/procedure/edit-procedure',
                controller: 'ProcedureCtrl',
                resolve: routeUserChecks.adminRole
            })
            .when('/new-examination', {
                templateUrl: '/partials/examination/new-examination',
                controller: 'NewExaminationCtrl',
                resolve: routeUserChecks.adminRole
            })
            .when('/list-examinations', {
                templateUrl: 'partials/examination/list-examinations',
                controller: 'ListExaminationsCtrl',
                resolve: routeUserChecks.adminRole
            })
            .when('/view-examination/:id', {
                templateUrl: 'partials/examination/view-examination',
                controller: 'ViewExaminationCtrl',
                resolve: routeUserChecks.authenticated
            })
            .when('/patient-examinations', {
                templateUrl: 'partials/examination/patient-examinations',
                controller: 'PatientExaminationsCtrl',
                resolve: routeUserChecks.patientRole
            })
            .when('/about', {
                templateUrl: '/partials/public/about'
            })
            .when('/list-specialists', {
                templateUrl: '/partials/public/specialists',
                controller: 'ListSpecialistsCtrl'
            })
            .when('/list-procedures', {
                templateUrl: '/partials/public/procedures',
                controller: 'ProcedureCtrl'
            })
            .when('/contact-us', {
                templateUrl: '/partials/public/contact-us',
                controller: 'ContactCtrl'
            })
            .when('/unauthorized', {
                template: "<h1>unauthorized</h1>"
            })
            .otherwise({ redirectTo: '/' });
    }])
    .value('toastr', toastr);


app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/unauthorized');
        }
    });
});
