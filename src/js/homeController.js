var HomeController = function($scope, $location) {
    $scope.rsvpClick = function() {
        $location.path('/search');
    };
};