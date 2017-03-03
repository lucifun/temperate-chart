angular.module('myapp', ['myapp.temp','myapp.route', 'myapp.service','myapp.weather'])
    .controller('myAppController',['$scope',function ($scope) {
        $scope.cityNames = '';
        $scope.cityNameIdArray = [];
        $scope.townNames = '';
        $scope.townNameIdArray = [];
        document.querySelector('.cityNameInput').addEventListener('mouseup',function () {
            document.querySelector('.townNameInput').value = '';
        })
    }]);