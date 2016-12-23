var SearchUserController = function($scope, $http, $location, $mdDialog, globalValues) {
    $scope.flexSize = 40;

    $scope.globalValues = globalValues;

    $scope.buttonClick = function() {
        var rsvpName = $scope.globalValues.rsvpName;
        $http({
            url:"http://localhost:8080/users/"+rsvpName,
            method:"GET",
        }).then(function successCallback(response) {
            console.log(response.data);
            if(response.status == 200) {
                $scope.$emit('viewChange', {screenType : screenTypes.searchEmailView})
            }
        }, function errorCallback(response) {
            if(response.status == 404) {
                showAlerDialog(
                    'RSVP Password Not Found!',
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