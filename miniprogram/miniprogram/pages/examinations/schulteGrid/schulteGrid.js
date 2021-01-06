import util from "../../../utils/util";
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';

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
        //
        entrance: "training",
        examState: "",
        canInteraction: false,
        currentTime: 0,
        maxTime: 120000,
        readyState: false,
        readyTime: 3,
        lastScore: "",
        showNum: false,

        grid: [], // 用于生成方块的数组
        flag: 0, // 标记已选方块

        highlight: 0,
        lastTimeCount: "",
    },

    onLoad: function () { // 页面加载
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('entrance', data => {
            this.setData({
                entrance: data.entrance,
            })
            console.log(data)
        })
        this.initExam()
        this.setData({
            examState: START,
        })
    },

    onUnload: function () {
        clearInterval(timer)
        this.stopDemo()
    },

    startExam: function () {
        this.initExam()
        this.ready()
        this.setData({examState: EXECUTE})
    },

    initExam: function () {
        clearInterval(timer);
        let num = [];
        let grid = [];
        for (let i = 0; i < 25; i++) {
            num.push(i + 1);
        }
        for (let i = 0; i < 5; i++) {
            let tmp = [];
            for (let j = 0; j < 5; j++) {
                let idx = Math.floor(Math.random() * (25 - 5 * i - j));
                tmp.push(num[idx]);
                num.splice(idx, 1);
            }
            grid.push(tmp);
        }
        this.setData({ // 更新数据
            grid: grid,
            flag: 0,
            currentTime: 0,
            showNum: false,
        })
    },

    tapCell: function (e) { // 方块点击事件
        if (this.data.canInteraction && this.data.examState) {
            let num = e.currentTarget.dataset.num - 1;
            this.triggerNum(num)
        }
    },

    triggerNum: function (num) {
        if (this.data.flag === num) { // 确认该方块可以被点击
            if (num === 24) { // 点击最后一个方块停止游戏并记录时间
                clearInterval(timer);
                if (this.data.examState === EXECUTE) {
                    this.setData({canInteraction: false,})
                    this.settle(this.data.currentTime)
                }
            }
            this.setData({
                flag: this.data.flag + 1,
            })
        }
    },

    ready: function () {
        let second = 3;
        this.setData({
            readyState: true,
            readyTime: second,
        });
        subOp = setInterval(() => {
            second--;
            if (second) {
                this.setData({readyTime: second});
            } else {
                this.setData({readyState: false, showNum: true});
                if (this.data.examState === EXECUTE) {
                    this.timer();
                    this.setData({
                        canInteraction: true,
                    })
                }
                clearInterval(subOp);
            }
        }, 1000);
    },

    timer: function () {
        timer = setInterval(() => {
            this.setData({
                currentTime: this.data.currentTime + 10
            })
            if (this.data.currentTime >= this.data.maxTime) {
                clearInterval(timer)
                this.settle(this.data.currentTime)
            }
        }, 10)
    },

    viewDemo: function () {
        let that = this
        this.initExam()
        clearTimeout(subOp)
        clearInterval(subOp)
        this.setData({
            examState: DEMO,
        })
        demoOp.steps = [{
            func: () => {
                Toast('等待提示结束后开始测试');
            }, playtime: 2500
        }, {
            func: () => {
                that.ready()
            }, playtime: 3000
        }, {
            func: () => {
                that.timer()
                Toast('点击含有数字1的方块');
            }, playtime: 2500
        }, {
            func: () => {
                that.setData({
                    highlight: 1,
                })
                subOp = setTimeout(() => {
                    that.setData({
                        highlight: 0,
                    })
                }, 400)
            }, playtime: 800
        }, {
            func: () => {
                that.setData({
                    highlight: 1,
                })
                subOp = setTimeout(() => {
                    that.setData({
                        highlight: 0,
                    })
                }, 400)
            }, playtime: 800
        }, {
            func: () => {
                that.triggerNum(0)
            }, playtime: 1000
        }, {
            func: () => {
                Toast('点击含有数字2的方块');
            }, playtime: 2500
        }, {
            func: () => {
                that.setData({
                    highlight: 2,
                })
                subOp = setTimeout(() => {
                    that.setData({
                        highlight: 0,
                    })
                }, 400)
            }, playtime: 800
        }, {
            func: () => {
                that.setData({
                    highlight: 2,
                })
                subOp = setTimeout(() => {
                    that.setData({
                        highlight: 0,
                    })
                }, 400)
            }, playtime: 800
        }, {
            func: () => {
                that.triggerNum(1)
            }, playtime: 1000
        }, {
            func: () => {
                Toast('依次点击剩下的数字方块');
            }, playtime: 2500
        }, {
            func: () => {
                let numNow = 2;
                let tapControl = setInterval(() => {
                    if (numNow < 25) {
                        that.triggerNum(numNow++)
                    } else {
                        clearInterval(tapControl)
                    }
                }, 300)
            }, playtime: 7500
        }, {
            func: () => {
                Toast('点击最后一个数字后测试结束')
            }, playtime: 2500
        }, {
            func: () => {
                Toast.success({
                    message: '演示完成',
                    onClose: () => {
                        that.setData({
                            examState: START,
                        })
                    }
                })
            }, playtime: 0
        },]
        util.syncOperation(demoOp)
    },

    stopDemo: function () {
        clearTimeout(demoOp.controller)
        clearTimeout(timer)
        clearTimeout(subOp)
        clearInterval(subOp)
        this.setData({readyState: false})
        Toast.clear()
        this.setData({
            examState: START
        })
    },

    settle: function (millisecond) {
        let that = this
        let second = Math.floor(millisecond / 1000)
        Toast.success({
            message: '测试完成',
            forbidClick: true,
            onClose: () => {
                let score;
                if (second < 30) score = 'A'
                else if (second < 45) score = 'B'
                else if (second < 60) score = 'C'
                else if (second < 90) score = 'D'
                else score = 'F'

                if (that.data.entrance === 'exam') {
                    let pages = getCurrentPages();
                    let prevPage = pages[pages.length - 2];
                    prevPage.setData({
                        ['examinations[0].score']: score
                    })
                    wx.navigateBack()
                } else {
                    let lastTimeCount = Math.floor(second)
                    that.setData({
                        lastScore: score,
                        lastTimeCount: lastTimeCount + "s",
                        examState: AGAIN,
                    })
                }
            }
        });
    },

    exitExamination: function () {
        wx.navigateBack()
    },
})