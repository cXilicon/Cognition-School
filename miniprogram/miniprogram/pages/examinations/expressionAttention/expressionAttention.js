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
        allq: ["之前出现的文字是什么？", "之前出现的文字是什么颜色？"],
        text: [],
        color: [],
        q: '',
        choose: [],
        true: 0,
        indexq: 0,
        right: 0,

        percent: 0,
        timeTarget: 4000,
        timeNow: 0,
        startCountDown: 3,
        startCountDownState: false
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
        let that=this;
        this.reset();
        init = setInterval(
            () => {
                this.setData({
                    timeNow: this.data.timeNow + 10,
                    percent: 100 * (this.data.timeNow + 10) / this.data.timeTarget
                })
                if (this.data.percent == 100) {
                  
             
                        if (!this.data.showq) {
                            clearInterval(init);
                            that.setData({
                                percent: 0,
                                timeTarget: this.data.timeTarget+3000,
                                timeNow: 0,
                                show: false,
                                showq: true,
                                dis:false
                            })
                            this.start();
                         
                        } else {
                            clearInterval(init);
                            this.setData({
                                dis: true,
                            });
            
                            let msg = "";
                            if (that.data.indexq === 0) {
                                msg = "注意时间哦！"
                            } else if (that.data.indexq === 1) {
                                msg = "难度提升了!注意时间哦！"
                            } else if (that.data.indexq === 2) {
                                msg = "注意时间哦！"
                            } else if (that.data.indexq === 3) {
                                msg = "难度提升了!注意时间哦！"
                            } else {
                                msg = "测试完成！你的得分是" + (this.data.right * 20)
                            }
                            
                            Toast({
                                message: msg,
            
                                onClose: () => {
                                    if (that.data.indexq < 4) {
                                        that.setData({
                                            show: false,
                                            showq: false,
            
                                          
                                            ask: "",
                                            indexq: that.data.indexq + 1
                                        });
                                        that.testStart();
                                    } else {
                                        let score = "";
                                        let right=that.data.right;
                                        if (that.data.right === 5) {
                                            score = "A"
                                        } else if (that.data.right === 4) {
                                            score = "B"
                                        } else if (that.data.right === 3) {
                                            score = "C"
                                        } else if (that.data.right === 2) {
                                            score = "D"
                                        }  else {
                                            score = "F"
                                        }
                                        if (that.data.entrance === 'exam') {
                                            let pages = getCurrentPages();
                                            let prevPage = pages[pages.length - 2];
                                            prevPage.setData({
                                                ['examinations[2].score']: score
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
                                }
                            })
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
            true: 0,
            indexq: 0,
            right: 0,
            inshow: "in",
            percent: 0,
            timeTarget: 4000,
            timeNow: 0,
            demoShow:false,
            startCountDown: 3,
            startCountDownState: false
        })

    },

    testStart: function () {
        if (this.data.indexq == 0 ) {
            this.setData({ // 更新数据
                ruleState: false,
                timeTarget:4000,
                timeNow:0,
                percent:0,
            })
        }  else if (this.data.indexq == 1) {
            this.setData({ // 更新数据
                ruleState: false,
                timeTarget:3500,
                timeNow:0,
                percent:0,
            })
        }else if (this.data.indexq == 2) {
            this.setData({ // 更新数据
                ruleState: false,
                timeTarget:2500,
                timeNow:0,
                percent:0,
            })
        }else if (this.data.indexq == 3) {
            this.setData({ // 更新数据
                ruleState: false,
                timeTarget:2000,
                timeNow:0,
                percent:0,
            })
        } else {
            this.setData({ // 更新数据
              
                ruleState: false,
                timeTarget:1000,
                timeNow:0,
                percent:0,
            })
        }
     
        let a = Math.floor(Math.random() * 8);
        let b = Math.floor(Math.random() *8);
        while (a === b) {
            a = Math.floor(Math.random() * 8);
            b = Math.floor(Math.random() * 8);
        }
        let texttemp = [];
        texttemp.push(a);
        let colortemp = [];
        colortemp.push(b);
        let choosetemp = [];
        let qindex = Math.floor(Math.random() * 2);
        if (qindex === 0) {
          
            for (let i = 0; i < 5;) {
                let num = Math.floor(Math.random() * 8);
                while( num === texttemp[0] || num === colortemp[0])
                {
                    num = Math.floor(Math.random() * 8);
                }
                let f = 0;
                for (let j = 0; j < choosetemp.length; j++) {
                   
                    if (choosetemp[j].number === num) {
                        f = 1;
                        break;
                  
                    }
                }
                if (f === 0) {
                    let t = {
                        number: num,
                        style: "item"
                    }
                    choosetemp.push(t);
                 
                    i++;
                }
            }
           
            let key1 = {
                number: texttemp[0],
                style: "item"
            }
            let key2 = {
                number: colortemp[0],
                style: "item"
            }
            let c = Math.floor(Math.random() * 5);
            let d = Math.floor(Math.random() * 5);
            while (c === d) {
                c = Math.floor(Math.random() * 5);
                d = Math.floor(Math.random() * 5);
            }
            choosetemp[c] = key1;
            choosetemp[d] = key2;
        
            this.setData({
                ans: texttemp[0],
            });
        } else if (qindex === 1) {
            for (let i = 0; i < 5;) {
                let num = Math.floor(Math.random() * 8);
                while( num === texttemp[0] || num === colortemp[0])
                {
                    num = Math.floor(Math.random() * 8);
                }
                let f = 0;
                for (let j = 0; j < choosetemp.length; j++) {
                    if (choosetemp[j].number === num ) {
                        f = 1;
                        break;
                    }
                }
                if (f === 0) {
                    let t = {
                        number: num,
                        style: "item"
                    }
                    choosetemp.push(t);
                  
                    i++;
                }
            }
        
            let key1 = {
                number: texttemp[0],
                style: "item"
            }
            let key2 = {
                number: colortemp[0],
                style: "item"
            }
            let c = Math.floor(Math.random() * 5);
            let d = Math.floor(Math.random() * 5);
            while (c === d) {
                c = Math.floor(Math.random() * 5);
                d = Math.floor(Math.random() * 5);
            }
            choosetemp[c] = key1;
            choosetemp[d] = key2;
      
            this.setData({
              
                ans: colortemp[0],
            });
        }
       
        this.setData({
           
            againState: false,
            showbu: false,
        })

        var that = this;
        if(this.data.indexq==0){
            this.setData({
                startCountDown: 3,
                startCountDownState: true,
           
            })
            subOp = setInterval(() => {
            if (that.data.startCountDown - 1) {
                that.setData({
                    startCountDown: that.data.startCountDown - 1,
                });
            } else {
                this.setData({
                    show: true,
                    text: texttemp,
                    color: colortemp,
                    choose: choosetemp,
                    q: this.data.allq[qindex],
                    startCountDownState:false
                });
                this.start();
                clearInterval( subOp);

            }
        }, 1000);
    }else{
        this.setData({
            
            show: true,
            text: texttemp,
            color: colortemp,
            choose: choosetemp,
            q: this.data.allq[qindex]
        });
        this.start();
    }
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


        demoOp.steps = [

        {
            func: () => {
                Toast('本测试需要你记忆看到的内容');
              
            }, playtime: 2500
        }, {
            func: () => {
                Toast('等待提示结束后开始测试');
              timer =   setTimeout(() => {
                    that.testStart();
                }, 2000)
            }, playtime: 5500
        }, {
            func: () => {
                clearInterval(timer)
                that.setData({
                    examState: DEMO,
                })
        
                Toast('例如本题中，记住' + that.data.alltext[that.data.color[0]] + "的文字" + that.data.alltext[that.data.text[0]]);
            },
            playtime: 3000
        },{
            func: () => {
              this.stop();
                Toast('进度条表示你剩余的时间');
            }, playtime: 2000
        }, {
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
        }, {
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
                let targetTime = that.data.timeTarget;
                Toast('进度条充满则开始答题');
        timer =  setTimeout(() => {
                    that.setData({
                       timeNow:0,
                       timeTarget: targetTime + 2000,
                        percent:0,
                        show: false,
                        showq: true
                    })
                    that.start();
                }, 2000)
            
            }, playtime: 3000
        },{
         
            func: () => {
                clearInterval(timer)
                clearInterval(init);
                Toast('你答题的时间也是有限的');
            },
            playtime: 2000
        }, {
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
        },{
            func: () => {
                Toast('如果进度条充满，则你答题失败');
            }, playtime: 3500
        }, {
            func: () => {
                Toast('如果你找到正确答案,按下按钮');
            }, playtime: 2000
        }, {
            func: () => {
                for (let i = 0; i < 5; i++) {
                    if (that.data.choose[i].number === this.data.ans) {
                        index = i;
                        break;
                    }
                }
                that.setData({
                    [`choose[${index}].style`]: "item-tips",
                })
                setTimeout(() => {
                    that.setData({
                        [`choose[${index}].style`]: "item",
                    })
                }, 400)
            },
            playtime: 800
        }, {
            func: () => {
                for (let i = 0; i < 5; i++) {
                    if (that.data.choose[i].number === this.data.ans) {
                        index = i;
                        break;
                    }
                }
                that.setData({
                    [`choose[${index}].style`]: "item-tips",
                })
                setTimeout(() => {
                    that.setData({
                        [`choose[${index}].style`]: "item",
                    })
                }, 400)
            },
            playtime: 800
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
        }],
        util.syncOperation(demoOp);

   
    },

    click: function (e) {
        if(this.data.dis===false)
        {
        let index = e.currentTarget.dataset.index;
   
        if (this.data.ans === this.data.choose[index].number) {
            this.setData({
                right: this.data.right + 1
            });
        }

        this.setData({
            dis: true,
        });

        let that = this
        clearInterval(init);

        let msg = "";
        if (that.data.indexq === 0) {
            msg = "继续前进!"
        } else if (that.data.indexq === 1) {
            msg = "难度提升了!"
        } else if (that.data.indexq === 2) {
            msg = "继续前进!"
        } else if (that.data.indexq === 3) {
            msg = "加油，胜利就在眼前!"
        } else {
            msg = "测试完成！你的得分是" + (this.data.right * 20)
        }

        Toast({
            message: msg,
            onClose: () => {
                if (that.data.indexq < 4) {
                    that.setData({
                        show: false,
                        showq: false,
                        showbu: true,
                     
                        ask: "",
                        indexq: that.data.indexq + 1
                    });
                    that.testStart();
                } else {
                    let score;
                    let right=this.data.right;

                    if (this.data.right === 5) {
                        score = "A"
                    } else if (this.data.right === 4) {
                        score = "B"
                    } else if (this.data.right === 3) {
                        score = "C"
                    } else if (this.data.right === 2) {
                        score = "D"
                    } else{
                        score = "F"
                    }
                    if (that.data.entrance === 'exam') {
                        let pages = getCurrentPages();
                        let prevPage = pages[pages.length - 2];
                        prevPage.setData({
                            ['examinations[2].score']: score
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

            }
        
        })
    }
    },

})
