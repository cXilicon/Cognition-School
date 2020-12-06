//index.js
//获取应用实例
const app = getApp()
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';

var timer;
Page({
  data:{

    ruleState: true,

    show:false,
    showq:false,
    showbu:true,
  
    dis:false,
  
    alltext:["红色","蓝色","紫色","绿色","橙色","黄色","棕色","白色","黑色","灰色"],
    allcolor:["#FF0000","#1E90FF","#8B008B","#00FF00","#FF8C00","#FFFF00","#A0522D","#FFFFFF","#000000","#A9A9A9"],
    allq:["之前出现的文字是什么？","之前出现的文字是什么颜色？"],
    text:[],
    color:[],
    q:'',
    choose:[],
    true:0,
    indexq:0,
    right:0,

    inshow:"in",
    totalProgressTime:5,
    progressWidth:0,
    progressTime:5,

   

  },

 playbtn() {
    let that = this;
    clearInterval(timer);
     timer = setInterval(that.run, 25); //that.timer关键点
   },
   run(){
    let that = this;
    let totalProgressTime = that.data.totalProgressTime; 
    let progressWidth = that.data.progressWidth; 
    let progressTime=that.data.progressTime;
   
    if (progressWidth === 100) {
    
    if(!that.data.showq)
    {
        clearInterval(timer);
        that.setData({
        progressWidth: 0, 
        progressTime: totalProgressTime+3,
        totalProgressTime:totalProgressTime+3,
        show:false,
        showq:true
      })
      this.playbtn()
    }else{
      clearInterval(timer);
      this.setData({
        dis:true,
       });

       var msg="";
       if(that.data.indexq==0){
         msg="注意时间哦！"
       }else  if(that.data.indexq==1){
         msg="难度提升了!注意时间哦！"
       }else  if(that.data.indexq==2){
        msg="注意时间哦！"
       }else  if(that.data.indexq==3){
        msg="难度提升了!注意时间哦！"
       }else  {
         msg="测试完成！你的得分是"+(this.data.right*20)
       }
       Toast({
         message:msg,
       
         onClose: () => {
           if(that.data.indexq<4){
           that.setData({
             show:false,
             showq:false,
           
             dis:false,
             ask:"",
             indexq:that.data.indexq+1
           });
           that.testStart();
         }else{
           var score="";
          if(this.data.right==5){
            score="A"
          }else  if(this.data.right==4){
            score="B"
          }else  if(this.data.right==3){
            score="C"
          }else  if(this.data.right==2){
            score="D"
          }else{
            score="E"
          }
          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 2];
          prevPage.setData({
              ['examinations[2].score']: score
          })
          wx.navigateBack()
         }
         
       }
     })
     

    }
     return;
    }
    progressTime--;
    progressWidth = (totalProgressTime - progressTime) * (100 / (totalProgressTime*40))
    that.setData({
     progressWidth: progressWidth,
     progressTime: progressTime
    })
   },

  onLoad: function () { // 页面加载
    this.initGame();
},
initGame: function () { // 游戏初始化
 
  this.setData({ // 更新数据
      ruleState: true,
      dis:false,
     
      show:false,
      showq:false,
      text:[],
      color:[],
      q:'',
      choose:[],
      true:0,
      indexq:0,
      right:0,
  
      inshow:"in",
      totalProgressTime:5,
      progressWidth:0,
      progressTime:5,
  
  })
 
},

 testStart:function() {
   if(this.data.indexq<2){
    this.setData({ // 更新数据
      ruleState: false,
      progressWidth:0,
      progressTime:3,
      totalProgressTime:3,
    })
  }else if(this.data.indexq<4){
    this.setData({ // 更新数据
      ruleState: false,
    
      progressWidth:0,
      progressTime:2,
      totalProgressTime:2,
  })
  }else{
    this.setData({ // 更新数据
      ruleState: false,
      
      progressWidth:0,
      progressTime:1,
      totalProgressTime:1,
    })
  }
 
    this.playbtn();
    var a=Math.floor(Math.random()*10);
    var b=Math.floor(Math.random()*10);
    while(a==b){
       a=Math.floor(Math.random()*10);
       b=Math.floor(Math.random()*10);
    }
    var texttemp=[];
    texttemp.push(a);
    var colortemp=[];
    colortemp.push(b);
    var choosetemp=[];
    var qindex=Math.floor(Math.random()*2);
 
     if(qindex==0)
     {
       for(var i=0;i<4;){
         var num=Math.floor(Math.random()*10);
         var f=0;
         for(var j=0;j<choosetemp.length;j++)
         {
            if(choosetemp[j].number==num||num==texttemp[0]||num==colortemp[0])
             {
               f=1;
               break;
             }
         }
         if(f==0)
         {
            var t={
              number:num,
              style:"btn"
            }
             choosetemp.push(t);
             i++;
         }
       }
       var key1={
        number:texttemp[0],
        style:"btn"
       }
       var key2={
        number:colortemp[0],
        style:"btn"
       }

       var c=Math.floor(Math.random()*4);
       var d=Math.floor(Math.random()*4);
       while(c==d){
          c=Math.floor(Math.random()*4);
          d=Math.floor(Math.random()*4);
       }
       choosetemp[c]=key1;
       choosetemp[d]=key2;
       this.setData({
         ans:texttemp[0],
        });
      
     
     }else if(qindex==1){
       for(var i=0;i<4;){
         var num=Math.floor(Math.random()*10);
         var f=0;
         for(var j=0;j<choosetemp.length;j++)
         {
             if(choosetemp[j].number==num||num==texttemp[0]||num==colortemp[0])
             {
               f=1;
               break;
             }
         }
         if(f==0)
         {
           var t={
             number:num,
             style:"btn"
           }
             choosetemp.push(t);
             i++;
         }
       }
     
       var key1={
        number:texttemp[0],
        style:"btn"
       }
       var key2={
        number:colortemp[0],
        style:"btn"
       }

       var c=Math.floor(Math.random()*4);
       var d=Math.floor(Math.random()*4);
       while(c==d){
          c=Math.floor(Math.random()*4);
          d=Math.floor(Math.random()*4);
       }
       choosetemp[c]=key1;
       choosetemp[d]=key2;
       this.setData({
         ans:colortemp[0],
        });
     }
     
         this.setData({
           show:true,
           showbu:false,
           text:texttemp,
           color:colortemp,
           choose:choosetemp,
           q:this.data.allq[qindex]
         }); 
  },


  viewDemo: function () {
    let that = this;
    var index=0;
    this.setData({
        ruleState: false,
        dis:true
    })


    let step0 = {
      func: () => {
          Toast('本测试需要你记忆看到的内容');
          setTimeout(() => {
            that.testStart();
        }, 2000)
      },
      playtime: 2500
  }

  let step1 = {
    func: () => {
    
        Toast('例如本题中，记住'+that.data.alltext[that.data.color[0]]+"的文字"+that.data.alltext[that.data.text[0]]);
       
    },
    playtime: 3000
}

  let step2 = {
    
    func: () => {
      clearInterval(timer);
      Toast('进度条表示你剩余的时间');
    },
    playtime: 2000
}

  let step3 = {
    func: () => {

        that.setData({
          inshow : "in-red",
        })
        setTimeout(() => {
                that.setData({
                  inshow : "in",
                })
            }
            , 400
        )
    },
    playtime: 800
}

  

  let step4 = {
    
    func: () => {
      let totalProgressTime = that.data.totalProgressTime; 
    
   
      Toast('进度条充满则开始答题');
      setTimeout(() => {
        that.setData({
          progressWidth: 0, 
          progressTime: totalProgressTime+3,
          totalProgressTime:totalProgressTime+3,
          show:false,
          showq:true
        })
        that.playbtn();
        }, 2000)

    },
    playtime: 3000
}



let step6 = {
    
  func: () => {
    clearInterval(timer);
    Toast('你答题的时间也是有限的');
  },
  playtime: 2000
}

let step7 = {
  func: () => {

      that.setData({
        inshow : "in-red",
      })
      setTimeout(() => {
              that.setData({
                inshow : "in",
              })
          }
          , 400
      )
  },
  playtime: 800
}


let step8 = {
    
  func: () => {
    Toast('如果进度条充满，则你答题失败');
  },
  playtime: 3500
}

let step9 = {
    
  func: () => {
    
    Toast('如果你找到正确答案,按下按钮');
  },
  playtime: 2000
}

let step10 = {
  func: () => {
  
    for(var i=0;i<4;i++){
      if(that.data.choose[i].number==this.data.ans)
      {
          index=i;
          break;
      }
    }
      that.setData({
        [`choose[${index}].style`]  : "btn-tips",
      })
      setTimeout(() => {
              that.setData({
                [`choose[${index}].style`]  : "btn",
              })
          }
          , 400
      )
  },
  playtime: 800
}




let step11 = {
  func: () => {
    that.setData({
      [`choose[${index}].style`]  : "btn-active",
    })
  },
  playtime: 400
}

let step12 = {
    
  func: () => {
    
    Toast('尝试所有题目，完成本项测试');
  },
  playtime: 3000
}


let step13 = {
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
}

  let stepIdx = 0
  let steps = [step0, step1, step2,step3, step3,step4,step6,step7,step7,step8,step9,step10,step10,step11,
  step12,step13]
  setTimeout(function play() {
      if (stepIdx < steps.length) {
          steps[stepIdx].func()
          setTimeout(play, steps[stepIdx++].playtime);
      }
  }, 0);
  },

  click:function(e){
      var index=e.currentTarget.dataset.index;
      this.setData({
        [`choose[${index}].style`]:"btn-active"
       });

      
      if(this.data.ans===this.data.choose[index].number){
        this.setData({
          right:this.data.right+1
         });
        }
 
        this.setData({
         dis:true,
        });

      var that=this
        clearInterval(timer);
           
        var msg="";
        if(that.data.indexq==0){
          msg="继续前进!"
        }else  if(that.data.indexq==1){
          msg="难度提升了!"
        }else  if(that.data.indexq==2){
          msg="继续前进!"
        }else  if(that.data.indexq==3){
          msg="加油，胜利就在眼前!"
        }else  {
          msg="测试完成！你的得分是"+(this.data.right*20)
        }
        Toast({
          message:msg,
        
          onClose: () => {
            if(that.data.indexq<4){
            that.setData({
              show:false,
              showq:false,
              showbu:true,
              dis:false,
              ask:"",
              indexq:that.data.indexq+1
            });
            that.testStart();
          }else{
            var score="";
           if(this.data.right==5){
             score="A"
           }else  if(this.data.right==4){
             score="B"
           }else  if(this.data.right==3){
             score="C"
           }else  if(this.data.right==2){
             score="D"
           }else{
             score="E"
           }
           let pages = getCurrentPages();
           let prevPage = pages[pages.length - 2];
           prevPage.setData({
               ['examinations[2].score']: score
           })
           wx.navigateBack()
          }
          
        }
      })
      
},


})
