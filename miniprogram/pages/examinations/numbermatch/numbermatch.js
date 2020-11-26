/*
*   作者：张帅
*   完成日期：2020/11/1
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
    selectedNumber:0,
    first:0,
    first:0,
   

    //计时器参数
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    timecount: '00:00:00',
    cost: 0,
    flag: 1,
    endtime: "",

    //游戏数据
    question:[],
   

    //点击
    index:[-1,-1,-1,-1,-1,-1,-1,-1],
    fin:[-1,-1,-1,-1,-1,-1,-1,-1],
   
    width:5,
    height:3,
    indexq:0
  },

 //测试开始
  testStart:function() {
    var i,j;


  
      //随机生成数值并存入函数
    var allnumber=[];
    for(i=0;i<this.data.height;i++){
     
      var numberTemp=[];
        for(j=0;j<this.data.width;)
        {
          var newnumber=Math.floor(Math.random()*(Math.pow(10,this.data.indexq+1)-Math.pow(10,this.data.indexq))+Math.pow(10,this.data.indexq));
          if(numberTemp.indexOf(newnumber)==-1){
            numberTemp.push(newnumber);
            j++;
          }

        }
        var a=Math.floor(Math.random()*this.data.width);
        var b=Math.floor(Math.random()*this.data.width);
        while(Math.abs(a-b<=1))
        {
           a=Math.floor(Math.random()*this.data.width);
           b=Math.floor(Math.random()*this.data.width);
        }
        numberTemp[a]= numberTemp[b];
        var numberobj=[];
        for(j=0;j<this.data.width;j++)
        {
          var t={
              number: numberTemp[j],
              font:400,
              color:"white"
          };
          numberobj.push(t);
        }
        allnumber.push(numberobj);
      }
  
      this.setData({
        question:allnumber
      })
 
     this.setData({
       question:allnumber
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
  var index1=e.currentTarget.dataset.click1;
  var index2=e.currentTarget.dataset.click2;

  var selected=this.data.selectedNumber;
  if(this.data.fin[index1]==-1)
  {
    if(this.data.question[index1][index2].color=="white")
    {

      if(this.data.index[index1]==-1)
      {
        this.setData({
          [`question[${index1}][${index2}].color`] : "orange",
          [`index[${index1}]`]:index2
      });
      }
      else
      {
        if(this.data.question[index1][index2].number!=this.data.question[index1][this.data.index[index1]].number)
        {

          this.setData({
            [`question[${index1}][${this.data.index[index1]}].color`] : "white",
            [`index[${index1}]`]:-1,
          });
        }
        else{
          this.setData({
            [`question[${index1}][${index2}].color`] : "orange",
            [`index[${index1}]`]:-1,
            [`fin[${index1}]`]:1,
            selectedNumber:selected+1
          });
        }
    }
    }else{
      this.setData({
        [`question[${index1}][${index2}].color`] : "white",
        [`index[${index1}]`]:-1,
      });
    }
  }
  //判断是否全部点击完毕，完毕则停止
  if(this.data.selectedNumber==this.data.height){

        if(this.data.indexq==5)
        {
            this.stop();
        }else{

          var newindex=[-1,-1,-1,-1,-1,-1,-1,-1];
          var newfin=[-1,-1,-1,-1,-1,-1,-1,-1];
          this.setData({
            indexq:this.data.indexq+1,
            height:this.data.height+1,
            index:newindex,
            fin:newfin,
            selectedNumber:0
          })

          this.testStart();
        }
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

