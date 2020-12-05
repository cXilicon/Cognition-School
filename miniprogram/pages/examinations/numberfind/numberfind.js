/*
*   作者：张帅
*   完成日期：2020/11/8
*   attentionTest-3.js
*/

//获取应用实例
const app = getApp()  
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';
//计时器初始化文件
var intt;
Page({
  data:{
    //页面显示参数
    timershow:"timer",
    selected:[],
    dis:false,
    //计时器参数
  
    btnShow:"btn",
   
    timecount: 90,
    cost: 0,
    flag: 1,
    endtime: "",

    array : ['a', 'b', 'c', 'd', 'e', 
  'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 
  'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 
  'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],

    //游戏数据
    question:[],
  
    height:14,
    width:7,
    syn:10,

    tips:0,

    demoState: false,
    ruleState: true,
    startCountDown: 3,
    startCountDownState: false,
   
  },


onLoad: function () { // 页面加载
    this.initGame();
},
initGame: function () { // 游戏初始化
  this.stop();
  this.setData({ // 更新数据
      ruleState: true,
      dis:false,
      demoState: false,
      question:[],
      timershow:"timer",
      selected:[],
      timecount: 90,
  })
 
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
        style:"numberText"
      }
      questionTemp.push(temp);
      
     
    }
    var site=0;
   
    for(var i=0;i<this.data.syn;i++){
      site=Math.floor(Math.random()*(this.data.height*this.data.width));
      while(this.data.array.indexOf(questionTemp[site].number[0])-this.data.array.indexOf(questionTemp[site].number[1])==26)
      {
        site=Math.floor(Math.random()*(this.data.height*this.data.width));
      }
      var fl=Math.floor(Math.random()*26+26);
      questionTemp[site].number=(this.data.array[fl]+this.data.array[fl-26]);
    }

        this.setData({
          ruleState: false,
          startCountDown: 3,
          startCountDownState: true
      })
      var that=this;
      const countdown = setInterval(() => {
          if (that.data.startCountDown - 1) {
              that.setData({
                  startCountDown: that.data.startCountDown - 1,
              });
          } else {
              that.setData({
                  startCountDownState: false,
                  question:questionTemp,
                 
              });
              clearInterval(countdown);
              this.start();  
          }
      }, 1000);
        //开始计时
  },

//点击数字
clickNumber:function(e){
  //获取点击数值的结构体
  var index=e.currentTarget.dataset.click;
  var selectedTemp=this.data.selected;
  //黑体数值则将背景变为橙色
  if(!this.data.dis){
    if(this.data.question[index].style!="numberText-active"){
      this.setData({
        [`question[${index}].style`] : "numberText-active",
      });
      selectedTemp.push(index);
    }else{
      this.setData({
        [`question[${index}].style`] : "numberText",
      });
      selectedTemp.splice(selectedTemp.indexOf(index),1);
  
      this.setData({
       selected:selectedTemp
      });
    }
  }
  
  },
  //判断是否全部点击完毕，完毕则停止
  testSubmit:function(){
    var selectedTemp=this.data.selected;
   
      var score=0;
      for(var i=0;i<selectedTemp.length;i++){
        if(this.data.array.indexOf(this.data.question[selectedTemp[i]].number[0])-this.data.array.indexOf(this.data.question[selectedTemp[i]].number[1])==26){
            score+=10;

        }else{
          score-=10;
          
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
    this.setData({
       dis:true,
    });
    var that=this;
    var finMessage="";
    if(this.data.tip>=90)
    {
        finMessage= '你获得了'+that.data.tips+'分!你所向披靡！';
    }else  if(this.data.tip>=70)
    { 
        finMessage ='你获得了'+that.data.tips+'分!太棒了！';
    }else  if(this.data.tip>=50)
    { 
      finMessage='你获得了'+that.data.tips+'分!做的不错！';
    }else  if(this.data.tip>=30)
    { 
      finMessage= '你获得了'+that.data.tips+'分!再接再厉！';
    }else 
    { 
      finMessage= '你获得了'+that.data.tips+'分!继续努力！';
    }


    Toast.success({
      message: finMessage,
      forbidClick: true,
      onClose: () => {
        this.initGame();
    }})



    },

//开始计时
  start:function () {
    var that = this;
    //停止（暂停）
    clearInterval(intt);
    //时间重置
    that.setData({
        timecount:90
    })
    intt = setInterval(function () { that.timer() }, 1000);
  },
  //暂停计时
  stop: function () {
    clearInterval(intt);
  },
  
  //计时运行程序
  timer: function () {
    this.setData({
      timecount:this.data.timecount-1
  })
  if(this.data.timecount==10){
    this.setData({
      timershow:"timer-active"
  })
  }
    if(this.data.timecount==0){
      this.testSubmit()
    }
  },




  // 查看演示
 viewDemo: function () {
  let that = this;
  var index=0;
  var index2=0;

  this.setData({
      ruleState: false,
      dis:true
  })
  let step0 = {
      func: () => {
          Toast('等待提示结束后开始测试');
          setTimeout(() => {
            this.testStart();
       
          }, 2000)
      },
      playtime: 5000
  }
  let step1 = {
    
      func: () => {
      
          Toast('点击一个相同字母大小写组合的方块,例如: Aa');
      },
      playtime: 2000
  }

  let stepSelect={
    func:()=>{
      for(var i=0;i<that.data.question.length;i++){
        if(that.data.array.indexOf(this.data.question[i].number[0])-that.data.array.indexOf(this.data.question[i].number[1])==26){
              index=i;
              break;
        }
      }
    
      for(var i=0;i<that.data.question.length;i++){
        if(that.data.array.indexOf(that.data.question[i].number[0])-that.data.array.indexOf(that.data.question[i].number[1])!=26){
              index2=i;
              break;
        }
      }
    
    }
  }
  let step2 = {
      func: () => {

          that.setData({
            [`question[${index}].style`] : "numberText-tips",
          })
          setTimeout(() => {
                  that.setData({
                    [`question[${index}].style`] : "numberText",
                  })
              }
              , 400
          )
      },
      playtime: 800
  }
  let step3 = {
      func: () => {
        that.setData({
          [`question[${index}].style`] : "numberText-active",
        })
      },
      playtime: 1000
  }
  
  let step4 = {
      func: () => {
          Toast('当你选择的一个不想选中的方块');
      },
      playtime: 2000
  }
  let step5 = {
    func: () => {
      that.setData({
        [`question[${index2}].style`] : "numberText-active",
        })
    },
    playtime: 1000
  }

  let step6 = {
    func: () => {
        Toast('再次点击取消选中');
    },
    playtime: 2000
}
  let step7 = {
    func: () => {
      that.setData({
        [`question[${index2}].style`] : "numberText-tips",
      })
        setTimeout(() => {
          that.setData({
            [`question[${index2}].style`] : "numberText-active",
            })
            }, 400
        )
    },
    playtime: 800
}

let step8 = {
  func: () => {
    that.setData({
      [`question[${index2}].style`] : "numberText",
      })
  },
  playtime: 1000
}

let step9 = {
  func: () => {
      Toast('点击所有相同字母大小写组合的方块');
  },
  playtime: 2000
}

let step10 = {
  func: () => {
    var sum=0;
    let time=setInterval(() => {
      for(var i=index+1;i<that.data.question.length;i++){
        if(that.data.array.indexOf(this.data.question[i].number[0])-that.data.array.indexOf(this.data.question[i].number[1])==26){
          that.setData({
            [`question[${i}].style`] : "numberText-active",
            })
            index=i;
            sum++;
            break;
        }

        if(sum==9){
          clearInterval(time);
        }
      }
    }, 300)
},
playtime: 3000
}
let step11 = {
  func: () => {
      Toast('选出所有符合条件的方块后提交你的答案');
  },
  playtime: 2000
}

let step12 = {
  func: () => {
    that.setData({
      btnShow : "btn-tips",
    })
      setTimeout(() => {
        that.setData({
          btnShow : "btn",
          })
          }, 400
      )
  },
  playtime: 800
}

let step13 = {
  func: () => {
      Toast('你必须在规定的时间内完成测试');
  },
  playtime: 2000
}

let step14 = {
  func: () => {
    that.setData({
      timershow : "timer-active",
    })
      setTimeout(() => {
        that.setData({
          timershow : "timer",
          })
          }, 400
      )
  },
  playtime: 800
}

let step15 = {
  func: () => {
      Toast('当时间归0，系统将自动提交你的选择');
      that.setData({
        timecount:4,
        timershow:"timer-active"
        })
  },
  playtime: 3000
}


let step16 = {
  func: () => {
    that.setData({
      timecount:0,
      
      })
      this.stop();
    Toast.success({
      message: '演示完成！',
      forbidClick: true,
      onClose: () => {
        this.initGame();
      }
      
  });
  },
  playtime: 2000
}





  let stepIdx = 0
  let steps = [step0, step1,stepSelect, step2,step2,  step3, step4, step5, step5, step6, step7, step8,step9,step10,step11,step12,step12,step13,step14,step14,step15,step16]
  setTimeout(function play() {
      if (stepIdx < steps.length) {
          steps[stepIdx].func()
          setTimeout(play, steps[stepIdx++].playtime);
      }
  }, 0);
  

},



  
})


