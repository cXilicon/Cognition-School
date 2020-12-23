Page({
    data: {
        matrixItems: [],
        optionItems: []
    },

    onLoad: function () {
        let matrixItems = [],
            optionItems = [],
            matrixQuery = wx.createSelectorQuery(),
            optionQuery = wx.createSelectorQuery();
        for (let i = 0; i < 9; i++)
            matrixQuery.select('#matrix-' + i).fields({node: true, size: true})
        for (let i = 0; i < 3; i++)
            optionQuery.select('#option-' + i).fields({node: true, size: true})
        matrixQuery.exec(res => {
            for (let i = 0; i < 9; i++) {
                matrixItems.push(new Graph(res[i]))
            }
        })
        optionQuery.exec(res => {
            for (let i = 0; i < 3; i++) {
                optionItems.push(new Graph(res[i]))
            }
        })
        this.setData({
            matrixItems: matrixItems,
            optionItems: optionItems
        })
    },

    show: function () {
        let matrix = new Matrix(this.data.matrixItems, this.data.optionItems)
        matrix.generateComb()
    },

    clear: function () {
        let matrixItems = this.data.matrixItems
        for (let matrixItem of matrixItems) {
            matrixItem.clear()
        }
    },

    test: function () {
        console.log(this.data)
    }
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

    setStyle: function (style) {
        this.ctx.lineJoin = "round"
        if (style.color)
            this.ctx.fillStyle = style.color
    },

    setGraph: function (desc) {
        this.ctx.save();
        if (desc.pos) {
            this.ctx.scale(desc.pos.scale, desc.pos.scale)
            this.ctx.translate(desc.pos.x, desc.pos.y)
        }
        if (desc.gap != null) {
            let corner = [[0, 0], [120, 0], [120, 120], [0, 120]]
            let middle = [[60, 0], [120, 60], [60, 120], [0, 60]]
            this.ctx.beginPath();
            this.ctx.moveTo(60, 60);
            this.ctx.lineTo(middle[desc.gap][0], middle[desc.gap][1])
            for (let i = 1; i <= 3; i++)
                this.ctx.lineTo(corner[(desc.gap + i) % 4][0], corner[(desc.gap + i) % 4][1])
            this.ctx.lineTo(middle[(desc.gap + 3) % 4][0], middle[(desc.gap + 3) % 4][1])
            this.ctx.lineTo(60, 60)
            this.ctx.clip();
        }
        this.ctx.beginPath();
        if (desc.shape === 'rectangle') {
            this.ctx.fillRect(30, 30, 60, 60)
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
        } else if (desc.shape === 'heart') {
            this.ctx.moveTo(60, 40);
            this.ctx.bezierCurveTo(60, 36, 57, 30, 45, 30)
            this.ctx.bezierCurveTo(27, 30, 27, 52, 27, 52)
            this.ctx.bezierCurveTo(27, 63, 39, 76, 60, 90)
            this.ctx.bezierCurveTo(81, 76, 93, 63, 93, 52)
            this.ctx.bezierCurveTo(93, 52, 93, 30, 75, 30)
            this.ctx.bezierCurveTo(66, 30, 60, 36, 60, 39)
        }
        this.ctx.fill()

        this.ctx.restore();
    },
})

function Matrix(matrix, options) {
    this.matrix = matrix
    this.options = options
    this.axis = 3
    this.graphDim = {
        color: {
            active: true,
            bias: [0, -1, 1],
            set: ['#ec5858', '#fd8c04', '#edf285', "#93abd3", "#9ddfd3", "#e6d5b8"],
            value: []
        },
        shape: {
            active: true,
            bias: [1, 0, -1],
            set: ['rectangle', 'trapezoid', 'circle', 'heart'],
            value: []
        },
        gap: {
            active: true,
            bias: [-1, 1, 0],
            set: [0, 1, 2, 3],
            value: []
        }
    }

    this.generateMatrix = function () {
        let that = this
        let matrix = this.matrix
        let options = this.options
        let answer = [];

        for (let [dim, attr] of Object.entries(this.graphDim)) {
            if (attr.active) {
                let set = attr.set
                let len = set.length
                for (let i = 0; i < 3; i++) {
                    let target = i + Math.floor(Math.random() * (len - i));
                    [set[i], set[target]] = [set[target], set[i]]
                }
                attr.value = set.slice(0, 3)
            }
        }

        function setMatrix(axis, label) {
            if (axis === 0) {
                let item = matrix[label[1] * 3 + label[0]]
                let style = {color: null,}
                let graph = {shape: null, gap: null, pos: null,}
                if (label.length >= 3) graph.pos = {scale: 0.6, x: label[2] * 40, y: label[2] * 40}


                let answerFlag = false
                if (label[0] === 2 && label[1] === 2) {
                    answer = true
                }

                for (let [dim, attr] of Object.entries(that.graphDim)) {
                    if (attr.active) {
                        let idx = 0
                        label.forEach((element, index) => {
                            idx += attr.bias[index] * element
                        })
                        idx = (idx % 3 + 3) % 3
                        if (dim === "color") style.color = attr.value[idx]
                        else if (dim === "shape") graph.shape = attr.value[idx]
                        else if (dim === "gap") graph.gap = attr.value[idx]
                    }
                }

                item.ctx.save()
                item.setStyle(style)
                item.setGraph(graph)
                item.ctx.restore()
            } else {
                for (let i = 0; i < 3; i++) {
                    setMatrix(axis - 1, Array.prototype.concat([i], label))
                }
            }
        }

        setMatrix(this.axis, [])

        for (let option of options){
            console.log(option)
        }

        options[2].ctx.save()
        options[2].setStyle(answer.style)
        options[2].setGraph(answer.graph)
        options[2].restore()
    }

    this.generateComb = function () {
        this.generateMatrix()
    }
}