$(function() {
    Highcharts.setOptions({
        chart: {
            backgroundColor: {
                linearGradient: [0, 0, 500, 500],
                stops: [
                    [0, 'rgb(255, 255, 255)'],
                    [1, 'rgb(240, 240, 255)']
                    ]
            },
            borderWidth: 1,
            plotBackgroundColor: 'rgba(255, 255, 255, .9)',
            plotShadow: true,
            plotBorderWidth: 1
        }
    });
});

$(function() {
    $(document.body).append('<div id="dp_price_chart_container" style="position: absolute; width: 350px; height:150px; top: 229px; left: 784.5px; z-index: 2147483647;"></div>');

    var options = {
        chart: {
            renderTo: 'dp_price_chart_container',
            type: 'line'
        },
        title: {
            text: ''
        },
        yAxis: {
            title: {text: ""},
            minorTickInterval: 50
        },
        xAxis: {
            minorTickInterval: 7,
            categories: ['12/20', '12/21', '12/22', '12/23', '12/24', '12/25', '12/26']
        },
        legend: {
            enabled: false
        },
        series: []
    };

    options.series.push({
        name: '艺龙',
        data: [345,232,343,343,453,123,342]
    });

    var chart = new Highcharts.Chart(options);
});
