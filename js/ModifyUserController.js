'use strict'

angular
.module('modify-user-controller', [])
.controller('ModifyUserController',
[   '$scope',
    '$firebase',
    '$global',
    '$timeout',
    'UserService',
function ($scope, $firebase, $global, $timeout, UserService) {

    //console.dir('ModifyUserController instantiation');
    
    $scope.userObj = null;
    $scope.talkObj = null;
    
    $scope.init = function () {
        $scope.userObj = UserService($global.uid);
        
        $scope.userObj.$loaded().then(function() { //success callback
            $scope.talkObj = $scope.userObj.talk;
        },
        function () { //fail callback
        });
    };
    
    $scope.getRekt = function () {
        //lmfao, wait for the digest cycle to kill this scope on close of modal
        //holy hell I'm never using bootbox ever again, or bootstrap less than v3
        $timeout(function() {
            $scope.$destroy();
        }, 0);
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
        
        $scope.getRekt();
    };
    
    $scope.saveTwit = function () {
        if(angular.isObject($scope.userObj) && angular.isObject($scope.talkObj) && $scope.talkObj.topic !== '' && $scope.talkObj.description !== '') {
            $scope.talkObj.attendOnly = false;
            $scope.talkObj.submitted = true;
            $scope.userObj.$save();
        }
        
        $scope.getRekt();
    };
    
    $scope.saveSimple = function () {
        if(angular.isObject($scope.userObj) && $scope.userObj.displayName !== '' && $scope.userObj.description !== '') {
            $scope.userObj.$save();
        }
        
        if(angular.isObject($scope.userObj) && angular.isObject($scope.talkObj) && $scope.talkObj.topic !== '' && $scope.talkObj.description !== '') {
            $scope.talkObj.attendOnly = false;
            $scope.talkObj.submitted = true;
            $scope.userObj.$save();
        }
        
        $scope.getRekt();
    };
    
    $scope.$on('modSavePress', function (event, data) {
        switch (data) {
            case 'saveTwit':
                $scope.saveTwit();
                break;
            case 'saveSimple':
                $scope.saveSimple();
                break;
            case 'attendOnly':
                $scope.attendOnly();
                break;
            case 'cancel':
                break;
        }
    });
    
//    $scope.$on("$destroy", function() {
//        console.dir('modify close');
//    });
    
    $timeout(function() {
        $scope.init();
    }, 100);
}]);