var RegisterController = function($scope, $http, $location,globalValues) {
    $scope.flexSize = 40;

    $scope.form = {
        attendance : 'yesOption'
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
        if(!form.firstName || !form.lastName || (form.attendance === 'yesOption' && !form.attendingNumber)) {
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
            rsvpName : globalValues.rsvpName,
            firstName : form.firstName,
            lastName : form.lastName,
            registered : true,
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
        // var jsonBody = JSON.stringify(body);
        console.log(body);
        $http({
            method:"PUT",
            url:"http://localhost:8080/families/family",
            data: body,
            "headers":{
                "Content-Type":"application/json"
            }
        }).then(function successCallback(response) {
            console.log(response.status);
            if (response.status === 201) {
                globalValues.family = body;
                $location.path('/thankyou');
            }
        }, function errorCallback(response){
            console.log(response.status)
        });
    }
};