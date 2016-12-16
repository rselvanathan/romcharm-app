
var SearchController = function($scope, $http, $location, $mdDialog,globalValues) {

    $scope.globalValues = globalValues;

    $scope.buttonClick = function() {
        var rsvpName = $scope.globalValues.rsvpName;
        $http({
            url:"http://localhost:8080/families/"+rsvpName,
            method:"GET",
        }).then(function successCallback(response) {
            console.log(response.data);
            $location.path('/register');
        }, function errorCallback(response) {
            if(response.status == 404) {
                showErrorDialog();
            }
        });
    }

    var showErrorDialog = function() {
        $mdDialog.show(
            $mdDialog
            .alert()
            .parent(angular.element(document.querySelector('#mainBody')))
            .clickOutsideToClose(true)
            .title('RSVP Name Not Found!')
            .textContent('Please contact us, if you believe this to be incorrect.')
            .ariaLabel('Not Found Dialog')
            .ok('OK')
        )
    }
};