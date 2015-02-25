'use strict'

angular
.module('services', [])
.constant('FBURL', 'https://buffalo-unconference.firebaseio.com/')
.constant('USERSURL', 'https://buffalo-unconference.firebaseio.com/users')
.service('$global', ['$rootScope', '$firebaseAuth', 'FBURL', 'USERSURL', function ($rootScope, $firebaseAuth, FBURL, USERSURL) {
    
    this.ref = new Firebase(FBURL);
    this.usersRef = new Firebase(USERSURL);
    
    this.auth = $firebaseAuth(this.ref);
    this.isLoggedIn = angular.isObject(this.auth.$getAuth()) ? true : false;
    console.dir(this.isLoggedIn);
    
}]) //end service
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