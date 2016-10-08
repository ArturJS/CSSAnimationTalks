'use strict';

App.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'Home.html',
            controller: 'HomeCtrl as home'
        })
        .state('page1', {
            url: '/page1',
            templateUrl: 'Page1.html',
            controller: 'Page1Ctrl as page1'
        });

}]);