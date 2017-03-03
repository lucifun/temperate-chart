angular.module('myapp.temp', []).controller('myAppCtr', ['$scope', '$http', '$appServ', function ($scope, $http, $appServ) {

	var reginName2townID = {},
		cityInfoUrl = 'CenterWeatherCityCode.json',
		temperature = [], time = [];
	if($scope.$parent.cityNames && $scope.$parent.townNames){
		var tempCityName = $scope.$parent.cityNames;
		var tempTownName = $scope.$parent.townNames;
		$http.get(cityInfoUrl).success(function (data) {
			for(var i in data){
				if((data[i]['cityName'] == tempCityName) && (data[i]['townName']==tempTownName)){
					var id = data[i]['townID'];
				}
			}
			$http.get('/getallDayWeatherInfo?townID=' + id).success(function (data) {
				for (var i in data.hourly) {
					temperature.push(data.hourly[i]['temperature']);
					time.push(data.hourly[i]['time'].slice(11, 16));
				}
				$appServ.creatCanv(time, temperature);
			})
		})
	}


	$scope.$watch('cityNames', function () {
		$scope.$parent.cityNameIdArray = [];
		$scope.$parent.townNameIdArray = [];
		reginName2townID = [];
		temperature = [];
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
		temperature = [];
		time = [];
		for (var i in reginName2townID) {
			if ($scope.$parent.townNames === i) {
				$http.get('/getallDayWeatherInfo?townID=' + reginName2townID[i]).success(function (data) {
					for (var i in data.hourly) {
						temperature.push(data.hourly[i]['temperature']);
						time.push(data.hourly[i]['time'].slice(11, 16));
					}
					$appServ.creatCanv(time, temperature);
				})
			}
		}
	})

}]);