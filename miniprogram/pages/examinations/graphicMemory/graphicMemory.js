import util from "../../../utils/util";
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';

const START = "START"
const DEMO = 'DEMO'
const EXECUTE = 'EXECUTE'

let countDownTimer = null
let subOp = null
let initExamItemOp = {
    steps: null,
    controller: null,
}
let demoOp = {
    steps: null,
    controller: null,
}


Page({
    data: {
        checkPoints: [[3, 3], [3, 4], [4, 5], [4, 6], [5, 7], [5, 8], [6, 9], [6, 10]],
        examMatrix: [],
        targetList: [],
        canInteraction: false,
        examState: START,
        errorCount: 0,
        correctCount: 0,
        currentCheckpoint: 0,
        currentChance: 3,
        currentTime: 0,
        maxTime: 10000,
        readyState: false,
        readyTime: 3,
        entrance: "training",
        lastCheckPoint: 0,
        lastScore: ""
    },

    onLoad: function (options) {
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('entrance', data => {
            this.setData({
                entrance: data.entrance,
            })
            console.log(data)
        })
        this.initCheckpoint(this.data.checkPoints[0][0], this.data.checkPoints[0][1])
    },

    onUnload: function () {
        this.stopDemo()
    },

    startExam: function () {
        clearInterval(countDownTimer)
        this.setData({
            examState: EXECUTE,
            errorCount: 0,
            correctCount: 0,
            currentCheckpoint: 0,
            currentChance: 3,
            currentTime: 0,
        })
        this.initCheckpoint(this.data.checkPoints[0][0], this.data.checkPoints[0][1])
        this.ready()
        this.initExamItem(0)
    },

    initExamItem: function (currentCheckpoint) {
        let that = this
        clearInterval(countDownTimer)
        that.setData({canInteraction: false, currentTime: 0})
        initExamItemOp.steps = [{
            func: () => {
            }, playtime: 2000
        }, {
            func: () => {
                that.setData({
                    currentCheckpoint: currentCheckpoint,
                    correctCount: 0,
                    errorCount: 0,
                })
                that.initCheckpoint(this.data.checkPoints[currentCheckpoint][0], this.data.checkPoints[currentCheckpoint][1])
            }, playtime: 2000
        }, {
            func: () => {
                for (let rowItem of that.data.targetList) {
                    that.switchCellState(rowItem.x, rowItem.y, true)
                }
            }, playtime: 1500
        }, {
            func: () => {
                for (let rowItem of that.data.targetList) {
                    that.switchCellState(rowItem.x, rowItem.y, false)
                }
            }, playtime: 1000
        }, {
            func: () => {
                that.setData({canInteraction: true})
                that.countDown()
            }, playtime: 3000
        },]
        util.syncOperation(initExamItemOp)
    },

    initCheckpoint: function (matrixSize, targetNum) {
        let examMatrix = [];
        let targetList = [];
        let targetSeq = [];
        for (let i = 0; i < matrixSize * matrixSize; i++) {
            targetSeq.push(i)
        }
        let randomTag = targetSeq.length
        for (let i = 0; i < targetNum; i++) {
            let target = Math.floor(Math.random() * randomTag--);
            [targetSeq[randomTag], targetSeq[target]] = [targetSeq[target], targetSeq[randomTag]]
        }
        targetSeq = targetSeq.splice(randomTag)
        for (let i = 0; i < matrixSize; i++) {
            let examLine = []
            for (let j = 0; j < matrixSize; j++) {
                if (targetSeq.includes(matrixSize * i + j)) {
                    examLine.push({
                        isTarget: true,
                        isActive: false,
                    })
                    targetList.push({x: i, y: j})
                } else
                    examLine.push({
                        isTarget: false,
                        isActive: false,
                    })
            }
            examMatrix.push(examLine)
        }
        this.setData({
            examMatrix: examMatrix,
            targetList: targetList
        })
    },

    resetExamItem: function () {
        this.setData({currentChance: this.data.currentChance - 1})
        if (this.data.currentChance === 0) {
            this.settle(this.data.currentCheckpoint)
        } else {
            this.initExamItem(this.data.currentCheckpoint)
        }
    },

    switchCellState: function (x, y, state) {
        this.setData({
            ['examMatrix[' + x + '][' + y + '].isActive']: state ? state : !this.data.examMatrix[x][y].isActive
        })
    },

    activeCell: function (e) {
        if (this.data.canInteraction) {
            let x = e.currentTarget.dataset.x,
                y = e.currentTarget.dataset.y
            if (!this.data.examMatrix[x][y].isActive) {
                this.switchCellState(x, y, true)
                if (this.data.examMatrix[x][y].isTarget) {
                    this.setData({correctCount: this.data.correctCount + 1})
                } else {
                    this.setData({errorCount: this.data.errorCount + 1})
                }
                if (this.data.errorCount === 3) {
                    this.resetExamItem()
                }
                if (this.data.correctCount === this.data.checkPoints[this.data.currentCheckpoint][1]) {
                    if (this.data.currentCheckpoint === this.data.checkPoints.length - 1) {
                        this.settle(this.data.currentCheckpoint + 1)
                    } else {
                        this.initExamItem(this.data.currentCheckpoint + 1)
                    }
                }
            }
        }
    },

    settle: function (level) {
        clearInterval(countDownTimer)
        let score = ""
        if (level === 8) score = "A"
        else if (level >= 6) score = "B"
        else if (level >= 4) score = "C"
        else if (level >= 2) score = "D"
        else if (level >= 0) score = "F"

        if (this.data.entrance === "training") {
            this.setData({
                lastScore: score,
                lastCheckPoint: level,
                examState: "AGAIN",
            })
        } else if (this.data.entrance === "exam") {
            let pages = getCurrentPages();
            let prevPage = pages[pages.length - 2];
            prevPage.setData({
                ['examinations[4].score']: score
            })
            wx.navigateBack()
        }
    },

    countDown: function () {
        countDownTimer = setInterval(() => {
            this.setData({
                currentTime: this.data.currentTime + 10
            })
            if (this.data.currentTime >= this.data.maxTime) {
                clearInterval(countDownTimer)
                if (this.data.examState === EXECUTE)
                    this.resetExamItem()
            }
        }, 10)
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
                this.setData({readyState: false});
                clearInterval(subOp);
            }
        }, 1000);
    },

    viewDemo: function () {
        let that = this
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
                Toast('会有部分方块被翻开')
            }, playtime: 2500
        }, {
            func: () => {
                for (let rowItem of that.data.targetList) {
                    that.switchCellState(rowItem.x, rowItem.y, true)
                }
            }, playtime: 1000
        }, {
            func: () => {
                Toast('你需要记住这些被翻开的方块')
            }, playtime: 2500
        }, {
            func: () => {
                Toast('他们会在 1.5 秒后合上')
            }, playtime: 2500
        }, {
            func: () => {
                for (let targetItem of that.data.targetList) {
                    that.switchCellState(targetItem.x, targetItem.y, false)
                }
                that.countDown()
            }, playtime: 1000
        }, {
            func: () => {
                Toast('你需要规定的时间内重新翻开这些方块')
            }, playtime: 2500
        }, {
            func: () => {
                let targetItem = that.data.targetList[0]
                that.switchCellState(targetItem.x, targetItem.y, true)
                that.setData({
                    correctCount: 1
                })
            }, playtime: 1000
        }, {
            func: () => {
                Toast('当翻开三个错误方块或时间超时时')
            }, playtime: 2500
        }, {
            func: () => {
                clearTimeout(subOp)
                clearInterval(subOp)
                let cnt = 0
                for (let [x, examLine] of that.data.examMatrix.entries()) {
                    for (let [y, targetItem] of examLine.entries()) {
                        if (!targetItem.isTarget) {
                            that.switchCellState(x, y, true)
                            cnt++
                        }
                        if (cnt === 3) break
                    }
                    if (cnt === 3) break
                }
            }, playtime: 1000
        }, {
            func: () => {
                Toast('会扣除一点生命值，并关卡重置')
            }, playtime: 2500
        }, {
            func: () => {
                clearInterval(countDownTimer)
                that.setData({
                    currentChance: 2,
                    correctCount: 0,
                    currentTime: 0,
                })
                that.initCheckpoint(that.data.checkPoints[0][0], that.data.checkPoints[0][1])
            }, playtime: 2000
        }, {
            func: () => {
                clearTimeout(subOp)
                clearInterval(subOp)
                for (let rowItem of that.data.targetList) {
                    that.switchCellState(rowItem.x, rowItem.y, true)
                }
                subOp = setTimeout(() => {
                    for (let rowItem of that.data.targetList) {
                        that.switchCellState(rowItem.x, rowItem.y, false)
                    }
                }, 1500)

            }, playtime: 2500
        }, {
            func: () => {
                that.countDown()
                Toast('翻开所有正确方块进入下一关')
            }, playtime: 2500
        }, {
            func: () => {
                let cnt = 0
                clearTimeout(subOp)
                clearInterval(subOp)
                subOp = setInterval(() => {
                    let targetItem = that.data.targetList[cnt++]
                    that.switchCellState(targetItem.x, targetItem.y, true)
                    that.setData({
                        correctCount: that.data.correctCount + 1,
                    })
                    if (cnt === 3) {
                        clearInterval(subOp)
                        clearInterval(countDownTimer)
                    }
                }, 200)
            }, playtime: 2000
        }, {
            func: () => {
                Toast('生命值归零或完成 8 关时测试结束')
            }, playtime: 2500
        }, {
            func: () => {
                Toast.success({
                    message: '演示完成',
                    onClose: () => {
                        that.setData({
                            examState: START
                        })
                    }
                })
            }, playtime: 0
        },]
        util.syncOperation(demoOp)
    },

    stopDemo: function () {
        clearTimeout(demoOp.controller)
        Toast.clear()
        this.setData({
            examState: START
        })
    },

    exitExamination: function () {
        wx.navigateBack()
    }
})