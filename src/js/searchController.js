
var SearchController = function($scope, $http, $location, $mdDialog,globalValues) {
    $scope.flexSize = 40;

    $scope.globalValues = globalValues;

    $scope.buttonClick = function() {
        var rsvpName = $scope.globalValues.rsvpName;
        $http({
            url:"http://localhost:8080/families/"+rsvpName,
            method:"GET",
        }).then(function successCallback(response) {
            console.log(response.data);
            if(response.data.registered) {
                showAlerDialog(
                    'You have already registered!', 
                    'If you would like to make changes, feel free to contact us.',
                    'Already Registered Dialog'
                );
            } else {
                $location.path('/register');
            }
        }, function errorCallback(response) {
            if(response.status == 404) {
                showAlerDialog(
                    'RSVP Name Not Found!', 
                    'Please contact us, if you believe this to be incorrect.',
                    'Not Found Dialog'
                );
            }
        });
    }

    var showAlerDialog = function(title, textContent, arialLabel) {
        $mdDialog.show(
            $mdDialog
            .alert()
            .parent(angular.element(document.querySelector('#mainBody')))
            .clickOutsideToClose(true)
            .title(title)
            .textContent(textContent)
            .ariaLabel(arialLabel)
            .ok('OK')
        )
    }
};