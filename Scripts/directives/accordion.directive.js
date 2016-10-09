/**
 * Created by Артур on 06.10.2016.
 */
App.directive('accordion', ['PAGES_ORDER', function (PAGES_ORDER) {
    return {
        link: function (scope, elem, attrs) {
            var isAnimationInProgress = false,
                onAnimStart,
                onAnimEnd;

            scope.$on('$stateChangeStart', function(event) {
                isAnimationInProgress && event.preventDefault();
            });

            scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                var pages = elem.children(),
                    fromPage = pages.eq(1),
                    toPage = pages.eq(0),
                    directionClasses = directionOfMoving(fromState.name, toState.name);

                onAnimStart = scope.$on('animStart', function () {
                    isAnimationInProgress = true;
                    fromPage.addClass(directionClasses[0]);
                    toPage.addClass(directionClasses[1]);
                    onAnimStart();
                });

                onAnimEnd = scope.$on('animEnd', function () {
                    clearAnim(fromPage);
                    clearAnim(toPage);
                    isAnimationInProgress = false;
                    onAnimEnd();
                    onAnimStart();
                });

                function clearAnim(page) {
                    page.removeClass('center-to-left')
                        .removeClass('left-to-center')
                        .removeClass('center-to-right')
                        .removeClass('right-to-center');
                }

                function directionOfMoving(fromName, toName) {
                    var fromPos = PAGES_ORDER.indexOf(fromName),
                        toPos = PAGES_ORDER.indexOf(toName);

                    if (fromPos < toPos) {
                        return [
                            'center-to-left',
                            'right-to-center'
                        ];
                    } else {
                        return [
                            'center-to-right',
                            'left-to-center'
                        ];
                    }
                }
            });
        }
    };
}]);