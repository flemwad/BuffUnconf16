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
            
            if($scope.isTwitterLogin) {
                $timeout(function() {
                    $("#modify-twit-button")[0].click();
                }, 0);
            }
            else {
                $timeout(function() {
                    $("#modify-simple-button")[0].click();
                }, 0);
            }
        },
        function () { //fail callback
        }); 
    };
    
    $scope.editTalk = function () {
        if($scope.isTwitterLogin) $rootScope.$broadcast('editTwitTalkClicked');
        else $rootScope.$broadcast('editSimpleTalkClicked');
    };
    
    if($scope.isLoggedIn) $scope.initModifyModal();
}]);