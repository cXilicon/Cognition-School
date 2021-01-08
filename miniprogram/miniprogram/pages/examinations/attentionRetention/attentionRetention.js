/*
*   作者：张帅
*   完成日期：2020/11/8
*   attentionTest-3.js
*/


let timer = null
let subOp = null
let demoOp = {
    steps: null,
    controller: null,
}

const START = "START"
const DEMO = 'DEMO'
const EXECUTE = 'EXECUTE'
const AGAIN = 'AGAIN'


//获取应用实例
const app = getApp()  
import util from "../../../utils/util";
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';

//计时器初始化文件
let init;
Page({
  data:{
    examState: "",
    canInteraction: false,



    //页面显示参数
    timershow:"timer",
    selected:[],
    dis:false,
    //计时器参数
    demoShow:false,
    btnShow:"btn",
 
    //计时器参数
    second: 0,
    millisecond: 0,
    percent: 0,
    cost: 0,
    array : ['a', 'b', 'c', 'd', 'e', 
  'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 
  'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 
  'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],

    //游戏数据
    question:[],
  
    height:14,
    width:7,
    syn:20,
    datatemp:[],
    tips:0,
    entrance:'',
    lastScore: '',
    lastTimeCount: '',
    againState: false,
    demoState: false,
    ruleState: true,
    startCountDown: 3,
    startCountDownState: false,
   
  },


  onUnload() { // 页面退出 - 清空计时器
    clearInterval(init);
    this.stopDemo()
},


stopDemo: function () {
  clearTimeout(demoOp.controller)
  clearTimeout(init)
  clearTimeout(subOp)
  clearInterval(subOp)
  clearInterval(timer)

  this.setData({ruleState: true, startCountDownState: false,  demoShow: false})
  Toast.clear()
  this.setData({
      examState: START
  })

},

onLoad: function () { // 页面加载
    this.initGame();
    
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('entrance', data => {
        this.setData({
            entrance: data.entrance,
        })
        console.log(data)
    })

    this.setData({
      examState: START,
  })
   
},
initGame: function () { // 游戏初始化
  clearInterval(init);
  this.setData({ // 更新数据
    
      dis:false,
      demoState: false,
      question:[],
      datatemp:[],
      timershow:"timer",
      selected:[],
      second: 0,
      millisecond: 0,
      percent: 0,
      demoShow:false,
      ruleState: true,
  })

  var i;
  var questionTemp=[];
  var upper;
  var lower;


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
 var selectedtemp=[];
  for(var i=0;i<this.data.syn;i++){
    site=Math.floor(Math.random()*(this.data.height*this.data.width));
    while(this.data.array.indexOf(questionTemp[site].number[0])-this.data.array.indexOf(questionTemp[site].number[1])==26)
    {
      site=Math.floor(Math.random()*(this.data.height*this.data.width));
    }
    var fl=Math.floor(Math.random()*26+26);
    questionTemp[site].number=(this.data.array[fl]+this.data.array[fl-26]);
    selectedtemp.push(site);
  }

  this.setData({
    
    datatemp:questionTemp,
   selected:selectedtemp
});

},


exitExamination: function () {
  if(this.data.demoShow===false)
  wx.navigateBack()
},
 //测试开始
  testStart:function() {

    //随机生成数值并存入函数
   
        this.setData({
          againState: false,
          ruleState: false,
          startCountDown: 3,
          startCountDownState: true
      })
      let that=this;
      subOp = setInterval(() => {
          if (that.data.startCountDown - 1) {
              that.setData({
                  startCountDown: that.data.startCountDown - 1,
              });
          } else {
              that.setData({
                  startCountDownState: false,
                  question:that.data.datatemp,
                 
              });
              clearInterval(init);
              init = setInterval(that.timer, 1000);
              clearInterval(  subOp);
          }
      }, 1000);
        //开始计时
  },

//点击数字
clickNumber:function(e){
  //获取点击数值的结构体
  var index=e.currentTarget.dataset.click;
  
  //黑体数值则将背景变为橙色
  if(!this.data.dis){
    if(this.data.question[index].style!="numberText-active"){
      this.setData({
        [`question[${index}].style`] : "numberText-active",
      });
      
    }else{
      this.setData({
        [`question[${index}].style`] : "numberText",
      });

    }
  }
  
  },

  testSubmit:function(){

      var score=0;
      for(var i=0;i<this.data.question.length;i++){
        if(this.data.question[i].style=="numberText-active")
        {
          if(this.data.array.indexOf(this.data.question[i].number[0])-this.data.array.indexOf(this.data.question[i].number[1])==26){
              score+=5;
          }else{
              score-=5;
          }
        }
      }

      if(score<0)
      {
        score=0;
      }
      
      this.setData({
          tips:score,
        
      });
    
    
    this.setData({
       dis:true,
    });
    var that=this;
    var finMessage="";
    var score='';
    if(this.data.tips>=90){
        finMessage= '本次得分:'+that.data.tips+'\n你所向披靡！';
        score="A";
    }else  if(this.data.tips>=70){ 
        finMessage ='本次得分:'+that.data.tips+'\n你真棒！';
        score="B";
    }else  if(this.data.tips>=50){ 
      finMessage='本次得分:'+that.data.tips+'\n做的不错！';
      score="C";
    }else  if(this.data.tips>=30){ 
      finMessage= '本次得分:'+that.data.tips+'\n再接再厉！';
      score="D";
    }else{
      finMessage= '本次得分:'+that.data.tips+'\n继续努力！';
      score="F";
    }


    Toast.success({
      message: finMessage,
      forbidClick: true,
      onClose: () => {

        if (that.data.entrance === 'exam') {
          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 2];
          prevPage.setData({
              ['examinations[3].score']: score
          })
         wx.navigateBack()
        }else{
          that.initGame()
          that.setData({
              ruleState:false,
              againState: true,
              lastScore: score,
              lastTimeCount: that.data.tips
          })
        }
    }})
    },

    timer: function () {
      const targetTime = 60 * 10;
      let percent =100 *  (this.data.millisecond   + 10) / targetTime
      this.setData({
          millisecond: this.data.millisecond + 10,
          percent: percent
      })
    
    
      if (this.data.millisecond  >= targetTime) {
          clearInterval(init);
          this.testSubmit();
      }
    },



  // 查看演示
 viewDemo: function () {

  let that = this;
  var index=this.data.selected;
  var index2=0;

  this.setData({
    ruleState: false,
    dis:true,
    demoShow:true,
})
clearTimeout(subOp)
clearInterval(subOp)
this.setData({
    examState: DEMO,
})
 

  for(var i=0;i<that.data.datatemp.length;i++){
    if(that.data.array.indexOf(that.data.datatemp[i].number[0])-that.data.array.indexOf(that.data.datatemp[i].number[1])!=26){
          index2=i;
          break;
    }
  }


  demoOp.steps = [{
    func: () => {
      Toast('等待提示结束后开始测试');
      setTimeout(() => {
        this.testStart();
   
      }, 2000)
  },
  playtime: 6000
}, {
  func: () => {
      
    Toast('点击一个相同字母大小写组合的方块,例如: '+this.data.question[index[0]].number);
},
playtime: 2000


},{
  func: () => {
         
    that.setData({
      [`question[${index[0]}].style`] : "numberText-tips",
    })
    setTimeout(() => {
            that.setData({
              [`question[${index[0]}].style`] : "numberText",
            })
        }
        , 400
    )
},
playtime: 800
}, {
  func: () => {
         
    that.setData({
      [`question[${index[0]}].style`] : "numberText-tips",
    })
    setTimeout(() => {
            that.setData({
              [`question[${index[0]}].style`] : "numberText",
            })
        }
        , 400
    )
},
playtime: 800
}, {
  func: () => {
    that.setData({
      [`question[${index[0]}].style`] : "numberText-active",
    })
  },
  playtime: 1000
},{
  func: () => {
    Toast('当你选择的一个不想选中的方块');
},
playtime: 2000
}, {
  func: () => {
    that.setData({
      [`question[${index2}].style`] : "numberText-active",
      })
  },
  playtime: 1000
}, {
  func: () => {
    Toast('再次点击取消选中');
},
playtime: 2000
}, {
    func: () => {
        that.setData({
            [`question[${index2}].style`]: "numberText-tips",
        })
        setTimeout(() => {
                that.setData({
                    [`question[${index2}].style`]: "numberText",
                })
            }, 400
        )
    },
    playtime: 800
}, {
  func: () => {
    that.setData({
      [`question[${index2}].style`] : "numberText",
      })
  },
  playtime: 1000
},{
  func: () => {
    Toast('点击所有相同字母大小写组合的方块');
},
playtime: 2000
} ,{
  func: () => {
   
    timer=setInterval(() => {

        var click=index[i];
          that.setData({
            [`question[${click}].style`] : "numberText-active",
            })
            if(i==19)
            {
              clearInterval(timer)
              
            }
            i++;
    }, 500)
   
},
playtime: 10000
}, {
  func: () => {
    Toast('选出所有符合条件的方块后提交你的答案');
},
playtime: 2000
},{
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
},{
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
},{
  func: () => {
    Toast('你必须在规定的时间内完成测试');
},
playtime: 2000
},{
  func: () => {
    that.setData({
      timershow : "timer-tips",
    })
      setTimeout(() => {
        that.setData({
          timershow : "timer",
          })
          }, 400
      )
  },
  playtime: 800
},{
  func: () => {
    that.setData({
      timershow : "timer-tips",
    })
      setTimeout(() => {
        that.setData({
          timershow : "timer",
          })
          }, 400
      )
  },
  playtime: 800
},{
  func: () => {
    Toast('当时间归0，系统将自动提交你的选择');
 
},
playtime: 3000
},{
  func: () => {
    
    Toast.success({
      message: '演示完成！',
      forbidClick: true,
      onClose: () => {
        this.initGame();
      }
      
  });
  },
  playtime: 2000
},]
util.syncOperation(demoOp)


},



  
})


