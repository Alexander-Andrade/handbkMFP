angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
        
    .state('login', {
      url: '/login',
      cache: false, 
      templateUrl: 'templates/login.html',
//      controller: 'loginCtrl'
    })
      
      
    .state('marks', {
      url: '/marks',
      cache: false,
      templateUrl: 'templates/marks.html',
//      controller: 'marksCtrl'
    })
  
        
    .state('details', {
      url: '/details',
      cache: false,
      templateUrl: 'templates/details.html',
//      controller: 'detailsCtrl'
    })
   
    .state('students', {
      url: '/main',
      cache: false,
      templateUrl: 'templates/students.html',
//      controller: 'mainCtrl'
    })
     
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});