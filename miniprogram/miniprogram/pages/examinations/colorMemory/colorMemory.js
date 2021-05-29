//index.js
//获取应用实例
const app = getApp()

import util from "../../../utils/util";
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';


let init;

const START = "START"
const DEMO = 'DEMO'
const EXECUTE = 'EXECUTE'
const AGAIN = 'AGAIN'

let timer = null
let subOp = null
let demoOp = {
    steps: null,
    controller: null,
}

Page({
    data: {
        examState: "",
        canInteraction: false,


        entrance:'',
        lastScore: '',
        lastTimeCount: '',
        againState: false,
        demoShow:false,
        timershow:"timer",
        ruleState: true,
        show: false,
        showq: false,
        showbu: true,
        dis: false,
        alltext: ["红色", "蓝色", "紫色", "绿色", "橙色", "黄色", "白色",  "灰色"],
        allcolor: ["#FF0000", "#1E90FF", "#8B008B", "#00FF00", "#FF8C00", "#FFFF00",  "#ffffff", "#A9A9A9"],
        startCountDown: 3,
        tartCountDownState: true,
       
        //关卡数
        indexq: 0,
        //正确的数目
        right: 0,

        //进度条和计时系统
        percent: 0,
        timeTarget: 4500,
        timeNow: 0,

        //当前颜色数目
        qNum:3,
        //当前的题目数目
        testNum:1
    },


    reset: function () {
        clearInterval(init)
        this.setData({
            timeNow: 0,
            percent: 0,
        })
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
        this.setData({
            timeNow:0,
             percent:0,
             show: false,
             showq: false
         })
        Toast.clear()
        this.setData({
            examState: START
        })
      
    },


    start: function () {
        this.setData({
            dis: false,
        });
        let that=this;
     
        init = setInterval(
            () => {
                this.setData({
                    timeNow: this.data.timeNow + 10,
                    percent: 100 * (this.data.timeNow + 10) / (this.data.timeTarget)
                })
              
                if(this.data.timeNow%1500==0&&this.data.percent != 100){
                    this.setData({
                        text:this.data.text+1,
                      
                    })
                }
                if (this.data.percent == 100) {
                  
             
                        if (!this.data.showq) {
                            clearInterval(init);
                            that.setData({
                                percent: 0,
                                timeTarget: 10000,
                                timeNow: 0,
                                show: false,
                                showq: true,
                                dis:false
                            })
                            this.start();
                         
                        } else {
                         clearInterval(init);
                          this.finishGame();
 
                    }
                }
            }, 10);
    },

   
    stop: function () {
        clearInterval(init)
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

    exitExamination: function () {
        if(this.data.demoShow===false)
        wx.navigateBack()
      },

    initGame: function () { // 游戏初始化
        clearInterval(init)
        this.setData({ // 更新数据
            ruleState: true,
            dis: false,
            show: false,
            showq: false,
            text: [],
            color: [],
            q: '',
            choose: [],
            ans:[],
            true: 0,
            indexq: 0,
            right: 0,
            inshow: "in",
            percent: 0,
            timeTarget: 6000,
            timeNow: 0,
            text:0,
            demoShow:false,
            qNum:3,
            allq:[],
            startCountDown: 3,
            startCountDownState: false
        })

    },

    finishGame:function(){
        this.setData({
            dis: true,
        });
        let msg="";
        if(this.data.percent == 100)
        {
            msg="注意时间哦！" 
        }
        if(this.data.testNum-1===this.data.testindex)
        {
            msg+="进入下一关卡，再接再厉！"
        }else{
            msg+="继续前进！"
        }

        if(this.data.indexq===4&&this.data.testNum-1===this.data.testindex)
        msg="恭喜你完成测试！你的得分是"+this.data.right*10


        let that=this;
        Toast({
            message: msg,

            onClose: () => {
                if(this.data.testNum-1===this.data.testindex){
                    if (that.data.indexq < 4) {
                        that.setData({
                            show: false,
                            showq: false,
                            ask: "",
                            testindex:0,
                            text:0,
                            indexq: that.data.indexq + 1
                        });
                        that.testStart();
                    } else {
                        let score = "";
                        let right=that.data.right;
                        if (that.data.right >=9) {
                            score = "A"
                        } else if (that.data.right >=7) {
                            score = "B"
                        } else if (that.data.right >=5) {
                            score = "C"
                        } else if (that.data.right >=3) {
                            score = "D"
                        } else {
                            score = "F"
                        }
                        if (that.data.entrance === 'exam') {
                            let pages = getCurrentPages();
                            let prevPage = pages[pages.length - 2];
                            prevPage.setData({
                                ['examinations[6].score']: score,
                                ['finishedItemCount']: prevPage.data.finishedItemCount += 1
                            })
                           wx.navigateBack()
                          }else{
                            that.initGame()
                            that.setData({
                                ruleState:false,
                                againState: true,
                                lastScore: score,
                                lastTimeCount: right
                            })
                          }
                    }
                }else{
                    that.setData({
                       testindex:this.data.testindex+1,
                       timeTarget:10000,
                       percent:0,
                       timeNow:0
                    });
                    this.start()
                }

            }
        })
    },

    testStart: function () {
        this.setData({
            choose: [],
            startCountDown: 3,
            startCountDownState: true,
            ruleState: false,
            againState: false,
            text:0,
            allq:[],
            test:[],
            testindex:0,
            choose: [],
            ans:[],
        })
        if (this.data.indexq==0) {
            this.setData({ // 更新数据
             
                testNum:1,
                timeNow:0,
                percent:0,
                qNum:3,
                
            })
        } else if (this.data.indexq==1) {
            this.setData({ // 更新数据
                
                testNum:2,
                timeNow:0,
                percent:0,
                qNum:4
            })
        } else if (this.data.indexq==2) {
            this.setData({ // 更新数据
               
                testNum:2,
                timeNow:0,
                percent:0,
                qNum:5
            })
        } else if (this.data.indexq==3) {
            this.setData({ // 更新数据
              
                testNum:2,
                timeNow:0,
                percent:0,
                qNum:6
            })
        } else {
            this.setData({ // 更新数据
            
                testNum:3,
                timeNow:0,
                percent:0,
                qNum:6
             })
        }



        let qNumTemp=[];
        for(var i=0;i<this.data.qNum;)
        {
            let a = Math.floor(Math.random() * 8);
            if(qNumTemp.indexOf(a)==-1)
            {
               qNumTemp.push(a);
                i++;
            }
        }

        let testTemp=[];
        let forward="";
        let chooseTemp=[];
        let chooseItem=[];
        let ansTemp=[];
        for(var i=0;i<this.data.testNum;)
        {
            chooseItem=[];
            let a = Math.floor(Math.random() * this.data.qNum);
            if(a==0)
                forward="之后"
            else if(a==this.data.qNum-1)
                forward="之前"
            else {

                if(Math.floor(Math.random() * 2)==0)
                forward="之前"
                else
                forward="之后"
            }
            var testItem="出现在"+this.data.alltext[qNumTemp[a]]+forward+"的是什么颜色？"

            if(testTemp.indexOf(testItem)==-1)
            {
                testTemp.push(testItem)
                i++;
                
            }else{

                continue;

            }
            let key;

            if(forward=="之后")
                key=a+1
            else
                key=a-1


            for(var j=0;j<4;){
                let b = Math.floor(Math.random() * 8);
                if(b!=this.data.alltext.indexOf(this.data.alltext[qNumTemp[key]])
                &&chooseItem.indexOf(b)==-1&&b!=this.data.alltext.indexOf(this.data.alltext[qNumTemp[a]])){
                    chooseItem.push(b);
                    j++;
                } 
            }
            
            chooseItem[Math.floor(Math.random() * 4)] = this.data.alltext.indexOf(this.data.alltext[qNumTemp[key]])


            ansTemp.push(this.data.alltext.indexOf(this.data.alltext[qNumTemp[key]]));
            let chooseItemTemp=[];
            for(var j=0;j<4;j++){
                let temp={
                    number:chooseItem[j],
                    style:"item"
                }
                chooseItemTemp.push(temp);
            }
            
            chooseTemp.push(chooseItemTemp);
        }

        var that = this;
        subOp = setInterval(() => {
            if (that.data.startCountDown - 1) {
                that.setData({
                    startCountDown: that.data.startCountDown - 1,
                });
            } else {
                this.setData({
                    examState: EXECUTE,
                    againState: false,
                    show: true,
                    showbu: false,
                    timeTarget:this.data.qNum*1500,
                    allq:qNumTemp,
                    test:testTemp,
                    choose:chooseTemp,
                    ans:ansTemp,
                    startCountDownState: false,
                });

                this. start();
                clearInterval( subOp);

            }
        }, 1000);

       
    },

    viewDemo: function () {
        let that = this;
        let index = 0;
        this.setData({
            ruleState: false,
            dis: true,
            demoShow:true
        })
        clearTimeout(subOp)
        clearInterval(subOp)
        that.setData({
            examState: DEMO,
        })

        demoOp.steps = [   {
            func: () => {
                Toast('本测试需要你按顺序记忆看到的内容');
              
            }, playtime: 2500
        }
, {
            func: () => {
                Toast('等待提示结束后开始测试');
                 timer = setTimeout(() => {
                    that.testStart();
                  
                }, 2000)
            }, playtime:5500
        }

 , {

            func: () => {
                clearInterval(timer)
                that.setData({
                    examState: DEMO,
                })
                this.stop();
                Toast('首先记住第一个颜色' + this.data.alltext[this.data.allq[ this.data.text ]]);
            },
            playtime: 2500
        }

  , {
           
            func: () => {
                this.start();
            },
            playtime: 1500
        }

        
   ,{
            func: () => {
                this.stop();
                Toast('记住第二个颜色' + this.data.alltext[this.data.allq[ this.data.text ]]);
            },
            playtime: 2500
        }

    , {
           
            func: () => {
                this.start();
            },
            playtime: 1500
        }

        , {
         
            func: () => {
                this.stop();
                Toast('记住第三个颜色' + this.data.alltext[this.data.allq[ this.data.text ]]);
            },
            playtime: 2000
        }

, {
            func: () => {
              this.stop();
                Toast('进度条表示你剩余的时间');
            }, playtime: 2500
        }

      , {
            func: () => {
                that.setData({
                    timershow:"timer-tips",
                })
                setTimeout(() => {
                    that.setData({
                        timershow:"timer",
                    })
                }, 400)
            }, playtime: 800
        },{
            func: () => {
                that.setData({
                    timershow:"timer-tips",
                })
                setTimeout(() => {
                    that.setData({
                        timershow:"timer",
                    })
                }, 400)
            }, playtime: 800
        },


  {
            func: () => {
              
                Toast('进度条充满则开始答题');
                timer = setTimeout(() => {
                    that.setData({
                       timeNow:0,
                       timeTarget: 10000,
                        percent:0,
                        show: false,
                        showq: true
                    })
                    that.start();
                }, 2000)
            
            }, playtime: 3000
        }

  , {
         
            func: () => {
                clearInterval(timer)
                clearInterval(init);
                Toast('你答题的时间也是有限的');
            },
            playtime: 2000
        }

       , {
            func: () => {
                that.setData({
                    timershow:"timer-tips",
                })
                setTimeout(() => {
                    that.setData({
                        timershow:"timer",
                    })
                }, 400)
             
            }, playtime: 800
        }  , {
            func: () => {
                that.setData({
                    timershow:"timer-tips",
                })
                setTimeout(() => {
                    that.setData({
                        timershow:"timer",
                    })
                }, 400)
             
            }, playtime: 800
        }
      , {
            func: () => {
                Toast('如果进度条充满，则你答题失败');
            }, playtime: 3500
        }
, {
            func: () => {
                Toast('如果你找到正确答案,按下按钮');
            }, playtime: 2000
        }

  , {
            func: () => {
                for (let i = 0; i < 4; i++) {
                    if (that.data.choose[0][i].number === this.data.ans[0]) {
                        index = i;
                        break;
                    }
                }
                that.setData({
                    [`choose[0][${index}].style`]: "item-tips",
                })
                setTimeout(() => {
                    that.setData({
                        [`choose[0][${index}].style`]: "item",
                    })
                }, 400)
            },
            playtime: 800
        }


    ,  {
        func: () => {
            for (let i = 0; i < 4; i++) {
                if (that.data.choose[0][i].number === this.data.ans[0]) {
                    index = i;
                    break;
                }
            }
            that.setData({
                [`choose[0][${index}].style`]: "item-tips",
            })
            setTimeout(() => {
                that.setData({
                    [`choose[0][${index}].style`]: "item",
                })
            }, 400)
        },
        playtime: 800
    }


,{
            func: () => {
                Toast('每个关卡中，你将回答1-3题类似的题目');
            }, playtime: 3000
        }

, {
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
        }]
        util.syncOperation(demoOp);
  
    },

    click: function (e) {
        if(this.data.dis===false)
        {
        let index = e.currentTarget.dataset.index;
   
        if (this.data.ans[this.data.testindex] === this.data.choose[this.data.testindex][index].number) {
            this.setData({
                right: this.data.right + 1
            });
        }

        this.setData({
            dis: true,
        });

        let that = this
        clearInterval(init);

        this.finishGame();
    }
    },

})
