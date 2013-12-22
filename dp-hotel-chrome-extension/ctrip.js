var options = null;

$(function() {
    var chartContainer = '<div id="dp_price_chart_container"'
    + 'style="position: relative; '
    + 'width: 350px; '
    + 'height:100px;";>'
    + '</div>';

    var prict = '<div id="dp_ota_price_container"'
    + 'style="position: relative; '
    + 'width: 344px; '
    + 'margin-bottom: 2px; '
    + 'margin-left: 3px; '
    + 'margin-right: 3px; '
    + 'background: #f3f3f3;'
    + 'vertical-align: middle; '
    + 'line-height: 30px; '
    + 'height:28px;";><span style="padding-left: 15px">价格：xxxx</span>'
    + '</div>'

    var outteContainer = '<div id="dp_container"' 
    + 'style="position: absolute; '
    + 'width: 350px; '
    + 'height:190px; '
    + 'top: 350px; '
    + 'left: 546.5px; '
    + 'background: #ffffff;'
    + 'display: none; '
    + 'border: 3px solid;'
    + 'border-color: #F08006;'
    + 'z-index: 2147483647;">'
    + chartContainer
    + prict
    + prict
    + prict
    + '</div>';

    $(document.body).append(outteContainer);
});

$(function(){
    options = {
        chart: {
            renderTo: 'dp_price_chart_container',
            type: 'line',
            margin: [4, 4, 18, 4]
        },
        title: {
            text: null
        },
        plotOptions: {
            series: {
                color: '#F08006',
                dataLabels: {
                    enabled: true
                },
            }
        },
        tooltip: {
            crosshairs: [true, true]
        },
        yAxis: {
            title: {text: null},
            labels: "",
            minorTickInterval: 50,
            showFirstLabel: false
        },
        xAxis: {
            type: 'category',
            tickInterval: 1,
            gridLineWidth: 1,
            tickWidth: 0,
        },
        legend: {
            enabled: false
        },
        credits: {  
            enabled: false  
        }, 
        series: []
    };

    options.series.push({
        name: '携程',
        data: [['12/20',345],['12/21',232],['12/22',343],['12/23',343],['12/24',453],['12/25',123],['12/26',342]]
    });
})

$(function bindBtn(){
    var btn = $('#btn_book_now');
    var dpDiv = $('#dp_container');
    btn.hover(
        function(){
            dpDiv.show();
            appendChart();
        },
        function(){
        }
    );
    dpDiv.hover(
        function(){
        },
        function(){                
            dpDiv.hide();
        }
    );
});

function appendChart(){
    if(null == options) return;
    var chart = new Highcharts.Chart(options);
}

