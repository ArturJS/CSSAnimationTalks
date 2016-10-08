/**
 * Created by Артур on 08.10.2016.
 */
App.filter('ngRepeatFinish',
    ['$timeout', '$rootScope', function ($timeout, $rootScope) {
    return function (data) {
        var flagProperty = '__finishedRendering__';

        if (!data[flagProperty]) {

            Object.defineProperty(
                data,
                flagProperty,
                {
                    enumerable: false,
                    configurable: true,
                    writable: false,
                    value: {}
                });

            $timeout(function () {
                delete data[flagProperty];
                $rootScope.$emit('ngRepeatFinished');
            }, 0, false);
        }

        return data;
    };
}]);