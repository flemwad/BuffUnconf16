'use strict';

angular
.module('buffaloUnconference', [
    'firebase',
    'services',
    'header-controller',
    'modify-social-media-user-controller',
    'modify-simple-user-controller',
    'attendee-controller',
    'register-controller',
    'ui.gravatar'
])
.config([
  'gravatarServiceProvider', function(gravatarServiceProvider) {
    gravatarServiceProvider.defaults = {
      size     : 48,
      "default": 'monsterid'  // Mystery man as default for missing avatars
    };

    // Use https endpoint
    gravatarServiceProvider.secure = true;

    // Force protocol
    gravatarServiceProvider.protocol = 'my-protocol';
  }
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