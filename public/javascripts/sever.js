angular.module('myapp.service', []).service('$appServ', function () {
    this.creatCanv = function (time, temperature) {
        var config = {
            type: 'line',
            data: {
                labels: time,
                datasets: [{
                    label: "整点气温(℃)",
                    backgroundColor: window.chartColors.red,
                    borderColor: window.chartColors.red,
                    data: temperature,
                    fill: false,
                }]
            },
            options: {
                responsive: true,
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true

                    }],
                    yAxes: [{
                        display: true
                    }]
                }
            }
        };
        document.getElementById('candiv').innerHTML = '<canvas id="canvas"></canvas>';
        var ctx = document.getElementById("canvas").getContext("2d")
        window.myLine = new Chart(ctx, config);
    };
    this.creatDoubleCanv = function (time, temperature) {
            var config = {
                type: 'line',
                data: {
                    labels: time,
                    datasets: [{
                        label: "最高气温(℃)",
                        backgroundColor: window.chartColors.red,
                        borderColor: window.chartColors.red,
                        data: temperature.heightTemperature,
                        fill: false,
                    },
                        {
                            label: "最低气温(℃)",
                            backgroundColor: window.chartColors.blue,
                            borderColor: window.chartColors.blue,
                            data: temperature.lowTemperature,
                            fill: false,
                        }]
                },
                options: {
                    responsive: true,
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            display: true

                        }],
                        yAxes: [{
                            display: true
                        }]
                    }
                }
            };
            document.getElementById('candiv').innerHTML = '<canvas id="canvas"></canvas>';
            var ctx = document.getElementById("canvas").getContext("2d")
            window.myLine = new Chart(ctx, config);
        }
})