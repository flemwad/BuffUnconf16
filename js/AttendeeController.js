'use strict'

angular
.module('attendee-controller', [])
.controller('AttendeeController',
[   '$scope',
    '$firebase',
    '$global',
    '$timeout',
    '$rootScope',
    'AttendeeService',
function ($scope, $firebase, $global, $timeout, $rootScope, AttendeeService) {

    $scope.attendees = null;
    $scope.isLoggedIn = $global.isLoggedIn;
    
    $scope.init = function () {
        $scope.attendees = AttendeeService();
        
        $scope.attendees.$loaded().then(function() { //success callback
            $global.userCount = $scope.attendees.length;
            //console.dir($global.userCount.toString());
        },
        function () { //fail callback
        });
        
    };
    
    $scope.openEditProfile = function () {
        //tell our HeaderController the user clicked Edit Profile Cog in the attendee section
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
	pic.next().appendTo('.dudes');
	pic.addClass('origin');
}

// Hide attendee card
function closeCard() {
	$('.dudes .origin').after($('.card.open'));
	$('.dudes .origin').removeClass('origin');
	$('.card.open').removeClass('open');
}