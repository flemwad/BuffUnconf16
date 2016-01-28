'use strict'

angular
.module('register-controller', [])
.controller('RegisterController',
[   '$scope',
    '$global',
    '$timeout',
    '$window',
    '$rootScope',
    'UserService',
function ($scope, $global, $timeout, $window, $rootScope, UserService) {
    
    $rootScope.$on('appRegisterClick', function () {
        $scope.init();
    });
    
    $scope.init = function () {
        //console.dir('RegisterController init');
        
        $scope.isLoggedIn = $global.isLoggedIn;
        $scope.email = '';
        $scope.password = '';
        $scope.invalidLogin = false;
        $scope.invalidRegistration = false;
        $scope.invalidTwitRegistration = false;
    };
    
    //Used to reload the page and place the user into a 'logged in' view state
    $scope.reloadWindow = function () {
        $window.location.reload();
    };
    
    $scope.normalRegister = function (email, password) {
        $global.ref.createUser({
            email    : email,
            password : password
        }, 
        function(error, userData) {
            if (error) {
                console.log("Error creating user:", error);
                $timeout(function() {
                    $scope.invalidTwitRegistration = false;
                    $scope.invalidRegistration = true;
                }, 0);
            } 
            else {
                //console.log("Successfully created user account with uid:", userData.uid);
                $scope.normalLogin($scope.email, $scope.password, true);
            }
        });        
    };
    
    $scope.normalLogin = function (email, password, registerLogin) {
        $global.ref.authWithPassword({
            email    : email,
            password : password
        }, 
        function(error, authData) {
            if (error) {
                //console.log("Login Failed!", error);
                $timeout(function() {
                    $scope.invalidTwitRegistration = false;
                    $scope.invalidLogin = true;
                }, 0);
            } 
            else {
                //console.log("Authenticated successfully with payload:", authData);
                $('#register-close-button')[0].click();
                
                if(registerLogin) {
                    $scope.createNormalUser(authData);
                }
                else {
                    $scope.reloadWindow();
                }
            }
        });
    };
    
    $scope.createNormalUser = function (authData) {
        var user = UserService(authData.uid);
        
        user.$loaded().then(function() {
            //if we already have info about the simple user, 
            //can't see a reason why we should waste the time updating him/her
            if(!angular.isObject(user.email)) {
                user.email = $scope.email; //basically so i have a value to re-check
                user.displayName = '',
                user.description = '',
                user.location = '',
                user.talk = {
                    attendOnly: false,
                    submitted: false,
                    approved: false,
                    topic: '',
                    description: '',
                    url: ''
                }

                user.$save();
            }
            
            $scope.reloadWindow();
        },
        function () {
        });
    };
    
    $scope.registerTwitterPopup = function () {
        $global.ref.authWithOAuthPopup('twitter', function(error, authData) {
            if (error) {
                //alert('Twitter login failed!');
                $timeout(function() {
                    $scope.invalidTwitRegistration = true;
                    $scope.invalidLogin = false;
                    $scope.invalidRegistration = false;
                }, 0);
            } 
            else {
                //console.log("Authenticated successfully with payload:", authData);
                $('#register-close-button')[0].click();
                
                var twit = authData.twitter;
                var cache = twit.cachedUserProfile;
                
                var user = UserService(authData.uid);
                
                user.$loaded().then(function() { //success callback
                    //if we already have info about the twitter user, 
                    //can't see a reason why we should waste the time updating him/her
                    if(!angular.isDefined(user.displayName) || angular.equals('', user.displayName)) {
                        user.email = '';
                        user.displayName = angular.isUndefined(twit.displayName) ? '' : twit.displayName,
                        user.username = angular.isUndefined(twit.username) ? '' : twit.username,
                        user.description = angular.isUndefined(cache.description) ? '' : cache.description,
                        user.location = angular.isUndefined(cache.location) ? '' : cache.location,
                        user.url = angular.isUndefined(cache.url) ? '' : cache.url,
                        user.imgs = {
                            profile_banner_url: angular.isUndefined(cache.profile_banner_url) ? '' : cache.profile_banner_url,
                            profile_image_url: angular.isUndefined(cache.profile_image_url_https) ? '' : cache.profile_image_url_https
                        },
                        user.talk = {
                            attendOnly: false,
                            submitted: false,
                            approved: false,
                            topic: '',
                            description: '',
                            url: ''
                        }
                        
                        user.$save();
                    }
                    
                    $scope.reloadWindow();
                },
                function () { //fail callback
                });
            }
        });
    };
    
}]);