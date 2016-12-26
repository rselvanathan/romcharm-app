var RegisterController = function($scope, $http, $location, globalValues, baseApiUrl) {
    $scope.flexSize = 50;

    $scope.globalValues = globalValues;

    $scope.form = {
        attendance : 'yesOption',
        email: $scope.globalValues.email
    };

    $scope.isDisabled = function() {
        if($scope.form.attendance === 'yesOption')
            return false;
        else return true;    
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
        var body = {
            email : globalValues.email,
            firstName : form.firstName,
            lastName : form.lastName,
            areAttending : isAttending(),
            numberAttending : pNumberAttending
        }
        return body;
    };

    isAttending = function() {
         if($scope.form.attendance === 'yesOption')
            return true;
        else return false;    
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
    }
};