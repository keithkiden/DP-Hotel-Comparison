var btn = null;
var options1 = null;
var options2 = null;
var xposition = '215px;';
var yposition = '776.5px; ';
var otaId = 1;
var host = "http://www.dianping.com";
var dayNum = 15;

$(document.body).append(buildOuterContainer(xposition, yposition));

function buildOuterContainer(xpos, ypos){
    var chartContainer1 = '<div id="dp_price_chart_container1"'
    + 'style="position: relative; '
    + 'width: 350px; '
    + 'text-align: center; '
    + 'line-height: 100px; '
    + 'margin-bottom: 2px;'
    + 'height:100px;";>'
    + '正在加载...'
    + '</div>';

    var chartContainer2 = '<div id="dp_price_chart_container2"'
    + 'style="position: relative; '
    + 'width: 350px; '
    + 'text-align: center; '
    + 'line-height: 100px; '
    + 'margin-bottom: 4px;'
    + 'height:100px;";>'
    + '正在加载...'
    + '</div>';

    var outterContainer = '<div id="dp_container"' 
    + 'style="position: absolute; '
    + 'width: 356px; '
    + 'padding-top: 3px; '
    + 'top: ' + xpos
    + 'left: ' + ypos
    + 'background: #ffffff;'
    + 'display: none; '
    + 'z-index: 2147483647;">'
    + '<div style="padding-top: 0px; border: 3px solid; border-color: #F08006;">'
    + chartContainer1
    + chartContainer2
    + '<div id="priceBlock">'
    + '</div>'
    + '</div>'
    + '</div>';

    return outterContainer;
}

function buildPrice(otaName, price, promo, refund, href){
    var priceBtn = '<div style="align-content: right; '
    + 'display: inline-block; '
    + 'font-weight: bold; font-size: 16px; '
    + 'background: #F08006; '
    + 'padding-top: 4px; '
    + 'padding-left: 4px; '
    + 'padding-right: 6px; '
    + 'padding-bottom: 4px; '
    + 'color: #ffffff; '
    + 'text-align: center; '
    + 'border-radius: 3px; '
    + 'box-shadow: 1px 1px 1px #888888; '
    + 'width: 65px;'
    + 'line-height: 20px;'
    + '">'
    + (0 < price ? ("￥" + price) : '优惠价')
    + '</div>';

    var onePrice = '<div style="padding-left: 15px; display: inline;width: 160px; float: left;">' + otaName + '</div>'
    + '<div style="float: left; width: 80px; height: 50px;">'
    + (null == promo ? '' : promo)
    + (null == refund ? '' : refund)
    + '</div>'
    + '<div style="float: left; width: 85px; height: 50px;">'
    + priceBtn
    + '</div>'
    + '</div>';

    var priceContent = '<a style="text-decoration: none; color: #000000;" target="_blank" href=' + href + '>'
    + '<div class="dp_ota_price_container"'
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
    + '</div>'
    + '</a>';

    return priceContent;
}

function buildIcon(logoText, content, color){
    var iconContent = '<div style="display:inline-block;'  
    + 'background: #ffffff; '
    + 'border: 1px solid ' + color + '; '
    + 'padding-top: 2px; '
    + 'padding-left: 3px; '
    + 'padding-right: 3px; '
    + 'padding-bottom: 2px; '
    + 'color: ' + color + '; '
    + 'width: 35px;'
    + 'line-height: 14px;'
    + 'text-align: center;'
    + '">'
    + content
    + '</div>';

    var icon = '<div style="'
    + 'display:inline; '
    + 'background: ' + color + '; '
    + 'border: 1px solid ' + color + '; '
    + 'height: 50px; '
    + 'width: 50px; '
    + 'font-size: 13px; '
    + 'padding-top: 1px; '
    + 'padding-left: 2.5px; '
    + 'padding-right: 2.5px; '
    + 'padding-bottom: 1px; '
    + 'color: #ffffff; '
    + '">'
    + logoText
    + '</div>';

    return icon + (null == content || content == '' ? '' : iconContent);
}

function appendPrice(){
    if($('#priceBlock').text() == ''){
        var priceUrl = host + '/index/hotel/ajax/otaCompare?currentURL=' + window.location.origin + window.location.pathname;
        $.getJSON(priceUrl, function(json){
            if(json.code == 200){
                var entirePriceBlock = '';
                $.each(json.msg, function(index, value){
                    if(value.otaID != otaId){
                        var promoDiv = null;
                        var refundDiv = null;
                        var promoArray = jQuery.parseJSON(value.promo);
                        $.each(promoArray, function(index, value){
                            if(value.type == 4) refundDiv = buildIcon('返', value.discount, '#ffb12a');
                            if(value.type == 3) promoDiv = buildIcon('促', value.description, '#84b328');
                        });
                        entirePriceBlock = entirePriceBlock + buildPrice(value.otaName, value.avgLowPrice, promoDiv, refundDiv, value.url);
                    }
                });
                if(entirePriceBlock != ''){
                    $('#priceBlock').html('');
                    $('#priceBlock').html(entirePriceBlock);
                }
                $('.dp_ota_price_container').hover(
                    function(){
                        $(this).css("background", "#ececec");
                    },
                    function(){                
                        $(this).css("background", "#f3f3f3");
                    }
                );
            }
        });
    }
}

function appendChart(){

    function initialChart(renderTarget, xtitle){
        var templeteOptions = {
            chart: {
                renderTo: renderTarget,
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
                        enabled: true,
                        style: {
                            fontSize: '9px'
                        }
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
                labels: "",
                title: {text: xtitle},
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

        return templeteOptions;
    }

    function drawChart(targertOptions, renderTarget, otaName, otaData){
        if(targertOptions == 1){
            options1 = initialChart(renderTarget, "过去15日价格");
            options1.series.push({
                name: otaName,
                data: otaData
            });
        } else {
            options2 = initialChart(renderTarget, "未来15日价格");
            options2.series.push({
                name: otaName,
                data: otaData
            });
        }
    }

    if(null == options1 || $('#dp_price_chart_container1').text() == '正在加载...' || $('#dp_price_chart_container1').text() == '暂时无法获取价格走势'){
        $('#dp_price_chart_container1').html('正在加载...');
        $('#dp_price_chart_container2').html('正在加载...');
        var priceUrl = host + '/index/hotel/ajax/priceTrend?dayNum=' + dayNum + '&currentURL=' + window.location.origin + window.location.pathname;
        $.getJSON(priceUrl, function(json){
            if(json.code == 200){
                $.each(json.msg, function(index, value){
                    if(value.otaID == otaId){
                        var otaName = value.otaName;

                        var otaData1 = [];
                        var trends1 = value.trend[0];                        
                        $.each(trends1, function(index, value){
                            var formatdate = new String(value.priceDate).substring(5, 10).replace('-','/');
                            var oneDayPrice = [formatdate, value.lowPrice];
                            otaData1.push(oneDayPrice);
                        });

                        var otaData2 = [];
                        var trends2 = value.trend[1];
                        $.each(trends2, function(index, value){
                            var formatdate = new String(value.priceDate).substring(5, 10).replace('-','/');
                            var oneDayPrice = [formatdate, value.lowPrice];
                            otaData2.push(oneDayPrice);
                        });

                        $('#dp_price_chart_container1').html('');
                        $('#dp_price_chart_container2').html('');
                        drawChart(1, 'dp_price_chart_container1', otaName, otaData1);
                        drawChart(2, 'dp_price_chart_container2', otaName, otaData2);

                        if(null == options1) return;
                        var chart1 = new Highcharts.Chart(options1);
                        var chart2 = new Highcharts.Chart(options2);
                    }
                });
            } else {
                refresh();
            }
        }).error(function(){
            refresh();
        });
    }

    function refresh(){
        $('#dp_price_chart_container1').html('<a id="dp_refreshchart1" style="cursor: pointer;">暂时无法获取价格走势</a>');
        $('#dp_price_chart_container2').html('<a id="dp_refreshchart2" style="cursor: pointer;">暂时无法获取价格走势</a>');
        $('#dp_refreshchart1').click(function(){
            appendChart();
        });
        $('#dp_refreshchart2').click(function(){
            appendChart();
        });
    }
    
    if(null == options1) return;
    var chart1 = new Highcharts.Chart(options1);
    var chart2 = new Highcharts.Chart(options2);
}

$(bindBtnDiv());

function bindBtnDiv(){
    if(null != btn) return;

    var btnDiv = $('#divHotelPrice');
    btnDiv.hover(
         function(){
            bindBtn();
        },
        function(){}
    );
}

function bindBtn(){
    if(null != btn) return;

    $(".btn").each(
        function(index){
            if (null == btn && $(this).text() == '立即预订') {
                btn = $(this);
            }
        }
    );

    if(null == btn) return;

    var dpDiv = $('#dp_container');
    btn.hover(
        function(){
            dpDiv.show();
            appendChart();
            appendPrice();
        },
        function(){
            dpDiv.hide();
        }
    );
    dpDiv.hover(
        function(){
            dpDiv.show();
        },
        function(){
            dpDiv.hide();
        }
    );
}