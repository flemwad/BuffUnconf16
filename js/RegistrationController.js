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
                
                var desc = angular.isUndefined(cache.description) ? null : cache.description;
                var loc = angular.isUndefined(cache.location) ? null : cache.location;
                var url = angular.isUndefined(cache.url) ? null : cache.url;
                var profbannerurl = angular.isUndefined(cache.profile_banner_url) ? null : cache.profile_banner_url;
                var profimgurl = angular.isUndefined(cache.profile_image_url_https) ? null : cache.profile_image_url_https;
                
                user.set({
                    displayName: twit.displayName,
                    username: twit.username,
                    description: desc,
                    location: loc,
                    url: url,
                    imgs: {
                        profile_banner_url: profbannerurl,
                        profile_image_url: profimgurl
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