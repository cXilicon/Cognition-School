/*
*   作者：张帅
*   完成日期：2020/11/8
*   attentionTest-3.js
*/

//获取应用实例
const app = getApp()  
//计时器初始化文件
var intt;
Page({
  data:{
    //页面显示参数
    showButton:true,
    showTable:false,
    selected:[],
    dis:false,
    //计时器参数
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    timecount: '00:00:00',
    cost: 0,
    flag: 1,
    endtime: "",

    array : ['a', 'b', 'c', 'd', 'e', 
  'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 
  'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 
  'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],

    //游戏数据
    question:[],
    indexq:0,
    height:3,
    width:4,
    syn:1,
    
    tips:0,
   
  },

 //测试开始
  testStart:function() {

    var i;
    var questionTemp=[];
    var upper;
    var lower;
  

    //随机生成数值并存入函数
    for(i=0;i<this.data.height*this.data.width;i++){
      var flag=0;
      while(flag==0){
          upper=Math.floor(Math.random()*26+26);
          lower=Math.floor(Math.random()*26);
          if(upper-lower!=26){
            flag=1;
          }
      }
      var temp={
        number:this.data.array[upper]+this.data.array[lower],
        font:400,
        color:"white"
      }
      questionTemp.push(temp);

     
    }
    var site=0;
   
    for(var i=0;i<this.data.syn*2;i++){
      site=Math.floor(Math.random()*(this.data.height*this.data.width));
      while(this.data.array.indexOf(questionTemp[site].number[0])-this.data.array.indexOf(questionTemp[site].number[1])==26)
      {
        site=Math.floor(Math.random()*(this.data.height*this.data.width));
      }
      var fl=Math.floor(Math.random()*26+26);
      questionTemp[site].number=(this.data.array[fl]+this.data.array[fl-26]);
    }

      this.setData({
          question:questionTemp
      })
        this.setData({
          showButton:false,
          showTable:true
        });
        //开始计时
        this.start();  
  },

//点击数字
clickNumber:function(e){
  //获取点击数值的结构体
  var index=e.currentTarget.dataset.click;
  var selectedTemp=this.data.selected;
  //黑体数值则将背景变为橙色
  if(this.data.question[index].color!="orange"){
    this.setData({
      [`question[${index}].color`] : "orange",
    });
    selectedTemp.push(index);
  }else{
    this.setData({
      [`question[${index}].color`] : "white",
    });
    selectedTemp.splice(selectedTemp.indexOf(index),1);

    this.setData({
     selected:selectedTemp
    });
  }
  },
  //判断是否全部点击完毕，完毕则停止
  testSubmit:function(){
    var selectedTemp=this.data.selected;
   
      var score=0;
      for(var i=0;i<selectedTemp.length;i++){
        if(this.data.array.indexOf(this.data.question[selectedTemp[i]].number[0])-this.data.array.indexOf(this.data.question[selectedTemp[i]].number[1])==26){
            score+=5;

        }else{
          score-=5;
          
        }
      }
      if(score<0)
      {
        score=0;
      }
      
      this.setData({
          tips:this.data.tips+score,
        
      });
    
 this.stop();
  var that=this;

  this.setData({
      dis:true,
   });
  if(this.data.indexq!=3)
  {
    setTimeout(function () {
      that.setData({
       
        indexq:that.data.indexq+1,
        height:that.data.height+1,
        width:that.data.width+1,
        syn:that.data.syn+1,
        selected:[],
        dis:false
      });
    that.testStart();
     }, 3000) //延迟时间 这里是1秒
  }


  },
//开始计时
  start:function () {
    var that = this;
    //停止（暂停）
    clearInterval(intt);
    //时间重置
    that.setData({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    })
    intt = setInterval(function () { that.timer() }, 50);
  },
  //暂停计时
  stop: function () {
    clearInterval(intt);
  },
  
  //计时运行程序
  timer: function () {
    var that = this;
    that.setData({
      millisecond: that.data.millisecond + 5
    })
    if (that.data.millisecond >= 100) {
      that.setData({
        millisecond: 0,
        second: that.data.second + 1
      })
    }
    if (that.data.second >= 60) {
      that.setData({
        second: 0,
        minute: that.data.minute + 1
      })
    }
 
    if (that.data.minute >= 60) {
      that.setData({
        minute: 0,
        hour: that.data.hour + 1
      })
    }
    that.setData({
      timecount: that.data.hour + ":" + that.data.minute + ":" + that.data.second + ":" + that.data.millisecond
    })
  },


  
})


