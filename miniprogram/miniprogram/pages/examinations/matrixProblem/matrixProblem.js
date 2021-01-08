import util, {shuffle, range} from "../../../utils/util";
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
        maxTime: 20000,
        readyState: false,
        readyTime: 3,
        lastScore: "",
        highlight: "",

        matrixItems: [],
        axis: 2,
        currentLayer: 0,
        checkPoints: [[2, 2, 0], [2, 2, 1], [2, 3, 1], [2, 3, 2], [3, 3, 2]],
        currentCheckPoint: 3,
        layerCount: 1,
        dimCount: 2,
        matrixDims: [
            {
                name: 'shape',
                active: true,
                bias: [1, 0, 0],
                set: ['square', 'trapezoid', 'circle', 'heart'],
                value: ['', '', ''],
                selected: [-1],
                optionItems: [],
                answer: [],
            },
            {
                name: 'color',
                active: true,
                bias: [-1, 0, 1],
                set: ['#ec5858', '#fd8c04', '#edf285', "#93abd3", "#9ddfd3", "#e6d5b8"],
                value: ['', '', ''],
                selected: [-1],
                optionItems: [],
                answer: [],
            },
            {
                name: 'gap',
                active: false,
                bias: [1, 1, 0],
                set: [0, 1, 2, 3],
                value: ['', '', ''],
                selected: [-1],
                optionItems: [],
                answer: [],
            }],
        correctCount: 0,
        lastCorrectNum: 0,
        lastTimeUse: 0,
    },

    onLoad: function () {
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('entrance', data => {
            this.setData({
                entrance: data.entrance,
            })
            console.log(data)
        })
        this.setData({examState: START,})
    },

    onUnload: function () {
        this.stopDemo()
    },

    startExam: function () {
        this.setData({examState: EXECUTE})
        this.initExam()
        this.ready().then(() => {
            this.initCheckpoint(
                this.data.checkPoints[this.data.currentCheckPoint][0],
                this.data.checkPoints[this.data.currentCheckPoint][1],
                this.data.checkPoints[this.data.currentCheckPoint][2],
            )
        })
    },

    initExam: function () {
        clearInterval(countDownTimer)
        this.setData({
            currentCheckPoint: 0,
            correctCount: 0,
            currentTime: 0,
            dimCount: 2,
            maxTime: 360000,
        })
        this.data.matrixItems.forEach((item, index) => {
            item.clear()
        })
        let initSelect = []
        for (let i = 0; i < this.data.layerCount; i++) initSelect.push(-1)
        this.data.matrixDims.forEach((dim, index) => {
            this.setData({['matrixDims[' + index + '].selected']: initSelect})
            this.setData({['matrixDims[' + index + '].active']: index < 2})
            dim.optionItems.forEach((item, index) => {
                item.clear()
            })
        })
    },

    initCheckpoint: function (axis, dim, bias) {
        clearInterval(countDownTimer)
        this.setData({
            axis: axis,
            layerCount: axis === 2 ? 1 : 3,
            dimCount: dim,
            currentLayer: 0,
        })

        // 决定维度在其他轴上的偏移
        let biasSeq = []
        for (let i = 0, max = Math.floor(bias / 2); i < max; i++) biasSeq = biasSeq.concat([-1, 1])
        if (bias % 2 === 1) biasSeq.push([-1, 1][Math.floor(Math.random() * 2)])
        for (let i = 0, max = axis * dim - dim - bias; i < max; i++) biasSeq.push(0)
        shuffle(biasSeq)

        // 决定维度被分配在哪个轴
        let axisSeq = []
        for (let i = 0, max = Math.floor(dim / axis); i < max; i++)
            axisSeq = axisSeq.concat(range(axis))
        if (dim % axis === 1) axisSeq.push(range(axis)[Math.floor(Math.random() * 2)])
        shuffle(axisSeq)

        // 决定出现哪几个维度
        let dimSeq = range(this.data.matrixDims.length)
        shuffle(dimSeq)
        dimSeq.splice(dim)
        dimSeq.sort()

        let dimIdx = 0
        this.data.matrixDims.forEach((dim, index) => {
            let active = false;
            let bias = []
            if (dimSeq.includes(index)) {// 确定维度
                active = true
                for (let j = 0; j < axis; j++) {
                    if (axisSeq[dimIdx] === j) bias.push(1)// 分配轴
                    else bias.push(biasSeq.shift())// 确定偏移
                }
                dimIdx++
            }
            this.setData({
                ['matrixDims[' + index + '].active']: active,
                ['matrixDims[' + index + '].bias']: bias
            })
        })


        this.initMatrix()
            .then(() => this.generateMatrix())
            .then(() => this.initOptions())
            .then(() => {
                this.data.matrixDims.forEach((dim) => {
                    if (dim.active) this.generateOptions(dim)
                })
                this.setData({canInteraction: true})
            })
            .then(() => {
                this.countDown()
            })
    },

    commit: function () {
        if (this.data.canInteraction) {
            clearInterval(countDownTimer)
            this.setData({canInteraction: false})
            let flag = true
            this.data.matrixDims.forEach((dim) => {
                if (dim.active) for (let i = 0; i < this.data.layerCount; i++)
                    if (dim.value[dim.selected[i]] !== dim.answer[i]) flag = false
            })
            if (flag) this.setData({correctCount: this.data.correctCount + 1})
            if (this.data.currentCheckPoint === 4)
                this.settle(this.data.correctCount, this.data.currentTime)
            else {
                this.setData({currentCheckPoint: this.data.currentCheckPoint + 1})
                this.initCheckpoint(
                    this.data.checkPoints[this.data.currentCheckPoint][0],
                    this.data.checkPoints[this.data.currentCheckPoint][1],
                    this.data.checkPoints[this.data.currentCheckPoint][2],
                )
            }
        }
    },

    selectOption: function (e) {
        let data = e
        if (this.data.examState !== DEMO)
            data = e.currentTarget.dataset
        if (this.data.canInteraction || this.data.examState === DEMO) {
            let {dim, option, layer} = data
            // 更新选项
            let selected = Array.from(this.data.matrixDims[dim].selected)
            selected[layer] = option === this.data.matrixDims[dim].selected[layer] ? -1 : option
            this.setData({
                ['matrixDims[' + dim + '].selected']: selected,
            })
            this.generateOptions(this.data.matrixDims[dim])
            // 更新图像
            this.data.matrixItems[8].clear()
            for (let i = 0; i < this.data.layerCount; i++) {
                let graph = {shape: null, color: null, gap: null, pos: null, stroke: true, fill: true}
                graph.pos = this.data.layerCount === 3 ? {scale: 0.6, x: i * 40, y: i * 40} : null
                this.data.matrixDims.forEach((dim, index) => {
                    if (dim.active) {
                        graph[dim.name] = dim.value[dim.selected[i]];
                    }
                })
                this.data.matrixItems[8].setGraph(graph)
            }
        }
    },

    initMatrix: function () {
        return new Promise(resolve => {
            let matrixItems = [],
                matrixQuery = wx.createSelectorQuery();
            for (let i = 0; i < 9; i++)
                matrixQuery.select('#matrix-' + i).fields({node: true, size: true})

            matrixQuery.exec(res => {
                for (let i = 0; i < 9; i++) {
                    matrixItems.push(new Graph(res[i]))
                }
                this.setData({
                    matrixItems: matrixItems,
                })
                resolve()
            })
        })
    },

    generateMatrix: function () {
        let that = this
        let matrix = this.data.matrixItems
        let dims = this.data.matrixDims

        // 随机选择对象集合
        dims.forEach((dim, index) => {
            if (dim.active) {
                let set = Array.from(dim.set)
                let len = set.length
                for (let i = 0; i < 3; i++) {
                    let target = i + Math.floor(Math.random() * (len - i));
                    [set[i], set[target]] = [set[target], set[i]]
                }
                this.setData({
                    ['matrixDims[' + index + '].value']: set.slice(0, 3),
                    ['matrixDims[' + index + '].answer']: []
                })
            }
        })


        // 生成矩阵
        function setMatrix(axis, label) {
            if (axis === 0) {
                let itemIdx = label[1] * 3 + label[0]
                let item = matrix[itemIdx]
                let graph = {shape: null, color: null, gap: null, pos: null, stroke: true, fill: true}
                if (label.length >= 3) graph.pos = {scale: 0.6, x: label[2] * 40, y: label[2] * 40}
                if (itemIdx === 8) item.setGraph(graph)

                dims.forEach((dim, index) => {
                    if (dim.active) {
                        let idx = 0
                        label.forEach((element, index) => {
                            idx += dim.bias[index] * element
                        })
                        idx = (idx % 3 + 3) % 3
                        graph[dim.name] = dim.value[idx]
                        if (itemIdx === 8) that.setData({
                            ['matrixDims[' + index + '].answer']: that.data.matrixDims[index].answer.concat(dim.value[idx])
                        })
                    }
                })
                if (itemIdx !== 8) item.setGraph(graph)

            } else {
                for (let i = 0; i < 3; i++) {
                    setMatrix(axis - 1, Array.prototype.concat([i], label))
                }
            }
        }

        setMatrix(this.data.axis, [])

        // 重排列选项
        dims.forEach((dim, index) => {
            if (dim.active) {
                let value = Array.from(dim.value)
                let len = value.length
                for (let i = 0; i < 3; i++) {
                    let target = i + Math.floor(Math.random() * (len - i));
                    [value[i], value[target]] = [value[target], value[i]]
                }
                this.setData({
                    ['matrixDims[' + index + '].value']: value
                })
            }
        })
    },

    initOptions: function () {
        let initOption = (name, index) => {
            return new Promise((resolve) => {
                let optionItem = [],
                    matrixQuery = wx.createSelectorQuery();
                for (let i = 0; i < this.data.layerCount; i++)
                    for (let j = 0; j < 3; j++)
                        matrixQuery.select('#option-' + name + '-' + i + '-' + j).fields({node: true, size: true})

                matrixQuery.exec(res => {
                    for (let i = 0; i < 3 * this.data.layerCount; i++) {
                        optionItem.push(new Graph(res[i]))
                    }
                    this.setData({
                        ['matrixDims[' + index + '].optionItems']: optionItem,
                    })
                    resolve();
                })
            })
        }
        let options = [],
            initSelect = []
        for (let i = 0; i < this.data.layerCount; i++) initSelect.push(-1)
        this.data.matrixDims.forEach((dim, index) => {
            this.setData({
                ['matrixDims[' + index + '].selected']: initSelect
            })
            if (dim.active) options.push(initOption(dim.name, index))
        })
        return Promise.all(options)
    },

    generateOptions: function (dim) {
        dim.optionItems.forEach((option, index) => {
            let layer = Math.floor(index / 3),
                seq = index % 3;
            option.setGraph({
                color: dim.name === 'color' ? dim.value[seq] : dim.selected[layer] === seq ? '#ffffff' : '#cccccc',
                shape: dim.name === 'shape' ? dim.value[seq] : 'square',
                gap: dim.name === 'gap' ? dim.value[seq] : null,
                fill: true
            })
        })
    },

    settle: function (correct, time) {
        time /= 1000
        Toast.success({
            message: '测试完成',
            onClose: () => {
                let score = ""
                let total = correct * 20;
                if (time <= 120) total *= 1.2
                else if (time <= 180) total *= 1.1
                else if (time <= 240) total *= 1.0
                else if (time <= 300) total *= 0.9
                else total *= 0.8
                if (total >= 90) score = "A"
                else if (total >= 80) score = "B"
                else if (total >= 70) score = "C"
                else if (total >= 60) score = "D"
                else score = "F"
                if (this.data.entrance === "exam") {
                    let pages = getCurrentPages();
                    let prevPage = pages[pages.length - 2];
                    prevPage.setData({
                        ['examinations[5].score']: score
                    })
                    wx.navigateBack()
                } else if (this.data.entrance === "training") {
                    this.setData({
                        lastScore: score,
                        lastCorrectNum: correct,
                        lastTimeUse: time,
                        examState: AGAIN,
                    })
                }
            }
        })
    },

    countDown: function () {
        countDownTimer = setInterval(() => {
            this.setData({
                currentTime: this.data.currentTime + 50
            })
            if (this.data.currentTime >= this.data.maxTime) {
                clearInterval(countDownTimer)
                if (this.data.examState === EXECUTE)
                    this.settle(this.data.correctCount, this.data.currentTime)
            }
        }, 50)
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
                    this.setData({readyTime: second});
                } else {
                    this.setData({readyState: false});
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
                that.initExam()
                Toast('测试会在3秒倒计时后开始')
            }, playtime: 2500
        }, {
            func: () => {
                that.ready()
            }, playtime: 3200
        }, {
            func: () => {
                Toast('九宫格中会出现 8 个图案')
                that.initCheckpoint(2, 2, 0)
            }, playtime: 2500
        }, {
            func: () => {
                that.setData({highlight: 'matrix'})
                subOp = setTimeout(() => {
                    that.setData({highlight: ''})
                }, 300)
            }, playtime: 600
        }, {
            func: () => {
                that.setData({highlight: 'matrix'})
                subOp = setTimeout(() => {
                    that.setData({highlight: ''})
                }, 300)
            }, playtime: 600
        }, {
            func: () => {
                Toast('你需要在时间结束前推理出第九项')
            }, playtime: 2500
        }, {
            func: () => {
                that.setData({highlight: 'target'})
                subOp = setTimeout(() => {
                    that.setData({highlight: ''})
                }, 300)
            }, playtime: 600
        }, {
            func: () => {
                that.setData({highlight: 'target'})
                subOp = setTimeout(() => {
                    that.setData({highlight: ''})
                }, 300)
            }, playtime: 600
        }, {
            func: () => {
                Toast('点击下方选择区域完成推理结果')
            }, playtime: 2500
        }, {
            func: () => {
                that.setData({highlight: 'options'})
                subOp = setTimeout(() => {
                    that.setData({highlight: ''})
                }, 300)
            }, playtime: 600
        }, {
            func: () => {
                that.setData({highlight: 'options'})
                subOp = setTimeout(() => {
                    that.setData({highlight: ''})
                }, 300)
            }, playtime: 600
        }, {
            func: () => {
                that.data.matrixDims.forEach((dim, index) => {
                    if (dim.answer.length !== 0) {
                        that.selectOption({dim: index, option: dim.value.indexOf(dim.answer[0]), layer: 0})
                    }
                })
            }, playtime: 600
        }, {
            func: () => {
                Toast('提交后即可进入下一关')
            }, playtime: 2500
        }, {
            func: () => {
                that.setData({highlight: 'commit'})
                subOp = setTimeout(() => {
                    that.setData({highlight: ''})
                }, 300)
            }, playtime: 600
        }, {
            func: () => {
                Toast('随着难度的增大，你会见到如下题目')
                that.initCheckpoint(3, 3, 2)
            }, playtime: 2500
        }, {
            func: () => {
                Toast('你需要左右滑动选项来选择图形')
            }, playtime: 2500
        }, {
            func: () => {
                that.setData({currentLayer: 1})
                subOp = setTimeout(() => {
                    that.setData({currentLayer: 0})
                }, 1000)
            }, playtime: 2500
        }, {
            func: () => {
                clearInterval(countDownTimer)
                Toast.success({
                    message: '演示完成',
                    onClose: () => {
                        that.setData({examState: START})
                    }
                })
            }, playtime: 0
        },]
        util.syncOperation(demoOp)
    },

    stopDemo: function () {
        clearTimeout(demoOp.controller)
        clearTimeout(subOp)
        clearInterval(subOp)
        clearInterval(countDownTimer)
        Toast.clear()
        this.setData({
            readyState: false,
            examState: START
        })
    },

    exitExamination: function () {
        wx.navigateBack()
    },
})

function Graph(target) {
    [this.ctx, this.canvas] = this.init(target)
}

Object.assign(Graph.prototype, {
    init: function (target) {
        const canvas = target.node
        const ctx = canvas.getContext('2d')
        canvas.width = target.width
        canvas.height = target.height
        ctx.scale(target.height / 120, target.width / 120)
        return [ctx, canvas]
    },

    clear: function () {
        this.ctx.clearRect(0, 0, 120, 120)
    },

    setGraph: function (desc) {
        this.ctx.save();
        if (desc.pos) {
            this.ctx.scale(desc.pos.scale, desc.pos.scale)
            this.ctx.translate(desc.pos.x, desc.pos.y)
        }
        if (desc.color) {
            this.ctx.fillStyle = desc.color
        } else {
            this.ctx.fillStyle = 'rgba(204, 204, 204, 0.8)'
        }
        if (desc.gap != null) {
            let radius = 20;
            let start = [[60, 60 - radius], [60 + radius, 60], [60, 60 + radius], [60 - radius, 60]]
            let corner = [[0, 0], [120, 0], [120, 120], [0, 120]]
            let middle = [[60, 0], [120, 60], [60, 120], [0, 60]]
            this.ctx.beginPath();
            this.ctx.moveTo(start[desc.gap][0], start[desc.gap][1]);
            this.ctx.lineTo(middle[desc.gap][0], middle[desc.gap][1])
            for (let i = 1; i <= 3; i++)
                this.ctx.lineTo(corner[(desc.gap + i) % 4][0], corner[(desc.gap + i) % 4][1])
            this.ctx.lineTo(middle[(desc.gap + 3) % 4][0], middle[(desc.gap + 3) % 4][1])
            this.ctx.lineTo(start[(desc.gap + 3) % 4][0], start[(desc.gap + 3) % 4][1])
            this.ctx.quadraticCurveTo(60, 60, start[desc.gap][0], start[desc.gap][1]);
            this.ctx.clip();
        }
        this.ctx.beginPath();
        if (desc.shape === 'square') {
            this.roundedRect(this.ctx, 30, 30, 60, 60, 0)
        } else if (desc.shape === 'triangle') {
            this.ctx.moveTo(60, 25);
            this.ctx.lineTo(25, 90);
            this.ctx.lineTo(95, 90);
        } else if (desc.shape === 'circle') {
            this.ctx.arc(60, 60, 32, 0, Math.PI * 2)
        } else if (desc.shape === 'trapezoid') {
            this.ctx.moveTo(40, 35);
            this.ctx.lineTo(80, 35);
            this.ctx.lineTo(95, 85);
            this.ctx.lineTo(25, 85);
            this.ctx.lineTo(40, 35)
        } else if (desc.shape === 'heart') {
            this.ctx.moveTo(60, 40);
            this.ctx.bezierCurveTo(60, 36, 57, 30, 45, 30)
            this.ctx.bezierCurveTo(27, 30, 27, 52, 27, 52)
            this.ctx.bezierCurveTo(27, 63, 39, 76, 60, 90)
            this.ctx.bezierCurveTo(81, 76, 93, 63, 93, 52)
            this.ctx.bezierCurveTo(93, 52, 93, 30, 75, 30)
            this.ctx.bezierCurveTo(66, 30, 60, 36, 60, 39)
        } else if (desc.shape === 'rectangle') {
            this.roundedRect(this.ctx, 30, 40, 60, 40, 8)
        } else {
            this.ctx.save()
            this.ctx.lineWidth = 4;
            this.ctx.setLineDash([8, 4]);
            this.ctx.strokeRect(30, 30, 60, 60);
            this.ctx.fillRect(30, 30, 60, 60);
            this.ctx.restore();
        }
        if (desc.stroke) {
            this.ctx.lineWidth = 2;
            this.ctx.stroke()
        }
        if (desc.fill)
            this.ctx.fill()
        this.ctx.restore();
    },

    roundedRect: function (ctx, x, y, width, height, radius) {
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + height - radius);
        ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
        ctx.lineTo(x + width - radius, y + height);
        ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
        ctx.lineTo(x + width, y + radius);
        ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
        ctx.lineTo(x + radius, y);
        ctx.quadraticCurveTo(x, y, x, y + radius);
    }
})
