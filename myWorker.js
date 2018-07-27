//const echarts = require("./echarts.min.js");
importScripts("./echarts.min.js");
function base64ToBlob(code) {
  let parts = code.split(';base64,');
  let contentType = parts[0].split(':')[1];
  let raw = window.atob(parts[1]);
  let rawLength = raw.length;

  let uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], {type: contentType});
}

function redrawChart(emoData,warnRuleInfo){
  let $this = this;
  let myChart = echarts.init(document.getElementById('detail_chartVisual'));
  let emotionthreshold = [0,80,warnRuleInfo['emThresholdNeutral'],warnRuleInfo['emThresholdHappy'],warnRuleInfo['emThresholdContempt'],warnRuleInfo['emThresholdDisgusted']
    ,warnRuleInfo['emThresholdSurprised'],warnRuleInfo['emThresholdSad'],warnRuleInfo['emThresholdFearful'],warnRuleInfo['emThresholdAngry'],warnRuleInfo['hrThresholdMin'],warnRuleInfo['hrThresholdMax']];
  let emotionflags = [false,true,warnRuleInfo['emNeutral'],warnRuleInfo['emHappy']
    ,warnRuleInfo['emContempt'],warnRuleInfo['emDisgusted'],warnRuleInfo['emSurprised']
    ,warnRuleInfo['emSad'],warnRuleInfo['emFearful'],warnRuleInfo['emAngry'],true,true];
  let strfilter = Array(11);
  for(let i = 0; i<11;i++){
    strfilter[i] = new Array();
  }
  emoData.forEach( val =>{
    for(var i = 2; i < 10 ; i++){
      if((val[i] >= emotionthreshold[i])&&(emotionflags[i])){
        strfilter[i].push({coord: [emoData.indexOf(val),val[i]]})
      }
    }
  })
  console.log('strfilter');
  //console.log(hrtData)
  var option = {
    xAxis: [{
      data: emoData.map(function (item) {return new Date(item[0]).toLocaleTimeString('chinese',{hour12:false});})
    },],
    series: [{
      markPoint: {
        data: strfilter[1]
      },
      data: emoData.map(function (item) {return item[1];}),
    },{
      markPoint: {
        data: strfilter[2]
      },
      data: emoData.map(function (item) {return item[2];}),
    },{
      markPoint: {
        data: strfilter[3]
      },
      data: emoData.map(function (item) {return item[3];}),
    },{
      markPoint: {
        data: strfilter[4]
      },
      data: emoData.map(function (item) {return item[4];}),
    },{
      markPoint: {
        data: strfilter[5]
      },
      data: emoData.map(function (item) {return item[5];}),
    },{
      markPoint: {
        data: strfilter[6]
      },
      data: emoData.map(function (item) {return item[6];}),
    },{
      markPoint: {
        data: strfilter[7]
      },
      data: emoData.map(function (item) {return item[7];}),
    },{
      markPoint: {
        data: strfilter[8]
      },
      data: emoData.map(function (item) {return item[8];}),
    },{
      markPoint: {
        data: strfilter[9]
      },
      data: emoData.map(function (item) {return item[9];}),
    },
    ]//$this.emotionData.filter( val => val[7] > 80).map(function (item ) {return {coord: [$this.emotionData.indexOf(item),item[7]]}})

  };
  myChart.setOption(option);
}

function generateEmoCharts(data,dataAll,warnRuleInfo){

  let $this = this;
  let emodata = data.concat(dataAll);
  let myChart = echarts.init(document.getElementById('detail_chartVisual'));
  this.redrawChart(emodata,warnRuleInfo);
  var opt = myChart.getOption();
  var dz = opt.dataZoom[0];
  var tstart = dz.startValue//opt.xAxis[0].data[dz.startValue];
  var tend = dz.endValue//opt.xAxis[0].data[dz.endValue];
  myChart.setOption({
    dataZoom: [{
      startValue: 0,
      endValue: emodata.length
    }]
  })
  var url = myChart.getDataURL({
    pixelRatio: 4,
  });
  var blob = this.base64ToBlob(url)
  var href =  window.URL.createObjectURL(blob);
  var link = document.getElementById("download_charts");
  link.setAttribute("href",href);
  link.setAttribute("download", 'charts.png');
  myChart.setOption({
    dataZoom: [{
      startValue: dz.startValue,
      endValue: dz.endValue
    }]
  })
  this.redrawChart(emodata,warnRuleInfo);
}
onmessage = function (event) {
  //console.error(event)
  let result = [[],[]];
  //generateEmoCharts(event.data.data,event.data.dataAll,event.data.warnRuleInfo)
  result[0] = event.data.dateS.map(function (item) {return new Date(item).toLocaleTimeString('chinese',{hour12:false});});
  result[1] = event.data.hrtdateS.map(function (item) {return new Date(item).toLocaleTimeString('chinese',{hour12:false});});
  postMessage(result);
}
