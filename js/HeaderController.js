'use strict'

angular
.module('header-controller', [])
.controller('HeaderController',
[   '$scope',
    '$firebase',
    '$global',
    '$window',
    '$timeout',
    '$rootScope',
    'UserService',
    'templateCompiler',
    'FBURL',
    'USERSURL',
function ($scope, $firebase, $global, $window, $timeout, $rootScope, UserService, templateCompiler, FBURL, USERSURL) {

    $scope.isLoggedIn = $global.isLoggedIn;
    $scope.email = '';
    $scope.password = '';
    $scope.invalidLogin = false;
    $scope.invalidRegistration = false;
    $scope.invalidTwitRegistration = false;
    
    //Used to reload the page and place the user into a 'logged in' view state
    $scope.reloadWindow = function () {
        $window.location.reload();
    };
    
    $scope.initModifyModal = function () {        
        var userObj = UserService($global.uid);
        
        userObj.$loaded().then(function() { //success callback
            var talkObj = userObj.talk;
            if(talkObj.attendOnly || (talkObj.submitted && talkObj.topic.length > 0 && talkObj.description.length > 0)) {
                return;
            }
            
            $scope.showLoginModifyModal();
        },
        function () { //fail callback
        }); 
    };
    
    $scope.showLoginModifyModal = function () {
        var modalHTML = $global.isTwitterLogin ? 'mod-user-twitter-modal.html' : 'mod-user-simple-modal.html';
        var title = $global.isTwitterLogin ? 'MODIFY YOUR TALK' : 'MODIFY YOUR INFO';
        
        bootbox.dialog({
            title: title,
            message: templateCompiler.getCompiledHTML($scope, modalHTML),
            buttons: {
                attendOnly: {
                    label: "Attend Only",
                    className: "btn btn-info pull-left",
                    callback: function() {
                        //let ModifyUserController know about our bootbox descision...
                        //kinda hate this.
                        $scope.$broadcast('modSavePress', 'attendOnly');
                    }
                },
                success: {
                    label: "Save",
                    className: "btn btn-success",
                    callback: function() {
                        $scope.$broadcast('modSavePress', 'save');
                    }
                },
                cancel: {
                    label: "Cancel",
                    className: "btn btn-danger",
                    callback: function() {
                        $scope.$broadcast('modSavePress', 'cancel');
                    }
                }
            }
        });
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
                    $scope.invalidRegistration = true;
                }, 50);
            } 
            else {
                //console.log("Successfully created user account with uid:", userData.uid);
                bootbox.hideAll();
                
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
                    $scope.invalidLogin = true;
                }, 50);
            } 
            else {
                //console.log("Authenticated successfully with payload:", authData);
                
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
    
    $scope.resetPassword = function () {
        if($scope.email) {
            $global.ref.resetPassword({
                email : $scope.email
            }, 
            function(error) {
                if (error === null) {
                    bootbox.hideAll();
                    //console.log("Password reset email sent successfully");
                } 
            });
        }
    };
    
    $scope.openRegisterModal = function () {
        $scope.email = '';
        $scope.password = '';
        $scope.invalidLogin = false;
        $scope.invalidRegistration = false;
        $scope.invalidTwitRegistration = false;
        
        bootbox.dialog({
                title: 'BUFFALO UNCONFERENCE REGISTRATION',
                message: templateCompiler.getCompiledHTML($scope, 'register-modal.html')
        });
    };
    
    //listen for a broadcast from AppController for Register Jumbotron click
    $rootScope.$on('appRegisterClick', function () {
        $scope.openRegisterModal();
    });
    
    $scope.registerTwitterPopup = function () {
        $global.ref.authWithOAuthPopup('twitter', function(error, authData) {
            if (error) {
                //alert('Twitter login failed!');
                $timeout(function() {
                    $scope.invalidTwitRegistration = true;
                }, 50);
            } 
            else {
                //console.log("Authenticated successfully with payload:", authData);
                bootbox.hideAll();
                
                var twit = authData.twitter;
                var cache = twit.cachedUserProfile;
                
                var user = UserService(authData.uid);
                
                user.$loaded().then(function() { //success callback
                    //if we already have info about the twitter user, 
                    //can't see a reason why we should waste the time updating him/her
                    if(angular.equals('', user.displayName)) {
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
    
    
    if($scope.isLoggedIn) $scope.initModifyModal();
}]);