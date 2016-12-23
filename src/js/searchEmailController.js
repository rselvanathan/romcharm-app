var SearchEmailController = function($scope, $http, $location, $mdDialog, globalValues) {
    $scope.flexSize = 40;

    $scope.globalValues = globalValues;

    $scope.buttonClick = function() {
        var email = $scope.globalValues.email;
        var encodedURI = encodeURIComponent(email);
        console.log(encodedURI);
        $http({
            url:"http://localhost:8080/families/"+encodedURI,
            method:"GET",
            "headers": {
                "Content-Type":"application/x-www-form-urlencoded"
            }
        }).then(function successCallback(response) {
            console.log(response.data);
            if(response.status == 200) {
                showAlerDialog(
                    'You have already registered!',
                    'If you would like to make changes, feel free to contact us.',
                    'Already Registered Dialog'
                );
            }
        }, function errorCallback(response) {
            if(response.status == 404) {
                $scope.$emit('viewChange', {screenType : screenTypes.registerView})
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