var RegisterController = function($scope, $http, $location, $mdDialog,globalValues, baseApiUrl) {
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
        email: $scope.globalValues.email,
        loading: false
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
    });

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

     $scope.submitClick = function() {
         $scope.form.loading = true;
         sendForm(generateBody()).then(function successCallback(response) {
             $scope.form.loading = false;
            if (response.status === 201) {
                globalValues.family = response.data;
                globalValues.apiToken = '';
                $scope.$emit('viewChange', {screenType : screenTypes.thankYouView})
            }
        }, function errorCallback(response){
             $scope.form.loading = false;
             showErrorAlertDialog();
             $scope.$emit('viewChange', {screenType : screenTypes.searchUserView})
        });
    };

    var generateBody = function() {
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

    var sendForm = function (body) {
       return $http({
           method:"POST",
           url: baseApiUrl+"families/family",
           data: body,
           headers:{
               'Content-Type':'application/json',
               'Authorization': globalValues.apiToken
           }
       });
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

    var showErrorAlertDialog = function () {
        showAlertDialog(
            'Oops. Something has gone wrong!',
            'There seems to be a problem in the cloud. \n Please contact us directly while the issue is being resolved. \n Or try again later',
            'Server Error'
        );
    }
};