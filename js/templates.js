angular.module('templates', [])
.run(['$templateCache', function ($templateCache) {

    $templateCache.put('register-modal.html',             
        "<div class=\"container\">\n" +
            "<div class=\"row\">\n" +
                "<div class=\"span2\">\n" +
                    "<button id=\"register-twitter-button\" class=\"btn btn-md btn-info\" ng-click=\"registerTwitterPopup()\">Register With <i class=\"fa fa-twitter\"></i></button>\n" +
                "</div>\n" +
               "<div class=\"span1\">\n" +
                    "- or - \n" +
                "</div>\n" +
                "<div class=\"span2\">\n" +
                    "<ng-form name=\"registerForm\" class=\"row-border\" novalidate>\n" +
                        "<div class=\"form-group\">\n" +
                            "<label class=\"control-label\">Email</label>\n" +
                            "<div>\n" +
                                "<input type=\"text\" ng-model=\"email\" class=\"form-control\" required=\"\"/>\n" +
                            "</div>\n" +
                        "</div>\n" +
                        "<div class=\"form-group\">\n" +
                            "<label class=\"control-label\">Password</label>\n" +
                            "<div>\n" +
                                "<input type=\"password\" ng-model=\"password\" class=\"form-control\" required=\"\" />\n" +
                            "</div>\n" +
                        "</div>\n" +
                        "<div class=\"form-group\">\n" +
                            "<button type=\"submit\" class=\"btn btn-success\" ng-click=\"normalRegister(email, password)()\" ng-disabled=\"registerForm.$invalid\">Register</button>\n" +
                            "<button type=\"submit\" class=\"btn btn-success\" ng-click=\"normalLogin(email, password, false)()\" ng-disabled=\"registerForm.$invalid\"> Login</button>\n" +
                        "</div>\n" +
                    "</ng-form>\n" +
                "</div>\n" +
            "</div>\n" +
        "</div>\n"
    );
    
    $templateCache.put('mod-user-twitter-modal.html',             
        "<div class=\"container\">\n" +
            "<div class=\"row\">\n" +
                "Twitter - {{talkObj.submitted.toString()}} \n" +
            "</div>\n" +
        "</div>\n"
    );
}]);