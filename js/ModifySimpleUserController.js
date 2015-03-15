'use strict'

angular
.module('modify-simple-user-controller', [])
.controller('ModifySimpleUserController',
[   '$scope',
    '$firebase',
    '$global',
    '$timeout',
    '$rootScope',
    'UserService',
function ($scope, $firebase, $global, $timeout, $rootScope, UserService) {

    $scope.userObj = null;
    $scope.talkObj = null;
    
    $rootScope.$on('editSimpleTalkClicked', function () {
        $scope.init();
    });
    
    $scope.init = function () {
        console.dir('open simple');
        
        $scope.userObj = UserService($global.uid);
        
        $scope.userObj.$loaded().then(function() { //success callback
            $scope.talkObj = $scope.userObj.talk;
        },
        function () { //fail callback
        });
    };
    
    $scope.attendOnly = function () {
        if (angular.isObject($scope.talkObj) && angular.isObject($scope.userObj)) {
            $scope.talkObj.attendOnly = true;
            $scope.talkObj.submitted = false;
            
            $scope.talkObj.topic = '';
            $scope.talkObj.description = '';
            $scope.talkObj.url = '';
            
            $scope.userObj.$save();
        }
    };
    
    $scope.saveSimple = function () {
        if(angular.isObject($scope.userObj) && angular.isObject($scope.talkObj) && $scope.userObj.displayName !== '' && $scope.userObj.description !== '') {
            $scope.talkObj.attendOnly = false;
            $scope.userObj.$save();
        }
        
        if(angular.isObject($scope.userObj) && angular.isObject($scope.talkObj) && $scope.talkObj.topic !== '' && $scope.talkObj.description !== '') {
            $scope.talkObj.attendOnly = false;
            $scope.talkObj.submitted = true;
            $scope.userObj.$save();
        }
    };
    
}]);