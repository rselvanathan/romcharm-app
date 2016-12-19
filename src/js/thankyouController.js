var ThankYouController = function($scope, globalValues) {
    var family = globalValues.family;

    $scope.thankYouMessageOne = "Thank you " + family.firstName + " " + family.lastName;

    if(family.areAttending) {
        $scope.thankYouMessageTwo = "We are looking forward to seeing you on the day"
    } else {
        $scope.thankYouMessageTwo = "We hope to see you soon";
    }
};