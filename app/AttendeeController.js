'use strict'

angular
.module('attendee-controller', [])
.controller('AttendeeController',
[   '$scope',
    '$firebase',
    '$global',
    '$timeout',
    '$rootScope',
    '$location',
    'AttendeeService',
function ($scope, $firebase, $global, $timeout, $rootScope, $location, AttendeeService) {

    $scope.attendees = null;
    $scope.isLoggedIn = $global.isLoggedIn;
    $scope.isTwitterLogin = $global.isTwitterLogin;
    $scope.isFacebookLogin = $global.isFacebookLogin;
    $scope.isSimpleLogin = $global.isSimpleLogin;
    $scope.userCount = 0;
    $scope.speakerCount = 0;
    $scope.attendeeCount = 0;
    
    $rootScope.$on('userCountReady', function () {
        $scope.userCount = $global.userCount;
    });
    
    $rootScope.$on('speakerCountReady', function () {
        $scope.speakerCount = $global.speakerCount;
    });
    
    $rootScope.$on('attendeeCountReady', function () {
        $scope.attendeeCount = $global.attendeeCount;
    });
    
    $scope.init = function () {
        $scope.attendees = AttendeeService();
        
        $scope.attendees.$loaded().then(function() { //success callback
            //console.dir($global.userCount.toString());
        },
        function () { //fail callback
        });
    };
    
    $scope.openEditProfile = function () {
        //tell our HeaderController the user clicked Edit Profile Cog in the attendee section
        
        if($scope.isTwitterLogin || $scope.isFacebookLogin) {
            $timeout(function() {
                $("#modify-social-media-button")[0].click();
            }, 0);
        }
        else {
            $timeout(function() {
                $("#modify-simple-button")[0].click();
            }, 0);
        }
        
        $rootScope.$broadcast('editProfileClick');
    };
    
    $timeout(function() {
        $scope.init();
    }, 50);
}]);

// Display attendee card
function showCard(pic) {
	closeCard();
	pic.next().addClass('open');
	pic.next().appendTo('#Presenters');
	pic.addClass('origin');
}

// Hide attendee card
function closeCard() {
	$('.dudes .origin').after($('.card.open'));
	$('.dudes .origin').removeClass('origin');
	$('.card.open').removeClass('open');
}