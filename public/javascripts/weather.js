angular.module('myapp.weather',[]).controller('weatherInfoShowCtrl',['$scope','$http','$appServ',function ($scope,$http,$appServ) {
	var reginName2townID = {},
		cityInfoUrl = 'CenterWeatherCityCode.json',a=[],b=[],
		temperature = {heightTemperature:[],lowTemperature:[]}, time = [];


	if($scope.$parent.cityNames && $scope.$parent.townNames){
		var tempCityName = $scope.$parent.cityNames;
		var tempTownName = $scope.$parent.townNames;
		$http.get(cityInfoUrl).success(function (data) {
			for(var i in data){
				if((data[i]['cityName'] == tempCityName) && (data[i]['townName']==tempTownName)){
					var id = data[i]['townID'];
				}
			}
			$http.get('/getWeatherInfo?townID=' + id).success(function (data) {
				for (var i in data.weather[0].future) {
					a.push(data.weather[0].future[i]['high']);
					b.push(data.weather[0].future[i]['low']);
					time.push(data.weather[0].future[i]['date']);
				}
				temperature.heightTemperature = a;
				temperature.lowTemperature = b;
				$appServ.creatDoubleCanv(time, temperature);
			})
		})
	}


	$scope.$watch('cityNames', function () {
		$scope.$parent.cityNameIdArray = [];
		// $scope.$parent.townNames = '';
		$scope.$parent.townNameIdArray = [];
		reginName2townID = [];
		a=[];b=[];
		temperature = {heightTemperature:[],lowTemperature:[]};
		time = [];

		$http.get(cityInfoUrl).success(function (data) {
			for (var i in data) {
				if ((data[i]["cityName"].indexOf($scope.$parent.cityNames) == 0) && ($scope.$parent.cityNameIdArray.indexOf(data[i]["cityName"]) < 0)) {
					$scope.$parent.cityNameIdArray.push(data[i]["cityName"]);
				}
				if ($scope.$parent.cityNames === data[i]["cityName"]) {
					$scope.$parent.townNameIdArray.push(data[i]["townName"]);
					reginName2townID[data[i]["townName"]] = data[i]["townID"];
				}
			}
		});
	});

	$scope.$watch('townNames', function () {
		a=[];b=[];
		temperature = {heightTemperature:[],lowTemperature:[]};
		time = [];
		for (var i in reginName2townID) {
			if ($scope.$parent.townNames === i) {
				$http.get('/getWeatherInfo?townID=' + reginName2townID[i]).success(function (data) {
					for (var i in data.weather[0].future) {
						a.push(data.weather[0].future[i]['high']);
						b.push(data.weather[0].future[i]['low']);
						time.push(data.weather[0].future[i]['date']);
					}
					temperature.heightTemperature = a;
					temperature.lowTemperature = b;
					$appServ.creatDoubleCanv(time, temperature);
				})
			}
		}

	})
}]);