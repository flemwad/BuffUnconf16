'use strict'

angular
.module('header-controller', [])
.controller('HeaderController',
[   '$scope',
    '$firebase',
    '$global',
    '$timeout',
    '$rootScope',
    '$location',
    'UserService',
function ($scope, $firebase, $global, $timeout, $rootScope, $location, UserService) {
    
    $scope.isLoggedIn = $global.isLoggedIn;
    $scope.maxUserLimitReached = false;
    $scope.isTwitterLogin = $global.isTwitterLogin; 
    $scope.isFacebookLogin = $global.isFacebookLogin; 
    
    $rootScope.$on('maxLimitReached', function () {
        $scope.maxUserLimitReached = $global.maxUserLimitReached;
    });
    
    $scope.initModifyModal = function () {        
        var userObj = UserService($global.uid);
        
        userObj.$loaded().then(function() { //success callback
            var talkObj = userObj.talk;
            if(talkObj.attendOnly || (talkObj.submitted && talkObj.topic.length > 0 && talkObj.description.length > 0)) {
                return;
            }
            
            //$rootScope.$broadcast('firstLoadModal');
            $scope.editTalk();
            
            if($scope.isTwitterLogin || $scope.isFacebookLogin) {
                
                $timeout(function() {
                    $("#modify-social-media-button")[0].click();
                    //angular.element(document.querySelector('#modify-social-media-button')).click();    
                }, 250);
            }
            else {
                $timeout(function() {
                    $("#modify-simple-button")[0].click();
                }, 250);
            }
        },
        function () { //fail callback
        }); 
    };
    
    $scope.editTalk = function () {
        if($scope.isTwitterLogin || $scope.isFacebookLogin) {
            $rootScope.$broadcast('editSocialMediaClicked');
        }
        else {
            $rootScope.$broadcast('editSimpleTalkClicked');
        }
    };
    
    if($scope.isLoggedIn) $scope.initModifyModal();
}]);