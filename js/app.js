'use strict';

angular
.module('buffaloUnconference', [
    'firebase',
    'services',
    'header-controller',
    'modify-user-controller',
    'templates'
])
.controller('AppController', 
[
    '$scope', 
    '$global',
    '$rootScope',
function ($scope, $global, $rootScope) {

    $scope.isLoggedIn = $global.isLoggedIn;
    
    $scope.openRegisterModal = function () {
        //tell our HeaderController the user clicked Register on the jumbotron
        $rootScope.$broadcast('appRegisterClick');
    };
    
}]) //end controller
.run(function () {
});