
;(function(window, factory) {
  //amd
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') { //umd commonjs
    module.exports = factory();
  } else {
    window['myModulefunction'] = factory();
  }
})(this, function() {

  var doc = document, win = window;
  var myModulefunction = function()
  {
    console.log('myModuleLoaded');
  }
  myModulefunction.setupVideo = function(ele){
    var videoele = document.createElement('video');
    videoele.controls = true ;
    videoele.id="video_source" ;
    videoele.className="video-js" ;
    videoele.height=300  ;
    videoele.preload="auto";
    ele.appendChild(videoele);
    var myPlayer = videojs('video_source',{sources: {
        src: '',
        type: 'video/mp4'
      },
    });
    return myPlayer;
  }
  myModulefunction.gettype = function () {
    return console.log(typeof myModulefunction);
  }
  myModulefunction.on = function (elem,fun) {
    /*let event = new CustomEvent('build', { 'detail': 'fckup' });
    elem.dispatchEvent(event);*/
    elem.removeEventListener('msg', fun, false);
    elem.addEventListener('msg', fun, false);
  }
  myModulefunction.initaudio = function (ele) {
    var audio = new window.AudioContext();
    //直接从audio处理音频源，声明一些必要的变量
    var context1;
    var source;
    var audiosource
    var analyserfa;
    var canvasFormAudio;
    var ctxfa;
    var frame = 10;
    var gap = 10;
//初始化画布
    audiosource = document.createElement('audio')//document.getElementById('canvasFormAudio');
    audiosource.src = 'https://wavesurfer-js.org/example/split-channels/stereo.mp3';//'https://wavesurfer-js.org/example/split-channels/stereo.mp3'//'http://192.168.16.122:8096/audio001.mp3';
    audiosource.id = 'audio';
    audiosource.controls = 'controls';
    audiosource.autoplay = 'autoplay';
    audiosource.crossOrigin = 'anonymous';
    canvasFormAudio = document.createElement('canvas')
    canvasFormAudio.width = ele.offsetWidth;
    canvasFormAudio.height = 200;
    canvasFormAudio.id = 'canvasFormAudio'
    ele.appendChild(audiosource)
    ele.appendChild(canvasFormAudio)

    ctxfa = canvasFormAudio.getContext("2d");//建立一个音频环境，因为浏览器实现不同，做了一点兼容性处理
    context1 = new window.AudioContext
//建立一个分析器
    analyserfa=context1.createAnalyser();
    var audio = audiosource;
    var source = context1.createMediaElementSource(audio);
    var gainNode = context1.createGain();
    source.connect(analyserfa);
    analyserfa.connect(context1.destination);
    //gainNode.gain.value = 0.2;
    source.connect(gainNode);
    gainNode.connect(context1.destination);
    //setInterval(()=>{drawSpectrumfa();},500)
    window.addEventListener('load', function(e) {
      // 从audio标签获取声音源 source
      //调用绘图函数

      drawSpectrumfa();
    }, false);　　　　　　
    //绘图函数
    function drawSpectrumfa() {
      canvasFormAudio.width = ele.offsetWidth;
      var WIDTH = canvasFormAudio.width;
      var HEIGHT= canvasFormAudio.height;
      console.log(audiosource.paused)
      if(audiosource.paused ){
        requestAnimationFrame(drawSpectrumfa)
        gap = frame;
        return;}
      if(gap < frame){
        gap++;
        requestAnimationFrame(drawSpectrumfa)
        return;
        }
      analyserfa.fftSize = 128;
      var bufferLength = analyserfa.frequencyBinCount;
      console.log(bufferLength);
      var array = new Uint8Array( analyserfa.frequencyBinCount);

      //复制当前的频率值到一个无符号数组中
      analyserfa.getByteFrequencyData(array);
      //analyserfa.getFloatTimeDomainData(array)
      console.log('draw')
      //clearRect(矩形左上角x坐标，矩形左上角y坐标，清除矩形的宽，清除矩形的高)
      ctxfa.clearRect(0, 0, WIDTH, HEIGHT);
      var gapp = WIDTH / (array.length*2);
      ctxfa.fillStyle = 'white';
      //循环生成长条矩形
      for ( var i = 0; i < (array.length); i++ ){
        var value = Math.max(HEIGHT*array[i]/255,1);
        //fillRect(矩形左上角x坐标，矩形左上角y坐标，矩形宽，矩形高)<br>　　　　　　　　　//这里我们的array一共有128组数据，所以我们当时canvas设置的宽度为5*128=640
        ctxfa.fillRect((i+bufferLength)*gapp,(HEIGHT-value)/2,gapp*0.8,value);
        ctxfa.fillRect((bufferLength - i)*gapp,(HEIGHT-value)/2,gapp*0.8,value);
      }
      //根据浏览器频率绘图或者操作一些非css效果
      gap = 0;
      requestAnimationFrame(drawSpectrumfa)
    }
  }
  myModulefunction.inittimeaudio = function (ele) {
    var audio = new window.AudioContext();
    //直接从audio处理音频源，声明一些必要的变量
    var context1;
    var audiosource
    var analyserfa;
    var canvasFormAudio;
    var ctxfa;
    var frame = 1;
    var gap = 1;
    var animation;
    var datastor = [];
//初始化画布
    audiosource = document.createElement('audio')//document.getElementById('canvasFormAudio');
    audiosource.src = 'https://wavesurfer-js.org/example/split-channels/stereo.mp3';//'https://wavesurfer-js.org/example/split-channels/stereo.mp3'//'http://192.168.16.122:8096/audio001.mp3';
    audiosource.id = 'audio';
    audiosource.controls = 'controls';
    audiosource.autoplay = 'autoplay';
    audiosource.crossOrigin = 'anonymous';
    audiosource.addEventListener('pause',()=>{
      console.error('pause')
      console.log(animation)
      window.cancelAnimationFrame(animation);
    },false)
    audiosource.addEventListener('play',()=>{
      animation = requestAnimationFrame(drawSpectrumfa);
    },false)

    canvasFormAudio = document.createElement('canvas')
    canvasFormAudio.width = ele.offsetWidth;
    canvasFormAudio.height = 200;
    canvasFormAudio.id = 'canvasFormAudio'
    ele.appendChild(audiosource)
    ele.appendChild(canvasFormAudio)

    ctxfa = canvasFormAudio.getContext("2d");//建立一个音频环境，因为浏览器实现不同，做了一点兼容性处理
    context1 = new window.AudioContext
//建立一个分析器
    analyserfa=context1.createAnalyser();
    var audio = audiosource;
    var source = context1.createMediaElementSource(audio);
    var gainNode = context1.createGain();
    source.connect(analyserfa);
    analyserfa.connect(context1.destination);
    //gainNode.gain.value = 0.2;
    source.connect(gainNode);
    gainNode.connect(context1.destination);
    //setInterval(()=>{drawSpectrumfa();},500)
    window.addEventListener('load', function(e) {
      // 从audio标签获取声音源 source
      //调用绘图函数

      drawSpectrumfa();
    }, false);
    //绘图函数
    function drawSpectrumfa() {
      console.log(audiosource.paused)
      if(audiosource.paused ){
        window.cancelAnimationFrame(animation);
        gap = frame;
        return;
      }
      if(gap < frame){
        gap++;
        animation = requestAnimationFrame(drawSpectrumfa)
        console.log(animation)
        return;
      }
      canvasFormAudio.width = ele.offsetWidth;
      var WIDTH = canvasFormAudio.width;
      var HEIGHT= canvasFormAudio.height;
      analyserfa.fftSize = 128;
      var bufferLength = analyserfa.fftSize;
      //console.log(bufferLength);
      var array = new Float32Array( bufferLength);
      //复制当前的频率值到一个无符号数组中
      analyserfa.getFloatTimeDomainData(array);
      //analyserfa.getFloatTimeDomainData(array)
      var datalength = 128
      datastor.push(array.sort((a,b)=>b-a)[0])
      console.log(array.sort((a,b)=>b-a)[0])
      if(datastor.length>datalength)
        datastor.shift();
      //clearRect(矩形左上角x坐标，矩形左上角y坐标，清除矩形的宽，清除矩形的高)
      ctxfa.clearRect(0, 0, WIDTH, HEIGHT);
      var gapp = WIDTH / (datalength*2);
      ctxfa.fillStyle = 'black';
      //循环生成长条矩形
      for ( var i = 0; i < (datastor.length); i++ ){
        var value = Math.max(HEIGHT*datastor[i],1);
        //fillRect(矩形左上角x坐标，矩形左上角y坐标，矩形宽，矩形高)<br>　　　　　　　　　//这里我们的array一共有128组数据，所以我们当时canvas设置的宽度为5*128=640
        ctxfa.fillRect((i)*gapp*2,(HEIGHT-value)/2,gapp*0.8*2,value);
        //ctxfa.fillRect((i+bufferLength)*gapp,(HEIGHT-value)/2,gapp*0.8,value);
        //ctxfa.fillRect((bufferLength - i)*gapp,(HEIGHT-value)/2,gapp*0.8,value);
      }
      //根据浏览器频率绘图或者操作一些非css效果
      gap = 0;
      //audiosource.pause();
      animation = requestAnimationFrame(drawSpectrumfa)
      console.log(animation)
    }
  }
  var animation;
  var context1;

  myModulefunction.initCustomAudio = function(audiosource,length){
    if(context1!=null&&context1!=undefined){
      context1.close().then(()=>{
        console.log('close')
        myModulefunction.CustomAudio(audiosource,length);
      })
    }
    else{
      myModulefunction.CustomAudio(audiosource,length);
    }
  }
  myModulefunction.CustomAudio = function(elem,audiosource,length,frames){
    //直接从audio处理音频源，声明一些必要的变量

    var frame = frames;
    var gap = frames;
    var audio = audiosource;
    var source;
    var gainNode;
    var analyserfa;
    audiosource.crossOrigin = 'anonymous';
    window.cancelAnimationFrame(animation);
    audiosource.removeEventListener('pause',()=>{
      console.error('pause')
      console.log(animation)
      window.cancelAnimationFrame(animation);
    },false)
    audiosource.removeEventListener('play',()=>{
      animation = requestAnimationFrame(drawSpectrumfa);
    },false)


    context1 = new window.AudioContext
//建立一个分析器
    analyserfa=context1.createAnalyser();
    source= context1.createMediaElementSource(audio);
    gainNode = context1.createGain();
    source.connect(analyserfa);
    analyserfa.connect(context1.destination);
    //gainNode.gain.value = 0.2;
    source.connect(gainNode);
    gainNode.connect(context1.destination);
    //setInterval(()=>{drawSpectrumfa();},500)
    window.addEventListener('load', function(e) {
      // 从audio标签获取声音源 source
      //调用绘图函数
      drawSpectrumfa();
    }, false);
    audiosource.addEventListener('pause',()=>{
      console.error('pause')
      console.log(animation)
      window.cancelAnimationFrame(animation);
    },false)
    audiosource.addEventListener('play',()=>{
      animation = requestAnimationFrame(drawSpectrumfa);
    },false)


    //绘图函数
    function drawSpectrumfa() {
      if(audiosource.paused ){
        window.cancelAnimationFrame(animation);
        gap = frame;
        return;
      }
      if(gap < frame){
        gap++;
        animation = requestAnimationFrame(drawSpectrumfa)
        //console.log(animation)
        return;
      }
      analyserfa.fftSize = length;
      var bufferLength = analyserfa.fftSize;
      //console.log(bufferLength);
      var array = new Float32Array( bufferLength);
      //复制当前的频率值到一个无符号数组中
      analyserfa.getFloatTimeDomainData(array);
      //analyserfa.getFloatTimeDomainData(array)
      var msgsort = array.sort((a,b)=>b-a)
      var msgmax = Math.abs(msgsort[0])
      var msgmin = -Math.abs(msgsort[msgsort.length-1])
      let event = new CustomEvent('msg', { 'detail':[msgmax,msgmin] });
      elem.dispatchEvent(event);
      /*datastor.push(array.sort((a,b)=>b-a)[0])
      console.log(array.sort((a,b)=>b-a)[0])
      if(datastor.length>datalength)
        datastor.shift();*/
      //根据浏览器频率绘图或者操作一些非css效果
      gap = 0;
      //audiosource.pause();
      animation = requestAnimationFrame(drawSpectrumfa)
      //console.log(animation)
    }
  }
  return myModulefunction;
});
