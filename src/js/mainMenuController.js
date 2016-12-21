app.controller('mainMenuController', function($scope, $rootScope) {
    $scope.homeClick = function() {
        $rootScope.$broadcast('viewChange', {screenType : screenTypes.homeView})
    };

    $scope.rsvpClick = function() {
        $rootScope.$broadcast('viewChange', {screenType : screenTypes.searchView})
    };

    $scope.infoClick = function() {
        $rootScope.$broadcast('viewChange', {screenType : screenTypes.infoView})
    }
});