/**
 * Created by Артур on 08.10.2016.
 */
App.controller('Page1Ctrl', ['$scope', function ($scope) {
    var vm = this,
        items = [],
        i;

    angular.extend(vm, {
        items: items
    });
    
    for (i = 1; i < 100; i++) {
        items.push(i);
    }
}]);