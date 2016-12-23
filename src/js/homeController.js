var HomeController = function($scope) {
    $scope.flexSize = 60;

    $scope.rsvpClick = function() {
        $scope.$emit('viewChange', {screenType : screenTypes.searchUserView})
    };
};