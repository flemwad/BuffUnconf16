'use strict'

angular
.module('services', [])
.constant('FBURL', 'https://buffalo-unconference.firebaseio.com/')
.constant('USERSURL', 'https://buffalo-unconference.firebaseio.com/users')
.service('$global', ['$rootScope', '$firebaseAuth', 'FBURL', 'USERSURL', function ($rootScope, $firebaseAuth, FBURL, USERSURL) {
    
    this.ref = new Firebase(FBURL);
    
    this.uid = null;
    
    this.auth = $firebaseAuth(this.ref);
    this.loginObj = this.auth.$getAuth();
    
    this.isLoggedIn = angular.isObject(this.loginObj) ? true : false;
    
    if(this.isLoggedIn) {
        this.uid = this.loginObj.uid
        this.isTwitterLogin = this.uid.indexOf('twitter') > -1;
        this.isSimpleLogin = this.uid.indexOf('simple') > -1;
    }
    
    //console.dir(this.isLoggedIn);
    
}]) //end service
.factory('UserService', ['$firebase', '$global', 'USERSURL', function($firebase, $global, USERSURL) {
  return function(uid) {
    // create a reference to the user's profile
    var ref = new Firebase(USERSURL);
    // return it as a synchronized object
    return $firebase(ref.child(uid)).$asObject();
  }
}])
.factory('templateCompiler', function ($templateCache, $compile) {
    return {
        getCompiledHTML: function ($scope, htmlTemplateName) {
            var tplCrop = $templateCache.get(htmlTemplateName);

            var template = angular.element(tplCrop);
            var linkFn = $compile(template);
            var compiledHTML = linkFn($scope);

            return compiledHTML;
        }
    }
});