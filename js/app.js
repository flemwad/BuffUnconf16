'use strict';

angular
.module('buffaloUnconference', [
    'firebase',
    'services',
    'header-controller',
    'modify-twit-user-controller',
    'modify-simple-user-controller',
    'attendee-controller',
    'register-controller',
    'ui.gravatar'
])
.controller('AppController', 
[
    '$scope', 
    '$global',
    '$rootScope',
    '$timeout',
function ($scope, $global, $rootScope, $timeout) {

    $scope.isLoggedIn = $global.isLoggedIn;
    $scope.maxUserLimitReached = false;
    
    $rootScope.$on('maxLimitReached', function () {
        $scope.maxUserLimitReached = $global.maxUserLimitReached;
    });
    
    $scope.openRegisterModal = function () {
        //tell our HeaderController the user clicked Register on the jumbotron
        $timeout(function() {
            $("#register-button")[0].click();
        }, 0);
        
        $rootScope.$broadcast('appRegisterClick');
    };
    
}]) //end controller
.run(function () {
    //console.dir(firebase);
});