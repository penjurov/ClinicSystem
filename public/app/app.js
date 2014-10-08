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
                controller: 'NewExaminationCtrl'
            })
            /*
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
            */
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
