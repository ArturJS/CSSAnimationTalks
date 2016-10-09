/**
 * Created by Артур on 08.10.2016.
 */
'use strict';

App.run(['$rootScope', '$timeout', function ($rootScope, $timeout) {
    var unsubscribeFn = $rootScope.$on('$stateChangeSuccess', function () {
        unsubscribeFn();
        
        $timeout(function() {
            $rootScope.$broadcast('animEnd');
            $rootScope.$broadcast('ngRepeatFinished');
            $rootScope.$broadcast('$viewContentLoaded');
        }, 700);
    });
}]);