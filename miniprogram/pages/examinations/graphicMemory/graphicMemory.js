import util from "../../../utils/util";

const ONGOING = "ONGOING"
const PREPARE = "PREPARE"


Page({
    data: {
        checkPoints: [[3, 3], [3, 4], [4, 5], [4, 6], [5, 7], [5, 8], [6, 9], [6, 10]],
        examMatrix: [],
        targetList: [],
        examState: PREPARE,
        errorCount: 0,
        correctCount: 0,
        currentCheckpoint: 0,
        currentChance: 3,
    },

    onLoad: function (options) {

    },

    initExam: function () {
        this.setData({
            examState: PREPARE,
            errorCount: 0,
            correctCount: 0,
            currentCheckpoint: 0,
            currentChance: 3,
        })
        this.initExamItem(0)
    },

    initExamItem: function (currentCheckpoint) {
        this.setData({examState: PREPARE,})
        util.wait(1000)
            .then(() => {
                this.setData({
                    currentCheckpoint: currentCheckpoint,
                    correctCount: 0,
                    errorCount: 0,
                })
                this.initCheckpoint(this.data.checkPoints[currentCheckpoint][0], this.data.checkPoints[currentCheckpoint][1])
            })
            .then(() => util.wait(2000))
            .then(() => {
                for (let rowItem of this.data.targetList) {
                    this.switchCellState(rowItem.x, rowItem.y, true)
                }
            })
            .then(() => util.wait(1500))
            .then(() => {
                for (let rowItem of this.data.targetList) {
                    this.switchCellState(rowItem.x, rowItem.y, false)
                }
                this.setData({
                    examState: ONGOING
                })
            })
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
                        isActive: false
                    })
                    targetList.push({x: i, y: j})
                } else
                    examLine.push({
                        isTarget: false,
                        isActive: false
                    })
            }
            examMatrix.push(examLine)
        }
        this.setData({
            examMatrix: examMatrix,
            targetList: targetList
        })
    },

    activeCell: function (e) {
        if (this.data.examState === ONGOING) {
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
                    this.setData({currentChance: this.data.currentChance - 1})
                    if (this.data.currentChance === 0) {
                        this.settle()
                    } else {
                        this.initExamItem(this.data.currentCheckpoint)
                    }
                }
                if (this.data.correctCount === this.data.checkPoints[this.data.currentCheckpoint][1]) {
                    if (this.data.currentCheckpoint === this.data.checkPoints.length - 1) {
                        this.settle()
                    } else {
                        this.initExamItem(this.data.currentCheckpoint + 1)
                    }
                }
            }
        }
    },

    switchCellState: function (x, y, state) {
        this.setData({
            ['examMatrix[' + x + '][' + y + '].isActive']: state ? state : !this.data.examMatrix[x][y].isActive
        })
    },

    settle: function () {
        this.setData({
            examState: 'Complete'
        })
    }
});