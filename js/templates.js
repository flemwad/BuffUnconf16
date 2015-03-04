angular.module('templates', [])
.run(['$templateCache', function ($templateCache) {

    $templateCache.put('register-modal.html',             
        "<div class=\"container\">\n" +
            "<div class=\"row\">\n" +
                "<div class=\"span3\">\n" +
                    "<h3>Register with Twitter</h3>" +
					"<button id=\"register-twitter-button\" class=\"btn btn-md btn-info\" ng-click=\"registerTwitterPopup()\"><i class=\"fa fa-twitter\"></i> Register</button>\n" +
                "</div>\n" +
                "<div class=\"span1\">\n" +
                    "- or - \n" +
                "</div>\n" +
                "<div class=\"span3\">\n" +
                    "<h3>Create Account</h3>" +
					"<ng-form name=\"registerForm\" class=\"row-border\" novalidate>\n" +
                        "<div class=\"form-group\">\n" +
                            "<label class=\"control-label\">Email</label>\n" +
                            "<div>\n" +
                                "<input name=\"email\" type=\"email\" ng-model=\"email\" class=\"form-control\" required=\"\"/>\n" +
                            "</div>\n" +
                        "</div>\n" +
                        "<div class=\"form-group\">\n" +
                            "<label class=\"control-label\">Password</label>\n" +
                            "<div>\n" +
                                "<input name=\"password\" type=\"password\" ng-model=\"password\" class=\"form-control\" required=\"\" />\n" +
                            "</div>\n" +
                        "</div>\n" +
                        "<div class=\"form-group\">\n" +
                            "<button type=\"submit\" class=\"btn btn-success\" ng-click=\"normalRegister(email, password)()\" ng-disabled=\"registerForm.$invalid\">Register</button>\n" +
                            "<button type=\"submit\" class=\"btn btn-success\" ng-click=\"normalLogin(email, password, false, $event)()\" ng-disabled=\"registerForm.$invalid\"> Login</button>\n" +
                        "</div>\n" +
                    "</ng-form>\n" +
                "</div>\n" +
            "</div>\n" +
            "<div class=\"row\">\n" +
                "<div class=\"span3\">\n" +
                    "<span ng-if=\"invalidLogin\">Invalid username or password!</span>\n" +
                    "<span ng-if=\"invalidTwitRegistration\">Invalid Twitter registration!</span>\n" +
                    "<div ng-if=\"invalidRegistration\">User already exists! <a href=\"\" ng-click=\"resetPassword()\">Reset password?</a></div>\n" +
                "</div>\n" +
            "</div>\n" +
        "</div>\n"
    );
    
    $templateCache.put('mod-user-twitter-modal.html',             
        "<div class=\"container\" ng-controller=\"ModifyUserController\">\n" +
			"<div class=\"row\">\n" +
				"<div class=\"span4\">\n" +
					"<ng-form name=\"modTwitTalkForm\" class=\"row-border\" novalidate>\n" +
						"<div class=\"form-group\">\n" +
							"<label class=\"control-label\">Topic</label>\n" +
							"<input type=\"text\" ng-model=\"talkObj.topic\" class=\"form-control\" placeholder=\"Title of your talk...\" required=\"\" />\n" +
						"</div>\n" +
						"<div class=\"form-group\">\n" +
							"<label class=\"control-label\">Description</label>\n" +
							"<textarea ng-model=\"talkObj.description\" class=\"form-control\" placeholder=\"A short description of your talk...\" required=\"\" rows=\"5\" />\n" +
						"</div>\n" +
						"<div class=\"form-group\">\n" +
							"<label class=\"control-label\">URL</label>\n" +
							"<input type=\"text\" ng-model=\"talkObj.url\" class=\"form-control\" placeholder=\"Site to help present your talk\" />\n" +
						"</div>\n" +
					"</ng-form>\n" +
					"<div ng-if=\"talkObj.attendOnly\">\n" +
						   "<label>You are currently attending only.</label>\n" +
					"</div>\n" +
				"</div>\n" +
			"</div>\n" +
        "</div>\n"
    );
    
    $templateCache.put('mod-user-simple-modal.html',             
        "<div class=\"container\" ng-controller=\"ModifyUserController\">\n" +
            "<div class=\"row\">\n" +
                "<div class=\"span4\">\n" +
                    "<h3>USER INFO</h3>\n" +
                    "<ng-form name=\"modSimpleUserForm\" class=\"row-border\" novalidate>\n" +
                        "<div class=\"form-group\">\n" +
                            "<label class=\"control-label\">Name</label>\n" +
                             "<input type=\"text\" ng-model=\"userObj.displayName\" class=\"form-control\" placeholder=\"First and Last Name...\" required=\"\" />\n" +
                        "</div>\n" +
                        "<div class=\"form-group\">\n" +
                            "<label class=\"control-label\">Description</label>\n" +
                            "<textarea ng-model=\"userObj.description\" class=\"form-control\" placeholder=\"A short description of yourself...\" required=\"\" rows=\"6\" />\n" +
                        "</div>\n" +
                        "<div class=\"form-group\">\n" +
                            "<label class=\"control-label\">Location</label>\n" +
                            "<input type=\"text\" ng-model=\"userObj.location\" class=\"form-control\" placeholder=\"Where you currently live...\" />\n" +
                        "</div>\n" +
                    "</ng-form>\n" +
                "</div>\n" +
                
                "<div class=\"span4\">\n" +
                    "<h3>TALK INFO</h3>\n" +
                    "<ng-form name=\"modSimpleTalkForm\" class=\"row-border\" novalidate>\n" +
                        "<div class=\"form-group\">\n" +
                            "<label class=\"control-label\">Topic</label>\n" +
                            "<input type=\"text\" ng-model=\"talkObj.topic\" class=\"form-control\" placeholder=\"Title of your talk...\" required=\"\" />\n" +
                        "</div>\n" +
                        "<div class=\"form-group\">\n" +
                            "<label class=\"control-label\">Description</label>\n" +
                            "<textarea ng-model=\"talkObj.description\" class=\"form-control\" placeholder=\"A short description of your talk...\" required=\"\" rows=\"6\" />\n" +
                        "</div>\n" +
                        "<div class=\"form-group\">\n" +
                            "<label class=\"control-label\">URL</label>\n" +
                                "<input type=\"text\" ng-model=\"talkObj.url\" class=\"form-control\" placeholder=\"Site to help present your talk\" />\n" +
                        "</div>\n" +
                    "</ng-form>\n" +
                    "<div ng-if=\"talkObj.attendOnly\">\n" +
                        "<label>You are currently attending only.</label>\n" +
                    "</div>\n" +
                "</div>\n" +
            "</div>\n" +
        "</div>\n"
    );
}]);