
'use strict';
angular.module("myApp").controller('menuController', function($scope) {
	var self = this;
	$(".overlay-drawer").click(function(){
		$("#main-sidebar").removeClass('mobile')
	})
});

