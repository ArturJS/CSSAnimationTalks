'use strict';

App.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
            url: '/home',
            template: "<h1>Home</h1>"
            //templateUrl: "templates/Home.html"
        });

}]);