'use strict';

angular
.module('buffaloUnconference', [
    'firebase',
    'services',
    'registration-controller'
])
.controller('AppController', 
[
    '$scope', 
    '$global', 
function ($scope, $global) {

    $scope.isLoggedIn = $global.isLoggedIn;
    
    $scope.jumboBtnValue = function () {
        if (!$scope.isLoggedIn) {
            return 'Subscribe & Register';
        }
        else {
            return 'Subscribe';
        }
    };
    
}]) //end controller
.run(function () {
});
