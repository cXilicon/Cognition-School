import util, { shuffle } from "../../../utils/util";
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';

const START = "START"
const DEMO = 'DEMO'
const EXECUTE = 'EXECUTE'
const AGAIN = 'AGAIN'

let countDownTimer = null
let subOp = null
let demoOp = {
    steps: null,
    controller: null,
}

Page({
    data: {
        entrance: "training",
        examState: EXECUTE,
        canInteraction: false,
        currentTime: 0,
        maxTime: 10000,
        readyState: false,
        readyTime: 3,
        lastScore: "",

        lastCorrectCount: 0,
        checkPoints: [[5, 1], [6, 1], [7, 1], [8,  1], [9, 1], [10, 1]],
        currentCheckPoint: 0,
        correctCount: 0,
        optionState: false,
        areaHeight: 400,
        answer: [],
        option: [],

        ansAreaWidth: 0,
        ansAreaHeight: 0,
        ansAreaLeft: 0,
        ansAreaTop: 0,

        optionAreaWidth: 0,
        optionAreaHeight: 0,
        optionAreaLeft: 0,
        optionAreaTop: 0,

        gridWidth: 0,
        gridHeight: 0,
        colNum: 4,
    },

    onLoad: function (options) {
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('entrance', data => {
            this.setData({
                entrance: data.entrance,
            })
            console.log(data)
        })
        this.setData({ examState: START, })
    },

    showData: function () {
        console.log(this.data.answer, this.data.option)
    },

    startExam: function () {
        clearInterval(countDownTimer)
        this.setData({
            option: [],
            answer: [],
            examState: EXECUTE,
            correctCount: 0,
            currentCheckPoint: 0,
            currentTime: 0,
            optionState: false,
            canInteraction: false,
        })
        this.ready().then(() => {
            this.initExamItem(0)
        })
    },

    initExamItem: function (checkPoint) {
        this.setData({
            currentCheckPoint: checkPoint,
            currentTime: 0,
            maxTime: this.data.checkPoints[checkPoint][0] * 1000,
            optionState: false,
        })
        this.initCheckPoint(this.data.checkPoints[checkPoint][0], this.data.checkPoints[checkPoint][1])
        this.countDown()
    },

    initCheckPoint: function (seqLength, digitNum) {
        let answer = []
        let bottom = Math.pow(10, digitNum - 1)
        let top = Math.pow(10, digitNum)
        for (let i = 0; i < seqLength; i++) {
            answer.push({ num: Math.floor(Math.random() * (top - bottom)) + bottom, option: -1 })
        }

        let option = []
        for (let i = 0; i < seqLength; i++) {
            option.push({ num: answer[i].num, x: 0, y: 0, pos: -1 })
        }

        shuffle(option)
        this.setData({
            option: option,
            answer: answer,
            areaHeight: Math.ceil(seqLength / this.data.colNum) < 2 ? 400 : Math.ceil(seqLength / this.data.colNum) * 200
        })

        this.getRect('#answer-area')
            .then(res => {
                this.setData({
                    ansAreaWidth: res.width,
                    ansAreaHeight: res.height,
                    ansAreaLeft: res.left,
                    ansAreaTop: res.top,
                })
            })

        this.getRect('#option-area')
            .then(res => {
                this.setData({
                    optionAreaWidth: res.width,
                    optionAreaHeight: res.height,
                    optionAreaLeft: res.left,
                    optionAreaTop: res.top
                })
            })

        this.getRect('.number-grid')
            .then(res => {
                this.setData({
                    gridWidth: res.width,
                    gridHeight: res.height
                })
            })
    },

    moveOption: function (e) {
        let id = e.currentTarget.id
        this.getRect('#' + id)
            .then(res => {
                let index = res.dataset.index
                let xOff = this.data.option[index].x
                let yOff = this.data.option[index].y
                let pos = this.data.option[index].pos
                let midHeight = res.top + 0.5 * res.height
                if (midHeight <= this.data.ansAreaTop + this.data.ansAreaHeight && midHeight >= this.data.ansAreaTop) {
                    let targetPos = Math.round((res.left - this.data.ansAreaLeft) / this.data.gridWidth)
                        + Math.round((res.top - this.data.ansAreaTop) / this.data.gridHeight) * this.data.colNum
                    let index = res.dataset.index
                    if (targetPos < this.data.answer.length && this.data.answer[targetPos].option === -1) {
                        let areaBias = [this.data.optionAreaLeft - this.data.ansAreaLeft, this.data.optionAreaTop - this.data.ansAreaTop]
                        let optionBlankBias = [this.data.gridWidth * (index % this.data.colNum), this.data.gridHeight * Math.floor(index / this.data.colNum)]
                        let ansBlankBias = [this.data.gridWidth * (targetPos % this.data.colNum), this.data.gridHeight * Math.floor(targetPos / this.data.colNum)]
                        console.log(areaBias, optionBlankBias, ansBlankBias)
                        xOff = 0 - areaBias[0] - optionBlankBias[0] + ansBlankBias[0]
                        yOff = 0 - areaBias[1] - optionBlankBias[1] + ansBlankBias[1]
                        if (pos !== -1) {
                            this.setData({
                                ['answer[' + pos + '].option']: -1,
                            })
                        }
                        pos = targetPos
                        this.setData({
                            ['answer[' + pos + '].option']: index,
                        })
                    }
                } else if (midHeight >= this.data.ansAreaTop + this.data.ansAreaHeight) {
                    xOff = 0;
                    yOff = 0;
                    if (pos !== -1) {
                        this.setData({
                            ['answer[' + pos + '].option']: -1,
                        })
                        pos = -1;
                    }
                }
                this.setData({
                    ['option[' + index + '].x']: xOff,
                    ['option[' + index + '].y']: yOff,
                    ['option[' + index + '].pos']: pos,
                })
            })
    },

    getRect(selector) {
        return new Promise(resolve => {
            wx.createSelectorQuery()
                .select(selector)
                .boundingClientRect()
                .exec(res => {
                    resolve(res[0])
                })
        })
    },

    commit: function () {
        if (this.data.canInteraction) {
            clearInterval(countDownTimer)
            let answer = this.data.answer
            let correctCount = 0
            let res = true
            for (let i = 0, len = answer.length; i < len; i++) {
                if (answer[i].option !== -1 && answer[i].num === this.data.option[answer[i].option].num) {
                    correctCount++
                }
            }
            this.setData({
                canInteraction: false,
                correctCount: this.data.correctCount + correctCount
            })
            console.log(res)
            if (this.data.currentCheckPoint + 1 === this.data.checkPoints.length)
                this.settle()
            else
                this.initExamItem(this.data.currentCheckPoint + 1)
        }

    },

    settle: function () {
        clearInterval(countDownTimer)
        let correctCount = this.data.correctCount
        Toast.success({
            message: '测试完成',
            onClose: () => {
                let score = ""
                if (correctCount >= 40) score = "A"
                else if (correctCount >= 36) score = "B"
                else if (correctCount >= 28) score = "C"
                else if (correctCount >= 20) score = "D"
                else score = "F"

                if (this.data.entrance === "exam") {
                    let pages = getCurrentPages();
                    let prevPage = pages[pages.length - 2];
                    prevPage.setData({
                        ['examinations[7].score']: score
                    })
                    wx.navigateBack()
                } else if (this.data.entrance === "training") {
                    this.setData({
                        lastScore: score,
                        lastCorrectCount: correctCount,
                        examState: AGAIN,
                    })
                }
            }
        })
    },

    countDown: function () {
        countDownTimer = setInterval(() => {
            this.setData({
                currentTime: this.data.currentTime + 10
            })
            if (this.data.currentTime >= this.data.maxTime) {
                clearInterval(countDownTimer)
                if (this.data.examState === EXECUTE) {
                    if (!this.data.optionState) {
                        this.setData({
                            currentTime: 0,
                            maxTime: 30000,
                            optionState: true,
                            canInteraction: true,
                        })
                        this.countDown()
                    } else {
                        this.commit();
                    }
                }
            }
        }, 10)
    },

    ready: function () {
        return new Promise(resolve => {
            let second = 3;
            this.setData({
                readyState: true,
                readyTime: second,
            });
            subOp = setInterval(() => {
                second--;
                if (second) {
                    this.setData({ readyTime: second });
                } else {
                    this.setData({ readyState: false });
                    clearInterval(subOp);
                    resolve()
                }
            }, 1000);
        })
    },

    viewDemo: function () {
        let that = this
        clearTimeout(subOp)
        clearInterval(subOp)
        this.setData({
            examState: DEMO,
        })
        demoOp.steps = [{
            func: () => {
                Toast('测试会在3秒倒计时后开始')
            }, playtime: 2500
        }, {
            func: () => {
                that.ready()
            }, playtime: 3000
        }, {
            func: () => {
                that.initExamItem(0)
                clearInterval(countDownTimer)
                Toast('你需要在一定时间内记住数字')
            }, playtime: 6000
        }, {
            func: () => {
                this.setData({
                    optionState: true,
                })
            }, playtime: 2500
        }, {
            func: () => {
                Toast('通过拖动下方方块还原序列')
            }, playtime: 2500
        }, {
            func: () => {
                let xOff = this.data.optionAreaLeft - this.data.ansAreaLeft
                let yOff = this.data.optionAreaTop - this.data.ansAreaTop
                for (let i = 0; i < 6; i++) {
                    this.setData({
                        ['option[' + i + '].x']: -xOff,
                        ['option[' + i + '].y']: -yOff,
                    })
                }
            }, playtime: 2500
        }, {
            func: () => {
                Toast.success({
                    message: '演示完成',
                    onClose: () => {
                        that.setData({ examState: START })
                    }
                })
            }, playtime: 0
        }]
        util.syncOperation(demoOp)
    },

    stopDemo: function () {
        clearTimeout(demoOp.controller)
        clearTimeout(subOp)
        clearInterval(subOp)
        clearTimeout(countDownTimer)
        this.setData({ readyState: false })
        Toast.clear()
        this.setData({
            examState: START
        })
    },

    exitExamination: function () {
        wx.navigateBack()
    }
});