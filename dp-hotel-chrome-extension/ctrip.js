var options = null;

$(function(){
    var chartContainer = '<div id="dp_price_chart_container"'
    + 'style="position: relative; '
    + 'width: 350px; '
    + 'text-align: center; '
    + 'line-height: 100px; '
    + 'height:100px;";>'
    + '正在加载...'
    + '</div>';

    var outterContainer = '<div id="dp_container"' 
    + 'style="position: absolute; '
    + 'width: 356px; '
    + 'padding-top: 3px; '
    + 'top: 347px; '
    + 'left: 546.5px; '
    + 'background: #ffffff;'
    // + 'display: none; '
    + 'z-index: 2147483647;">'
    + '<div style="padding-top: 0px; border: 3px solid; border-color: #F08006;">'
    + chartContainer
    + '<div id="priceBlock">'
    + '</div>'
    + '</div>'
    + '</div>';

    $(document.body).append(outterContainer);
});

function buildPrice(price, promo, refund){
    var priceBtn = '<div style="align-content: right; '
    + 'display: inline; '
    + 'font-weight: bold; font-size: 16px; '
    + 'background: #F08006; '
    + 'padding-top: 4px; '
    + 'padding-left: 4px; '
    + 'padding-right: 6px; '
    + 'padding-bottom: 4px; '
    + 'color: #ffffff; '
    + 'text-align: center; '
    + 'margin-left: 40px; '
    + 'border-radius: 3px; '
    + 'box-shadow: 1px 1px 1px #888888; '
    + '">￥'
    + price
    + '</div>';

    var onePrice = '<div style="padding-left: 15px;'
    + 'display: inline;'
    + '">'
    + '艺龙网'
    + promo
    + refund
    + priceBtn
    + '</div>'

    var priceContent = '<a style="text-decoration: none; color: #000000;" href="">'
    + '<div id="dp_ota_price_container"'
    + 'style="position: relative; '
    + 'width: 344px; '
    + 'margin-bottom: 2px; '
    + 'margin-left: 3px; '
    + 'margin-right: 3px; '
    + 'background: #f3f3f3;'
    + 'vertical-align: middle; '
    + 'line-height: 50px; '
    + 'height:50px;";>'
    + onePrice
    + '</div>';
    + '</a>';

    return priceContent;
}

function buildIcon(logoText, content, color){
    var iconContent = '<div style="display:inline;'  
    + 'background: #ffffff; ' 
    + 'padding-top: 1px; '
    + 'padding-left: 2px; '
    + 'padding-right: 2px; '
    + 'padding-bottom: 1px; '
    + 'margin-left: 4px; '
    + 'color: ' + color + '; '
    + '">'
    + content
    + '</div>';

    var icon = '<div style="margin-left: 20px; '
    + 'display:inline; '
    + 'background: ' + color + '; '
    + 'border: 1px solid ' + color + '; '
    + 'height: 50px; '
    + 'width: 50px; '
    + 'font-size: 13px; '
    + 'padding-top: 1px; '
    + 'padding-left: 2px; '
    + 'padding-bottom: 1px; '
    + 'color: #ffffff; '
    + '">'
    + logoText
    + iconContent
    + '</div>';

    return icon;
}

function appendPrice(){
    var promo =  buildIcon('促', '江浙沪大促', '#84b328');
    var refund =  buildIcon('返', '180', '#ffb12a');
    var price = buildPrice(277, promo, refund);
    $('#priceBlock').html('');
    $('#priceBlock').html(price);
}

$(function(){
    bindBtn($('#btn_book_now'));
});

function bindBtn(btn){
    var dpDiv = $('#dp_container');
    btn.hover(
        function(){
            dpDiv.show();
            appendChart();
            appendPrice();
        },
        function(){
            // dpDiv.hide();
        }
    );
    dpDiv.hover(
        function(){
            dpDiv.show();
        },
        function(){                
            // dpDiv.hide();
        }
    );
}

function appendChart(){

    function initialChart(){
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
                minorTickInterval: "auto",
                showFirstLabel: false
            },
            xAxis: {
                type: 'category',
                minorTickInterval: 1,
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
    }

    function drawChart(otaName, otaData){
        initialChart();
        options.series.push({
            name: otaName,
            data: otaData
        });
    }

    if(null == options || $('#dp_price_chart_container').text() == '正在加载...'){
        var priceUrl = 'http://w.alpha.dp/index/hotel/ajax/priceTrend?currentURL=' + window.location.origin + window.location.pathname;
        $.getJSON(priceUrl, function(json){
            if(json.code == 200){
                var trends = json.msg[0].trend;
                var otaName = json.msg[0].otaName;
                var otaData = [];
                $.each(trends, function(index, value){
                    var formatdate = new String(value.priceDate).substring(5, 10).replace('-','/');
                    var oneDayPrice = [formatdate, value.lowPrice];
                    otaData.push(oneDayPrice);
                })
                drawChart(otaName, otaData);
            }
        });
    }
    if(null == options) return;
    var chart = new Highcharts.Chart(options);
}