/**
 * Created by Артур on 08.10.2016.
 */
App.controller('HomeCtrl', ['$rootScope', function ($rootScope) {
    $rootScope.$emit('ngRepeatFinished');
}]);