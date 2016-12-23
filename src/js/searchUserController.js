var SearchUserController = function($scope, $http, $location, $mdDialog, globalValues) {
    $scope.flexSize = 40;

    $scope.globalValues = globalValues;

    $scope.buttonClick = function() {
        var rsvpName = $scope.globalValues.rsvpName;
        var email = $scope.globalValues.email;

        if(!checkIfEmailIsValid(email)){
            showAlerDialog(
                'Email format is incorrect!',
                'Example e-mail : name@host.com',
                'Incorrect Email'
            );
            return;
        }

        $http({
            url:"http://localhost:8080/users/"+rsvpName,
            method:"GET",
        }).then(function successCallback(responseUserName) {
            console.log(responseUserName.data);
            /** Request for email */
            var encodedURI = encodeURIComponent(email);
            $http({
                url:"http://localhost:8080/families/"+encodedURI,
                method:"GET",
                "headers": {
                    "Content-Type":"application/x-www-form-urlencoded"
                }
            }).then(function successCallback(responseEmail) {
                console.log(responseEmail.data);
                if(responseEmail.status == 200) {
                    showAlerDialog(
                        'You have already registered!',
                        'If you would like to make changes, feel free to contact us.',
                        'Already Registered Dialog'
                    );
                }
            }, function errorCallback(responseEmail) {
                if(responseEmail.status == 404) {
                    $scope.$emit('viewChange', {screenType : screenTypes.registerView})
                }
            });
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

    var checkIfEmailIsValid = function(email) {
        if(email === undefined) {
            return false;
        }
        return true;
    };

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