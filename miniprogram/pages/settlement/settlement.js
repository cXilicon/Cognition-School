import * as echarts from "../../components/ec-canvas/echarts";

const dateFormat = require('dateformat');

Page({
    data: {
        name: '',
        age: '',
        finishDate: '',
        finishTime: '',
        totalScore: 0,
        ecBar: {
            disableTouch: true,
            onInit: function initChart(canvas, width, height, dpr) {
                const barChart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr, // new
                });
                canvas.setChart(barChart);
                // reportDataOption.dataset.source =
                barChart.setOption(reportDataOption);
                return barChart;
            }
        },
    },

    onLoad: function (option) {
        let that = this
        console.log(option.query)
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('reportData', function (data) {
            console.log(data)
            let totalScore = 0
            for (let i = 0; i < 4; i++) {
                reportDataOption.dataset.source[i][1] = data.score[i * 2] + data.score[i * 2 + 1]
                totalScore += data.score[i * 2] + data.score[i * 2 + 1]
            }
            console.log(totalScore)
            that.setData({
                name: data.name,
                age: data.age,
                totalScore: totalScore,
                finishDate: dateFormat(data.finishTime, "yyyy-mm-dd"),
                finishTime: dateFormat(data.finishTime, "HH:MM")
            })
        })
    }
});

let colorList = ["#ff927c", "#f5b461", "#f3eac2", "#9ad3bc"];

let reportDataOption = {
    dataset: {
        dimensions: ["item", "score", "max"],
        source: [
            ["计划", 0, 20],
            ["注意", 0, 20],
            ["同时性加工", 0, 20],
            ["继时性加工", 0, 20],
        ],
    },
    grid: {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20,
    },
    yAxis: {
        type: 'category',
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        inverse: true,
        axisLabel: {
            inside: true,
            fontSize: 20,
            margin: 0,
            color: "#333333",
            padding: [0, 0, 10, 0],
            opacity: 0.8,
        },
        z: 10
    },
    xAxis: {
        type: 'value',
        show: false,
        max: 20
    },
    series: [{
        encode: {
            x: 'max',
            y: 'item'
        },
        label: {
            show: true,
            formatter: '{@[1]}',
            position: 'insideTopRight',
            color: "#333333"
        },
        barMaxWidth: 20,
        type: 'bar',
        itemStyle: {
            barBorderRadius: 40,
            color: 'transparent'
        },
        barGap: "-100%",
        z: 10,
    }, {
        encode: {
            x: 'score',
            y: 'item'
        },
        barMaxWidth: 20,
        type: 'bar',
        roundCap: true,
        itemStyle: {
            barBorderRadius: 40,
            color: function (params) {
                return colorList[params.dataIndex];
            },
        },
        animationEasing: "bounceOut",
        z: 0
    }, {
        encode: {
            x: 'max',
            y: 'item'
        },
        barMaxWidth: 20,
        type: 'bar',
        roundCap: true,
        itemStyle: {
            barBorderRadius: 40,
            color: '#eeeeee'
        },
        barGap: "-100%",
        z: -10,
    },]
};