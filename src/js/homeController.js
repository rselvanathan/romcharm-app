var HomeController = function($scope, $location, globalValues) {
    $scope.flexSize = 60;

    $scope.rsvpClick = function() {
        $location.path('/search');
    };
};