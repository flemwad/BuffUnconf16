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
function showCard(card) {
	$('.card.open').removeClass('open');
	card.next().addClass('open');
}

// Hide attendee card
function closeCard() {
	$('.card.open').removeClass('open');
}