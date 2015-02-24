'use strict'

angular
.module('services', [])
.constant('FBURL', 'https://buffalo-unconference.firebaseio.com/')
.constant('PROFILESURL', 'https://buffalo-unconference.firebaseio.com/profiles')
.service('$global', ['$rootScope', '$firebaseAuth', 'FBURL', 'PROFILESURL', function ($rootScope, $firebaseAuth, FBURL, PROFILESURL) {
    
    this.ref = new Firebase(FBURL);
    this.profilesRef = new Firebase(PROFILESURL);
    
    this.auth = $firebaseAuth(this.ref);
    this.isLoggedIn = angular.isObject(this.auth.$getAuth()) ? true : false;
    
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
//.factory('$bootbox', ['$modal', function ($modal) {
//    // NOTE: this is a workaround to make BootboxJS somewhat compatible with
//    // Angular UI Bootstrap in the absence of regular bootstrap.js
//    if ($.fn.modal == undefined) {
//        $.fn.modal = function (directive) {
//            var that = this;
//            if (directive == 'hide') {
//                if (this.data('bs.modal')) {
//                    this.data('bs.modal').close();
//                    $(that).remove();
//                }
//                return;
//            } else if (directive == 'show') {
//                return;
//            }
//
//            var modalInstance = $modal.open({
//                template: $(this).find('.modal-content').html()
//            });
//            this.data('bs.modal', modalInstance);
//            setTimeout(function () {
//                $('.modal.ng-isolate-scope').remove();
//                $(that).css({
//                    opacity: 1,
//                    display: 'block'
//                }).addClass('in');
//            }, 100);
//        };
//    }
//
//    return bootbox;
//}]);
