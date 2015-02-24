'use strict'

angular
.module('registration-controller', [])
.controller('RegistrationController',
[   '$scope',
    '$firebase',
    '$global',
    '$window',
    'FBURL',
    'PROFILESURL',
function ($scope, $firebase, $global, $window, FBURL, PROFILESURL) {

    $scope.isLoggedIn = $global.isLoggedIn;
    
    $scope.sync = $firebase($global.ref);
    
    $scope.doneRegister = function () {
        $window.location.reload();
    };
    
    $scope.registerTwitterPopup = function () {
        $global.ref.authWithOAuthPopup("twitter", function(error, authData) {
            if (error) {
                alert("Twitter login failed!");
            } 
            else {
                //console.log("Authenticated successfully with payload:", authData);
                var twit = authData.twitter;
                var cache = twit.cachedUserProfile;
                
                var prof = $global.ref.child('profiles');
                var user = prof.child(twit.id.toString());
                
                user.set({
                    displayName: twit.displayName,
                    username: twit.username,
                    description: cache.description,
                    location: cache.location,
                    url: cache.url,
                    imgs: {
                        profile_banner_url: cache.profile_banner_url,
                        profile_image_url: cache.profile_image_url_https
                    },
                    talk: {
                        approved: false,
                        topic: '',
                        description: '',
                        url: ''
                    }
                }, $scope.doneRegister);
            }
        });
    };
    
}]);