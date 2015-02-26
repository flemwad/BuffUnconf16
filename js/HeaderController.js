'use strict'

angular
.module('header-controller', [])
.controller('HeaderController',
[   '$scope',
    '$firebase',
    '$global',
    '$window',
    'UserService',
    'templateCompiler',
    'FBURL',
    'USERSURL',
function ($scope, $firebase, $global, $window, UserService, templateCompiler, FBURL, USERSURL) {

    $scope.isLoggedIn = $global.isLoggedIn;
    $scope.userObj = null;
    $scope.talkObj = null;
    $scope.email = '';
    $scope.password = '';
    
    $scope.doneRegister = function () {
        $window.location.reload();
    };
    
    $scope.getUserObject = function () {
        $scope.userObj = UserService($global.uid);
        
        $scope.userObj.$loaded().then(function() { //success callback
            $scope.talkObj = $scope.userObj.talk;
            if(!$scope.isLoggedIn || $scope.talkObj.attendOnly || ($scope.talkObj.submitted && $scope.talkObj.topic.length > 0 && $scope.talkObj.topic.description)) return;
            $scope.showLoginModifyModal();
        },
        function () { //fail callback
        });
    };
    
    $scope.showLoginModifyModal = function () {
        var modalHTML = $global.isTwitterLogin ? 'mod-user-twitter-modal.html' : 'mod-user-simple-modal.html';
        
        bootbox.dialog({
            title: 'MODIFY YOUR TALK',
            message: templateCompiler.getCompiledHTML($scope, modalHTML),
            buttons: {
                success: {
                    label: "Save",
                    className: "btn btn-success",
                    callback: function() {

                    }
                },
                cancel: {
                    label: "Cancel",
                    className: "btn btn-danger",
                    callback: function() {

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
            } 
            else {
                console.log("Successfully created user account with uid:", userData.uid);
                $scope.normalLogin($scope.email, $scope.password, true);
            }
        });        
    };
    
    $scope.normalLogin = function (email, password, afterRegister) {
        $global.ref.authWithPassword({
            email    : email,
            password : password
        }, 
        function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } 
            else {
                console.log("Authenticated successfully with payload:", authData);
                
                if(afterRegister) {
                }
                
                $scope.email = '';
                $scope.password = '';
                    
                $scope.doneRegister();
            }
        });
    };
    
    $scope.openRegisterModal = function () {
        bootbox.dialog({
                title: 'BUFFALO UNCONFERENCE REGISTRATION',
                message: templateCompiler.getCompiledHTML($scope, 'register-modal.html')
        });
    };
    
    $scope.registerTwitterPopup = function () {
        $global.ref.authWithOAuthPopup('twitter', function(error, authData) {
            if (error) {
                alert('Twitter login failed!');
            } 
            else {
                //console.log("Authenticated successfully with payload:", authData);
                bootbox.hideAll();
                
                var twit = authData.twitter;
                var cache = twit.cachedUserProfile;
                
                var user = $global.usersRef.child(authData.uid);
                
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
                        submitted: false,
                        approved: false,
                        topic: '',
                        description: '',
                        url: ''
                    }
                }, $scope.doneRegister);
            }
        });
    };
    
    
    $scope.getUserObject();
}]);