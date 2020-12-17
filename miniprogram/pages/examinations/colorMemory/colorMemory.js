//index.js
//获取应用实例
const app = getApp()
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';


let init;
Page({
    data: {
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
        
        
        q: '',
        choose: [],
        true: 0,
        indexq: 0,
        right: 0,

        percent: 0,
        timeTarget: 2000,
        timeNow: 0,

        qNum:3,
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
                if(this.data.timeNow==2000){
                    
                }
                if (this.data.percent == 100) {
                  
             
                        if (!this.data.showq) {
                            clearInterval(init);
                            that.setData({
                                percent: 0,
                                timeTarget: this.data.timeTarget+2000,
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
                                        } else if(that.data.right === 2){
                                            score = "E"
                                        } else {
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
      /*
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('entrance', data => {
            this.setData({
                entrance: data.entrance,
            })
            console.log(data)
        })

        */
        this.setData({
          entrance: "training",
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
            timeTarget: 5000,
            timeNow: 0,
            demoShow:false,
            qNum:3,
        })

    },

    testStart: function () {
        if (this.data.indexq < 2) {
            this.setData({ // 更新数据
                ruleState: false,
                timeTarget:5000,
                timeNow:0,
                percent:0,
                qNum:3
            })
        } else if (this.data.indexq < 4) {
            this.setData({ // 更新数据
                ruleState: false,
                timeTarget:4000,
                timeNow:0,
                percent:0,
                qNum:4
            })
        } else {
            this.setData({ // 更新数据
              
                ruleState: false,
                timeTarget:2000,
                timeNow:0,
                percent:0,
                qNum:5
             })
        }
        var qNumTemp=[];
        for(var i=0;i<this.data.qNum;)
        {
            let a = Math.floor(Math.random() * 8);
            if(qNumber.indexof(a)==-1)
            {
               qNumTemp.push(a);
                i++;
            }
        }



        this. start();
     
        this.setData({
            againState: false,
            show: true,
            showbu: false,
            text: texttemp,
            color: colortemp,
            choose: choosetemp,
            q: this.data.allq[qindex]
        });
    },

    viewDemo: function () {
        let that = this;
        let index = 0;
        this.setData({
            ruleState: false,
            dis: true,
            demoShow:true
        })

        let step0 = {
            func: () => {
                Toast('本测试需要你记忆看到的内容');
                setTimeout(() => {
                    that.testStart();
                }, 2000)
            }, playtime: 2500
        }

        let step1 = {
            func: () => {
                Toast('例如本题中，记住' + that.data.alltext[that.data.color[0]] + "的文字" + that.data.alltext[that.data.text[0]]);
            },
            playtime: 3000
        }

        let step2 = {
            func: () => {
              this.stop();
                Toast('进度条表示你剩余的时间');
            }, playtime: 2000
        }

        let step3 = {
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


        let step4 = {
            func: () => {
                let targetTime = that.data.timeTarget;
                Toast('进度条充满则开始答题');
                setTimeout(() => {
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
        }

        let step6 = {
         
            func: () => {
             
                clearInterval(init);
                Toast('你答题的时间也是有限的');
            },
            playtime: 2000
        }

        let step7 = {
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


        let step8 = {
            func: () => {
                Toast('如果进度条充满，则你答题失败');
            }, playtime: 3500
        }

        let step9 = {
            func: () => {
                Toast('如果你找到正确答案,按下按钮');
            }, playtime: 2000
        }

        let step10 = {
            func: () => {
                for (let i = 0; i < 4; i++) {
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
        let steps = [step0, step1, step2, step3, step3, step4, step6, step7, step7, step8, step9, step10, step10, step13]
        setTimeout(function play() {
            if (stepIdx < steps.length) {
                steps[stepIdx].func()
                setTimeout(play, steps[stepIdx++].playtime);
            }
        }, 0);
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
                    } else if (this.data.right === 1){
                        score = "E"
                    }else{
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
