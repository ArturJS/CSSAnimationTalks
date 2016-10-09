/**
 * Created by Артур on 08.10.2016.
 */
(function (angular) {
    'use strict';

    var module = angular.module('anim-in-out', ['ngAnimate']);

    function getNumber(str, defaultNumber) {
        var number = parseInt(str, 10);
        return isNaN(number) ? defaultNumber : number;
    }

    module.animation('.anim-in-out', ['$rootScope', '$timeout', '$window', '$q',
        function ($rootScope, $timeout, $window, $q) {
            var date,
                defer1,
                defer2,
                doneCallbacks = [];

            function initDefers() {
                //defer1 = $q.defer();
                defer2 = $q.defer();

                $q.when(/*defer1.promise,*/ defer2.promise)
                    .then(function () {

                        $timeout(function () {
                            doneCallbacks.forEach(function (callback) {
                                callback();
                            });
                            doneCallbacks.splice(0, doneCallbacks.length);

                            initDefers();
                        }, 0);

                    });
            }

            initDefers();

           /* $timeout(function () {
                //defer1.resolve();
                defer2.resolve();
            }, 600);*/

            $rootScope.$on('$stateChangeStart', function () {
                date = new Date();
            });


            /*$rootScope.$on('$viewContentLoaded', function () {
             console.log('loaded after ' + ((new Date()) - date));
             defer1.resolve();
             });*/
            $rootScope.$on('ngRepeatFinished', function () {
                console.log('ngRepeatFinished after ' + ((new Date()) - date));
                defer2.resolve();
            });


            return {
                enter: function (element, done1) {
                    var $element = angular.element(element),
                        animSync = eval($element.attr('data-anim-sync')),
                        sync = animSync || false,
                        speed = getNumber($element.attr('data-anim-speed'), 1000),
                        inSpeed = getNumber($element.attr('data-anim-in-speed'), speed),
                        outSpeed = getNumber($element.attr('data-anim-out-speed'), speed);


                    function done() {
                        done1();
                        $rootScope.$broadcast('animEnd');
                    }

                    doneCallbacks.push(function () {
                        $rootScope.$broadcast('animStart', element, outSpeed);
                    });

                    try {
                        var observer = new MutationObserver(function (mutations) {
                            observer.disconnect();

                            $window.requestAnimationFrame(function () {
                                doneCallbacks.push(function () {
                                    $timeout(done, sync ? 0 : outSpeed);
                                });
                            });
                        });

                        observer.observe(element[0], {
                            attributes: true,
                            childList: false,
                            characterData: false
                        });

                    } catch (e) {
                        doneCallbacks.push(function () {
                            $timeout(done, Math.max(100, sync ? 0 : outSpeed));
                        });
                    }

                    $element.addClass('anim-in-setup');

                    return function (cancelled) {
                        $element.removeClass('anim-in-setup');
                        $element.addClass('anim-in');

                        if (!cancelled) {
                            doneCallbacks.push(function () {
                                $timeout(function () {
                                    $rootScope.$broadcast('animEnd', element, inSpeed);

                                    $element.removeClass('anim-in');
                                }, inSpeed);
                            });
                        }
                    };
                },
                leave: function (element, done1) {
                    var $element = angular.element(element),
                        speed = getNumber($element.attr('data-anim-speed'), 1000),
                        outSpeed = getNumber($element.attr('data-anim-out-speed'), speed);

                    function done() {
                            done1();
                        $rootScope.$broadcast('animEnd');
                    }

                    /*doneCallbacks.push(function () {
                        $rootScope.$broadcast('animStart', element, outSpeed);
                    });*/

                    try {
                        var observer = new MutationObserver(function (mutations) {
                            observer.disconnect();

                            $window.requestAnimationFrame(function () {
                                $element.removeClass('anim-out-setup');
                                $element.addClass('anim-out');

                                doneCallbacks.push(function () {
                                    $timeout(done, outSpeed);
                                });
                            });
                        });

                        observer.observe(element[0], {
                            attributes: true,
                            childList: false,
                            characterData: false
                        });

                    } catch (e) {
                        $element.removeClass('anim-out-setup');
                        $element.addClass('anim-out');

                        doneCallbacks.push(function () {
                            $timeout(done, Math.max(100, outSpeed));
                        });
                    }

                    $element.addClass('anim-out-setup');
                }
            };
        }
    ]);

})(angular);
