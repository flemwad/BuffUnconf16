'use strict'

angular
.module('services', [])
.constant('FBURL', 'https://buffalo-unconference.firebaseio.com/')
.constant('USERSURL', 'https://buffalo-unconference.firebaseio.com/users')
.service('$global', ['$rootScope', '$firebaseAuth', '$firebase', 'FBURL', 'USERSURL', function ($rootScope, $firebaseAuth, $firebase, FBURL, USERSURL) {
    
    this.ref = new Firebase(FBURL);
    this.userRef = new Firebase(USERSURL);
    
    this.uid = null;
    this.userCount = 0;
    this.speakerCount = 0;
    this.attendeeCount = 0;
    
    this.maxUserLimitReached = false;
    
    this.auth = $firebaseAuth(this.ref);
    this.loginObj = this.auth.$getAuth();
    
    this.isLoggedIn = angular.isObject(this.loginObj) ? true : false;
    
    if(this.isLoggedIn) {
        this.uid = this.loginObj.uid
        this.isTwitterLogin = this.uid.indexOf('twitter') > -1;
        this.isSimpleLogin = this.uid.indexOf('simple') > -1;
    }
    
    this.userRef.once('value', function(snapshot) {
        var users = snapshot.val();
        this.userCount = Object.keys(users).length;
        
        if(angular.equals(250, this.userCount)) {
            this.maxUserLimitReached = true;
            $rootScope.$broadcast('maxLimitReached');
        }
        
        Object.keys(users).forEach(function(key) {
            var userObj = users[key];
            
            if(userObj.talk && userObj.talk.submitted) this.speakerCount++;
            else this.attendeeCount++;
        }, this);
        
        $rootScope.$broadcast('userCountReady');
        $rootScope.$broadcast('speakerCountReady');
        $rootScope.$broadcast('attendeeCountReady');
        
        //console.dir(this.userCount.toString() + ' users signed up');
        //console.dir(this.speakerCount.toString() + ' speakers signed up');
        //console.dir(this.attendeeCount.toString() + ' attendees signed up');
        
    }, function (errorObject) {
        console.dir('User count read failed: ' + errorObject.code);
    }, this);
    
}]) //end service
.factory('UserService', ['$firebase', '$global', function($firebase, $global) {
    return function (uid) {
        // return as a synchronized object
        return $firebase($global.userRef.child(uid)).$asObject();
    };
}])
.factory('AttendeeService', ['$firebase', '$global', function($firebase, $global) {
  return function() {
    // return it as a synchronized object
    return $firebase($global.userRef).$asArray();
  };
}]);