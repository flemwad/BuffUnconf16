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
    
    $scope.attendOnly = function () {
        if (angular.isObject($scope.talkObj) && angular.isObject($scope.userObj)) {
            $scope.talkObj.attendOnly = true;
            $scope.talkObj.submitted = false;
            
            $scope.talkObj.topic = '';
            $scope.talkObj.description = '';
            $scope.talkObj.url = '';
            
            $scope.userObj.$save();
            bootbox.hideAll();
        }
    };
    
    $scope.save = function () {
        if(angular.isObject($scope.userObj) && $scope.userObj.topic !== '' && $scope.userObj.description !== '') {
            $scope.talkObj.attendOnly = false;
            $scope.talkObj.submitted = true;
            $scope.userObj.$save();
        }
    };
    
    $scope.$on('modSavePress', function (event, data) {
        switch (data) {
            case 'save':
                $scope.save();
                break;
            case 'attendOnly':
                $scope.attendOnly();
                break;
            case 'cancel':
                break;
        }
    });
    
    $timeout(function() {
        $scope.init();
    }, 50);
}]);