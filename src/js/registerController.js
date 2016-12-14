var RegisterController = function($scope) {
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

    generateBody = function() {
        var body = {
            rsvpName : "Selvan",
            firstName : $scope.form.firstName,
            lastName : $scope.form.lastName,
            registered : true,
            areAttending : isAttending(),
            numberAttending : $scope.form.attendingNumber
        }
        return body;
    }

    isAttending = function() {
         if($scope.form.attendance === 'yesOption')
            return true;
        else return false;    
    }
};