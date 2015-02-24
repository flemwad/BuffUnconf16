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

    $scope.isLoggedIn = $global.IsLoggedIn;
    
}]) //end controller
.run(function () {
});
