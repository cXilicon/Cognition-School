//index.js
let init;
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';

Page({
    data: {
        ruleState: false,
        examState: false,
        demoState: false,
        array: [], // 用于生成方块的数组
        flag: 0, // 标记已选方块
        timeCount: "0:00", // 计时器文字
        second: 0, // 计时器 - 秒
        millisecond: 0, // 计时器 - 毫秒
        startCountDownState: false,
        startCountDown: 3,
    },

    onLoad: function () { // 页面加载
        this.initGame();
    },

    onUnload() { // 页面退出 - 清空计时器
        clearInterval(init);
    },

    startExam: function () {
        this.setData({
            ruleState: false,
        })
        this.prepare()
    },

    initGame: function () { // 游戏初始化
        clearInterval(init);
        let num = [];
        let list = [];
        for (let i = 0; i < 25; i++) {
            num.push(i + 1);
        }
        for (let i = 0; i < 5; i++) { // 随机打乱方块数组
            let tmp = [];
            for (let j = 0; j < 5; j++) {
                let idx = Math.floor(Math.random() * (25 - 5 * i - j));
                tmp.push(num[idx]);
                num.splice(idx, 1);
            }
            list.push(tmp);
        }
        this.setData({ // 更新数据
            examState: false,
            demoState: false,
            ruleState: true,
            timeCount: "0:00",
            array: list,
            flag: 0,
        })
    },

    tapNum: function (e) { // 方块点击事件
        if (this.data.examState) {
            let num = e.currentTarget.dataset.num - 1;
            this.triggerNum(num)
        }
    },

    prepare: function () {
        let that = this
        this.setData({
            startCountDown: 3,
            startCountDownState: true
        })
        const countdown = setInterval(() => {
            if (that.data.startCountDown - 1) {
                that.setData({
                    startCountDown: that.data.startCountDown - 1,
                });
            } else {
                that.setData({
                    startCountDownState: false,
                    examState: true,
                    millisecond: 0,
                    second: 0,
                });
                clearInterval(init);
                init = setInterval(that.timer, 10);
                clearInterval(countdown);
            }
        }, 1000);
    },

    triggerNum: function (num) {
        if (this.data.flag === num) { // 确认该方块可以被点击
            if (num === 24) { // 点击最后一个方块停止游戏并记录时间
                clearInterval(init);
                this.finishExam()
            }
            this.setData({
                flag: this.data.flag + 1,
            })
        }
    },

    finishExam: function () {
        if (!this.data.demoState)
            this.settle()
        else {
            Notify.clear()
            Toast.success({
                message: '演示完成',
                forbidClick: true,
                onClose: () => {
                    this.initGame()
                }
            });
        }
    },

    // 计时器
    timer: function () {
        this.setData({
            millisecond: this.data.millisecond + 1
        })
        if (this.data.millisecond >= 100) {
            this.setData({
                millisecond: 0,
                second: this.data.second + 1
            })
        }
        this.setData({
            timeCount: this.data.second + ":" + (this.data.millisecond < 10 ? "0" + this.data.millisecond : this.data.millisecond),
        })
    },


    // 查看演示
    viewDemo: function () {
        let that = this
        this.setData({
            ruleState: false,
            demoState: true,
        })
        let notify = Notify({
            type: 'success',
            message: '第一步\n等待提示结束后开始测试',
            duration: 0,
            safeAreaInsetTop: true,
        });
        let step0 = {
            func: () => {
                that.prepare()
            },
            playtime: 3000
        }
        let step1 = {
            func: () => {
                notify.setData({
                    message: '第二步\n1-25依次点击数字方块'
                })
                let numNow = 0;
                let tapControl = setInterval(() => {
                    if (numNow < 25) {
                        that.triggerNum(numNow++)
                    } else {
                        clearInterval(tapControl)
                    }
                }, 500)
            },
            playtime: 3000
        }
        let stepIdx = 0
        let steps = [step0, step1]
        setTimeout(function play() {
            if (stepIdx < steps.length) {
                console.log(stepIdx)
                steps[stepIdx].func()
                setTimeout(play, steps[stepIdx++].playtime);
            }
        }, 0);
    },


    // 结算
    settle: function () {
        let that = this
        Toast.success({
            message: '测试完成',
            forbidClick: true,
            onClose: () => {
                let second = that.data.second
                let score;
                if (second < 15)
                    score = 'A'
                else if (second < 25)
                    score = 'B'
                else if (second < 35)
                    score = 'C'
                else if (second < 45)
                    score = 'D'
                else
                    score = 'F'
                let pages = getCurrentPages();
                let prevPage = pages[pages.length - 2];
                prevPage.setData({
                    ['examinations[0].score']: score
                })
                wx.navigateBack()
            }
        });
    }
})