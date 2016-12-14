var RegisterController = function($scope, globalValues) {

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
            $scope.form.attendingNumber = 0;
        }
    })

    $scope.submitClick = function() {
        var body = generateBody();
        console.log(body);
    }

    $scope.isSubmitDisabled = function() {
        var form = $scope.form;
        if(!form.firstName || !form.lastName || !form.attendance) {
            return true;
        } else {
            return false;
        }
    };

    generateBody = function() {
        var body = {
            rsvpName : globalValues.rsvpName,
            firstName : $scope.form.firstName,
            lastName : $scope.form.lastName,
            registered : true,
            areAttending : isAttending(),
            numberAttending : $scope.form.attendingNumber
        }
        return body;
    };

    isAttending = function() {
         if($scope.form.attendance === 'yesOption')
            return true;
        else return false;    
    };
};