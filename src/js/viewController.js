var ViewController = function ($scope, $rootScope, $location) {
  $rootScope.$on('viewChange', function(event, data) {
      if(data.screenType === screenTypes.homeView) {
          $location.path("/");
      }
      if(data.screenType === screenTypes.searchView) {
          $location.path("/search");
      }
      if(data.screenType === screenTypes.infoView) {
          $location.path("/info");
      }
  });

    $scope.$on('viewChange', function(event, data) {
        if(data.screenType === screenTypes.searchView) {
            $location.path("/search");
        }
        if(data.screenType === screenTypes.registerView) {
            $location.path("/register");
        }
        if(data.screenType === screenTypes.infoView) {
            $location.path("/info");
        }
        if(data.screenType === screenTypes.thankYouView) {
            $location.path("/thankyou");
        }
    });
};