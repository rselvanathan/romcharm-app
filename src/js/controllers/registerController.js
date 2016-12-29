var RegisterController = function($scope, $http, $location, globalValues, baseApiUrl) {
    $scope.flexSize = 50;

    $scope.globalValues = globalValues;

    // Will check for authentication and reset the value if the user has
    if($scope.globalValues.authenticated === false) {
        $scope.$emit('viewChange', {screenType : screenTypes.searchUserView});
        return;
    } else {
        $scope.globalValues.authenticated = false;
    }

    $scope.form = {
        attendance : 'yesOption',
        email: $scope.globalValues.email
    };

    $scope.isDisabled = function() {
        return $scope.form.attendance !== 'yesOption';
    };

    $scope.$watch('form.attendance', function(newValue, oldValue){
        if(newValue === 'yesOption') {
            $scope.form.attendingNumber = 1;
        }
        else {
            $scope.form.attendingNumber = '';
        }
    })

    $scope.isSubmitDisabled = function() {
        var form = $scope.form;
        if(!form.firstName ||
            !form.lastName ||
            (form.attendance === 'yesOption' && !form.attendingNumber) ||
            !form.email ||
            $scope.rsvpForm.email.$error.pattern) {
            return true;
        } else {
            return false;
        }
    };

    generateBody = function() {
        var form = $scope.form;
        var pNumberAttending;
        if(!form.attendingNumber) {
            pNumberAttending = 0;
        } else {
            pNumberAttending = form.attendingNumber;
        }
        return {
            email: globalValues.email,
            firstName: form.firstName,
            lastName: form.lastName,
            areAttending: $scope.form.attendance === 'yesOption',
            numberAttending: pNumberAttending
        };
    };

     $scope.submitClick = function() {
        var body = generateBody();
        console.log(body);
        $http({
            method:"PUT",
            url: baseApiUrl+"families/family",
            data: body,
            "headers":{
                "Content-Type":"application/json"
            }
        }).then(function successCallback(response) {
            console.log(response.status);
            if (response.status === 201) {
                globalValues.family = body;
                $scope.$emit('viewChange', {screenType : screenTypes.thankYouView})
            }
        }, function errorCallback(response){
            console.log(response.status)
        });
    };
};