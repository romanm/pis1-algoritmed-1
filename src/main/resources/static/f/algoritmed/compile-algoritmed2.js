var app = angular.module('app', ['ngSanitize']);
var init_am_directive = {};
app.controller('ControllerApp1', function($scope, $http) {
	console.log('-------ControllerApp1--------');
	console.log($scope)
	
//	console.log(request)
	init_am_directive.init_programRuns($scope, $http);
});

init_am_directive.init_programRuns=function($scope, $http){
	console.log('-------init_am_directive.init_programRuns--------');
	onLoadPage();
	$scope.request=request;
	console.log(request.viewKey)
	if(init_am_directive['init_'+request.viewKey])
		init_am_directive['init_'+request.viewKey]($scope, $http);
	$http.get('/r/principal').then(function(response) {
		$scope.principal = response.data.principal;
//		console.log($scope.principal)
	});

}

function onLoadPage(){
	request = {}
	request.parameters={};
//	console.log(window.location);
	if(window.location.search.split('?')[1]){
		angular.forEach(window.location.search.split('?')[1].split('&'), function(value, index){
			var par = value.split("=");
			request.parameters[par[0]] = par[1];
		});
	}
//	console.log(request);
	request.viewKey = window.location.pathname.split('/v/')[1];
	if(!request.viewKey){
		var splitHtml = window.location.pathname.split('.')
		if('html'==splitHtml[1]){
			var x = splitHtml[0].split('/')
			request.viewKey = x[x.length-1];
		}
		if(!request.viewKey){
			request.viewKey='index';
		}

	}
}
