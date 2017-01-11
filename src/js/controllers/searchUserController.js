var SearchUserController = function($scope, $http, $location, $mdDialog, globalValues, baseApiUrl) {
    $scope.flexSize = 40;

    $scope.globalValues = globalValues;

    $scope.search = {
        loading : false
    };

    $scope.buttonClick = function() {
        var email = $scope.globalValues.email;

		if(!checkIfEmailIsValid(email)){
			showAlertDialog(
				'Email format is incorrect!',
				'Example e-mail : name@host.com',
				'Incorrect Email'
			);
			return;
		}

		$scope.search.loading = true;
        authenticate(getAuthBody()).then(function successCallback(responseAuth) {
            globalValues.apiToken = responseAuth.data.token;
            /** Request for email */
            checkEmail(email).then(function successCallback(responseEmail) {
                $scope.search.loading = false;
                if(responseEmail.status == 200) {
                    showAlertDialog(
                        'You have already registered!',
                        'If you would like to make changes, feel free to contact us.',
                        'Already Registered Dialog'
                    );
                }
            }, function errorCallback(responseEmail) {
                $scope.search.loading = false;
                if(responseEmail.status == 404) {
                    $scope.globalValues.authenticated = true;
                    $scope.$emit('viewChange', {screenType : screenTypes.registerView})
                } else {
                    showErrorAlertDialog();
                }
            });
        }, function errorCallback(response) {
            $scope.search.loading = false;
            if(response.status == 404) {
                showAlertDialog(
                    'RSVP Password Not Found!',
                    'Please contact us, if you believe this to be incorrect.',
                    'Not Found Dialog'
                );
            } else {
                showErrorAlertDialog();
            }
        });
    };

    var authenticate = function(body) {
        return $http({
            url:baseApiUrl+"users/auth",
            method:"POST",
            data: body,
            headers: {
                'Content-Type':'application/json'
            }
        });
    };

    var checkEmail = function(email) {
        var encodedURI = encodeURIComponent(email);
        return $http({
            url: baseApiUrl+"families/"+encodedURI,
            method:"GET",
            headers: {
                'Content-Type':'application/json',
                'Authorization': globalValues.apiToken
            }
        })
    };


    var checkIfEmailIsValid = function(email) {
        if(email === undefined || email === '') {
            return false;
        }
        return true;
    };

    var showAlertDialog = function(title, textContent, arialLabel) {
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
    };

    var getAuthBody = function () {
        return {
            username : globalValues.apiUserName,
            password : $scope.globalValues.rsvpName
        }
    };

    var showErrorAlertDialog = function () {
        showAlertDialog(
            'Oops. Something has gone wrong!',
            'There seems to be a problem in the cloud. \n Please contact us directly while the issue is being resolved. \n Or try again later',
            'Server Error'
        );
    }
};