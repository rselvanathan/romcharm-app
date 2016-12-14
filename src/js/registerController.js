var RegisterController = function($scope) {
    $scope.form = {
        attendance : 'yesOption'
    };

    $scope.isAttending = function() {
        if($scope.form.attendance === 'yesOption')
            return false;
        else return true;    
    };

    $scope.setValue = function() {
        if($scope.form.attendance === 'yesOption')
            return 1;
        else return 0;  
    };
};