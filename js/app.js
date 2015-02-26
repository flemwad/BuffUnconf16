'use strict';

angular
.module('buffaloUnconference', [
    'firebase',
    'services',
    'header-controller',
    'templates'
])
.controller('AppController', 
[
    '$scope', 
    '$global', 
function ($scope, $global) {

    $scope.isLoggedIn = $global.isLoggedIn;
    
}]) //end controller
.run(function () {
});