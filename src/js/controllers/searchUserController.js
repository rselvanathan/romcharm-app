var SearchUserController = function($scope, $http, $location, $mdDialog, globalValues, baseApiUrl) {
    $scope.flexSize = 40;

    $scope.globalValues = globalValues;

    $scope.buttonClick = function() {
        var email = $scope.globalValues.email;

        if(!checkIfEmailIsValid(email)){
            showAlerDialog(
                'Email format is incorrect!',
                'Example e-mail : name@host.com',
                'Incorrect Email'
            );
            return;
        }

        console.log(getAuthBody());
        $http({
            url:baseApiUrl+"users/auth",
            method:"POST",
            data: getAuthBody(),
            headers: {
                'Content-Type':'application/json'
            }
        }).then(function successCallback(responseAuth) {
            globalValues.apiToken = responseAuth.data.token;
            /** Request for email */
            var encodedURI = encodeURIComponent(email);
            $http({
                url: baseApiUrl+"families/"+encodedURI,
                method:"GET",
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': globalValues.apiToken
                }
            }).then(function successCallback(responseEmail) {
                if(responseEmail.status == 200) {
                    showAlerDialog(
                        'You have already registered!',
                        'If you would like to make changes, feel free to contact us.',
                        'Already Registered Dialog'
                    );
                }
            }, function errorCallback(responseEmail) {
                if(responseEmail.status == 404) {
                    $scope.globalValues.authenticated = true;
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
    };

    var getAuthBody = function () {
        return {
            username : globalValues.apiUserName,
            password : $scope.globalValues.rsvpName
        }
    };

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