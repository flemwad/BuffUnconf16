'use strict'

angular
.module('attendee-controller', [])
.controller('AttendeeController',
[   '$scope',
    '$firebase',
    '$global',
    '$timeout',
    'AttendeeService',
function ($scope, $firebase, $global, $timeout, AttendeeService) {

    $scope.attendees = null;
    
    $scope.init = function () {
        $scope.attendees = AttendeeService();
        
        $scope.attendees.$loaded().then(function() { //success callback
            //console.dir($scope.attendees);
        },
        function () { //fail callback
        });
        
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