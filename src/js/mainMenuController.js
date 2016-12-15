app.controller('mainMenuController', function($scope, $location) {
    $scope.homeClick = function() {
        $location.path('/');
    };

    $scope.rsvpClick = function() {
        $location.path('/search');
    };
});