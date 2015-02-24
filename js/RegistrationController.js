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
        $global.ref.authWithOAuthPopup('twitter', function(error, authData) {
            if (error) {
                alert('Twitter login failed!');
            } 
            else {
                //console.log("Authenticated successfully with payload:", authData);
                var twit = authData.twitter;
                var cache = twit.cachedUserProfile;
                
                var user = $global.profilesRef.child(twit.id.toString());
                
                user.set({
                    displayName: angular.isUndefined(twit.displayName) ? '' : twit.displayName,
                    username: angular.isUndefined(twit.username) ? '' : twit.username,
                    description: angular.isUndefined(cache.description) ? '' : cache.description,
                    location: angular.isUndefined(cache.location) ? '' : cache.location,
                    url: angular.isUndefined(cache.url) ? '' : cache.url,
                    imgs: {
                        profile_banner_url: angular.isUndefined(cache.profile_banner_url) ? '' : cache.profile_banner_url,
                        profile_image_url: angular.isUndefined(cache.profile_image_url_https) ? '' : cache.profile_image_url_https
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