'use strict'

angular
.module('registration-controller', [])
.controller('RegistrationController',
[   '$scope',
    '$firebase',
    '$global',
function ($scope, $firebase, $global) {

    $scope.isLoggedIn = $global.IsLoggedIn;
    
    $scope.ref = new Firebase($global.firebaseRefString);
    $scope.sync = $firebase($scope.ref);
    
    $scope.registerTwitterPopup = function () {
        $scope.ref.authWithOAuthPopup("twitter", function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } 
            else {
                console.log("Authenticated successfully with payload:", authData);
                //push to buffalo-unconference with firebase to create an object with a list of registered users
                //populate objects with necessary data from authData, or in the $global.auth object
            }
        });
    };
 
}]);