/*
*   作者：张帅
*   完成日期：2020/11/1
*   attentionTest-3.js
*/
import util from "../../../utils/util";
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';

//获取应用实例
const app = getApp();
//计时器初始化文件
let init;

const START = "START"
const DEMO = 'DEMO'
const EXECUTE = 'EXECUTE'
const AGAIN = 'AGAIN'


let subOp = null
let demoOp = {
    steps: null,
    controller: null,
}



Page({
    data: {

        examState: "",
        canInteraction: false,


        //页面显示参数
        timershow: "timer",
        showTable: true,
        selectedNumber: 0,
        first: 0,
        entrance: '',
        ruleState: true,

        //计时器参数
        second: 0,
        millisecond: 0,
        lastScore: '',
        lastTimeCount: '',
        percent: 0,
        demoShow: false,
        //游戏数据
        question: [],
        startCountDown: 3,
        startCountDownState: false,
        againState: false,
        //点击
        index: [-1, -1, -1, -1, -1, -1, -1, -1],
        fin: [-1, -1, -1, -1, -1, -1, -1, -1],
        randomsize: 5,
        width: 5,
        height: 4,
        indexq: 0
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
            ruleState: true,
            timershow: "timer",
            showTable: true,
            selectedNumber: 0,
            second: 0,
            millisecond: 0,
            demoShow: false,
            percent: 0,
            question: [],
            startCountDown: 3,
            startCountDownState: false,
            index: [-1, -1, -1, -1, -1, -1, -1, -1],
            fin: [-1, -1, -1, -1, -1, -1, -1, -1],
            randomsize: 5,
            width: 5,
            height: 4,
            indexq: 0
        })

    },
    onUnload() { // 页面退出 - 清空计时器
        clearInterval(init);
        this.stopDemo()
    },


    exitExamination: function () {
        if (this.data.demoShow === false)
            wx.navigateBack()
    },

    timer: function () {
        const targetTime = 180 * 100;
        let percent = 100 * (this.data.millisecond + this.data.second * 100 + 1) / targetTime
        this.setData({
            millisecond: this.data.millisecond + 1,
            percent: percent
        })

        if (this.data.millisecond >= 100) {
            this.setData({
                millisecond: 0,
                second: this.data.second + 1,
            })
        }
        let that = this
        if (this.data.second * 100 >= targetTime) {
            clearInterval(init);
            Toast.success({
                message: '时间到！很遗憾你没有完成测试',
                forbidClick: true,
                onClose: () => {

                    if (that.data.entrance === 'exam') {
                        let pages = getCurrentPages();
                        let prevPage = pages[pages.length - 2];
                        prevPage.setData({
                            ['examinations[1].score']: "F",
                            finishedItemCount: prevPage.data.finishedItemCount += 1
                        })
                        wx.navigateBack()
                    } else {
                        that.initGame()
                        that.setData({
                            ruleState: false,
                            againState: true,
                            lastScore: "F",
                            lastTimeCount: 180
                        })

                    }
                }

            })
        }
    },


    //测试开始
    testStart: function () {
        var i, j;
        this.setData({
            question: [],
            showTable: true
        })
        //随机生成数值并存入函数
        var allnumber = [];
        for (i = 0; i < this.data.height; i++) {

            var numberTemp = [];
            var randomMath = [];
            for (j = 0; j < this.data.randomsize;) {
                var randomNumber = Math.floor(Math.random() * 9) + 1;
                if (randomMath.indexOf(randomNumber) == -1) {
                    randomMath.push(randomNumber);
                    j++;
                }

            }

            for (j = 0; j < this.data.width;) {
                var newNumber = 0;
                var temp_array = new Array();
                for (var index in randomMath) {
                    temp_array.push(randomMath[index]);
                }


                for (var k = 0; k < this.data.indexq + 1; k++) {
                    var index = Math.floor(Math.random() * (this.data.randomsize - k));
                    newNumber = newNumber * 10 + temp_array[index];
                    temp_array.splice(index, 1);
                }

                if (numberTemp.indexOf(newNumber) == -1) {
                    numberTemp.push(newNumber);
                    j++;
                }

            }


            var a = Math.floor(Math.random() * this.data.width);
            var b = Math.floor(Math.random() * this.data.width);
            while (Math.abs(a - b <= 1)) {
                a = Math.floor(Math.random() * this.data.width);
                b = Math.floor(Math.random() * this.data.width);
            }
            numberTemp[a] = numberTemp[b];
            var numberobj = [];
            for (j = 0; j < this.data.width; j++) {
                var t = {
                    number: numberTemp[j],
                    style: "numberText"
                };
                numberobj.push(t);
            }
            allnumber.push(numberobj);
        }

        this.setData({
            againState: false,
            ruleState: false,
            startCountDown: 3,
            startCountDownState: true
        })
        var that = this;
        subOp = setInterval(() => {
            if (that.data.startCountDown - 1) {
                that.setData({
                    startCountDown: that.data.startCountDown - 1,
                });
            } else {
                that.setData({
                    examState: EXECUTE,
                    startCountDownState: false,
                    question: allnumber,
                    showTable: true,


                    countTime: 180,
                });
                clearInterval(init);
                init = setInterval(that.timer, 10);
                clearInterval( subOp);

            }
        }, 1000);
        //开始计时

    },


    stopDemo: function () {
        clearTimeout(demoOp.controller)
        clearTimeout(init)
        clearTimeout(subOp)
        clearInterval(subOp)

        this.setData({ruleState: true, startCountDownState: false,  demoShow: false,})
        Toast.clear()
        this.setData({
            examState: START
        })
      
    },



//点击数字
    clickNumber: function (e) {
        //获取点击数值的结构体
        var index1 = e.currentTarget.dataset.click1;
        var index2 = e.currentTarget.dataset.click2;

        var selected = this.data.selectedNumber;
        if (this.data.fin[index1] == -1) {
            if (this.data.question[index1][index2].style == "numberText") {

                if (this.data.index[index1] == -1) {
                    this.setData({
                        [`question[${index1}][${index2}].style`]: "numberText-active",
                        [`index[${index1}]`]: index2
                    });
                } else {
                    if (this.data.question[index1][index2].number != this.data.question[index1][this.data.index[index1]].number) {

                        this.setData({
                            [`question[${index1}][${this.data.index[index1]}].style`]: "numberText",
                            [`index[${index1}]`]: -1,
                        });
                    } else {
                        this.setData({
                            [`question[${index1}][${index2}].style`]: "numberText-active",

                            [`fin[${index1}]`]: 1,
                            selectedNumber: selected + 1
                        });
                    }
                }
            } else {
                this.setData({
                    [`question[${index1}][${index2}].style`]: "numberText",
                    [`index[${index1}]`]: -1,
                });
            }
        }
        let that = this
        //判断是否全部点击完毕，完毕则停止
        if (this.data.selectedNumber == this.data.height) {
            clearInterval(init);
            if (this.data.indexq == 3) {
                Toast.success({
                    message: '恭喜你，完成了全部测试！',
                    forbidClick: true,
                    onClose: () => {
                        var alltime = this.data.second;
                        var score = ""
                        if (alltime < 40)
                            score = "A"
                        else if (alltime < 60)
                            score = "B"
                        else if (alltime < 80)
                            score = "C"
                        else if (alltime < 100)
                            score = "D"
                        else
                            score = "F"
                        if (that.data.entrance === 'exam') {
                            let pages = getCurrentPages();
                            let prevPage = pages[pages.length - 2];
                            prevPage.setData({
                                ['examinations[1].score']: score,
                                finishedItemCount: prevPage.data.finishedItemCount += 1
                            })
                            wx.navigateBack()
                        } else {
                            that.setData({
                                ruleState: false,
                                againState: true,
                                lastScore: score,
                                lastTimeCount: that.data.second + ":" + that.data.millisecond
                            })
                            that.initGame()
                        }

                    }
                });

            } else {

                var newindex = [-1, -1, -1, -1, -1, -1, -1, -1];
                var newfin = [-1, -1, -1, -1, -1, -1, -1, -1];
                this.setData({
                    indexq: this.data.indexq + 1,
                    height: this.data.height + 1,
                    index: newindex,
                    fin: newfin,
                    selectedNumber: 0,

                })
                if (this.data.indexq < 3) {
                    this.setData({
                        randomsize: this.data.randomsize - 1,
                        showTable: false
                    })
                } else {
                    this.setData({
                        randomsize: this.data.randomsize + 1,
                        showTable: false
                    })
                }

                let that = this
                if (this.data.indexq == 1) {
                    clearInterval(init);
                    Toast.success({
                        message: '你成功了！试试更进一步！',
                        forbidClick: true,
                        onClose: () => {

                            this.testStart();
                        }

                    });
                } else if (this.data.indexq == 2) {
                    clearInterval(init);
                    Toast.success({
                        message: '太强了！继续努力！',
                        forbidClick: true,
                        onClose: () => {

                            this.testStart();
                        }

                    });
                } else if (this.data.indexq == 3) {
                    clearInterval(init);
                    Toast.success({
                        message: '加油！胜利近在咫尺！',
                        forbidClick: true,
                        onClose: () => {

                            this.testStart();
                        }

                    });
                }
            }
        }
    },

    // 查看演示
    viewDemo: function () {
        let that = this
        this.initGame();
        this.setData({
            ruleState: false,
            fin: [1, 1, 1, 1, 1, 1, 1],
            demoShow: true,
        })
        

        clearTimeout(subOp)
        clearInterval(subOp)
        this.setData({
            examState: DEMO,
        })
    
        demoOp.steps = [{
            func: () => {
                var that = this;
                Toast('等待倒计时结束后开始测试');
            
            },
            playtime: 2000
        }, {
            func: () => {
                that.setData({
                    ruleState: false,
                    startCountDown: 3,
                    startCountDownState: true,

                })
                var tempNumber = [1, 2, 1, 3, 4, 1, 1, 3, 2, 4, 5, 3, 2, 5, 1, 7, 5, 3, 5, 1];
                var allnumber = [];
                for (var i = 0; i < 4; i++) {
                    var line = [];
                    for (var j = 0; j < 5; j++) {
                        var t = {
                            number: tempNumber[i * 5 + j],
                            style: "numberText"
                        }

                        line.push(t);
                    }
                    allnumber.push(line);
                }

                subOp = setInterval(() => {
                    if (that.data.startCountDown - 1) {
                        that.setData({
                            startCountDown: that.data.startCountDown - 1,
                        });
                    } else {
                        that.setData({
                            startCountDownState: false,
                            question: allnumber,
                            showTable: true,
                            percent: 100,

                            second: 0,
                            millisecond: 0,
                            countTime: 90,
                        });
                        clearInterval(init);
                        init = setInterval(that.timer, 10);
                        clearInterval(subOp);
                    }
                }, 1000);


            },playtime:3500

        },{
            func: () => {
                Toast('点击一个含有数字的方块');
            },
            playtime: 2000
        }, {
            func: () => {
                that.setData({
                    [`question[0][2].style`]: "numberText-tips",
                })
                setTimeout(() => {
                        that.setData({
                            [`question[0][2].style`]: "numberText",
                        })
                    }
                    , 400
                )
            },
            playtime: 800
        }, {
            func: () => {
                that.setData({
                    [`question[0][2].style`]: "numberText-tips",
                })
                setTimeout(() => {
                        that.setData({
                            [`question[0][2].style`]: "numberText",
                        })
                    }
                    , 400
                )
            },
            playtime: 800
        },{
            func: () => {
                that.setData({
                    [`question[0][2].style`]: "numberText-active",
                })
            },
            playtime: 1000
        }, {
            func: () => {
                Toast('点击一行中数字相同的方块');
            },
            playtime: 2000
        }, {
            func: () => {
                that.setData({
                    [`question[0][0].style`]: "numberText-tips",
                })
                setTimeout(() => {
                        that.setData({
                            [`question[0][0].style`]: "numberText",
                        })
                    }, 400
                )
            },
            playtime: 800
        }, {
            func: () => {
                that.setData({
                    [`question[0][0].style`]: "numberText-tips",
                })
                setTimeout(() => {
                        that.setData({
                            [`question[0][0].style`]: "numberText",
                        })
                    }, 400
                )
            },
            playtime: 800
        }, {
            func: () => {
                that.setData({
                    [`question[0][0].style`]: "numberText-active",
                })
            },
            playtime: 1000
        }, {
            func: () => {
                Toast('当你选择的一个不想选中的方块');
            },
            playtime: 2000
        },{
            func: () => {
                that.setData({
                    [`question[3][0].style`]: "numberText-active",
                })
            },
            playtime: 1000
        } , {
            func: () => {
                Toast('再次点击取消选中');
            },
            playtime: 2000
        }, {
            func: () => {
                that.setData({
                    [`question[3][0].style`]: "numberText-tips",
                })
                setTimeout(() => {
                        that.setData({
                            [`question[3][0].style`]: "numberText-active",
                        })
                    }, 400
                )
            },
            playtime: 800
        },{
            func: () => {
                that.setData({
                    [`question[3][0].style`]: "numberText",
                })
            },
            playtime: 1000
        } ,{
            func: () => {
                Toast('选出每行中数字相同的两个方块过关');
            },
            playtime: 2000
        }, {
            func: () => {

                that.setData({
                    [`question[1][0].style`]: "numberText-active",
                    [`question[1][1].style`]: "numberText-active",
                })
            },

            playtime: 800
        },{
            func: () => {

                that.setData({
                    [`question[2][0].style`]: "numberText-active",
                    [`question[2][3].style`]: "numberText-active",
                })
            },

            playtime: 1000
        },{
            func: () => {

                that.setData({
                    [`question[3][1].style`]: "numberText-active",
                    [`question[3][3].style`]: "numberText-active",
                })
            },

            playtime: 1000
        },{
            func: () => {
                Toast('你必须在规定的时间内完成测试');
            },
            playtime: 2000
        },{
            func: () => {
                that.setData({
                    timershow: "timer-tips",
                })
                setTimeout(() => {
                        that.setData({
                            timershow: "timer",
                        })
                    }, 400
                )
            },
            playtime: 800
        },{
            func: () => {
                that.setData({
                    timershow: "timer-tips",
                })
                setTimeout(() => {
                        that.setData({
                            timershow: "timer",
                        })
                    }, 400
                )
            },
            playtime: 800
        },{
            func: () => {
                Toast('当时间归0你本次测试将不得分');

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

