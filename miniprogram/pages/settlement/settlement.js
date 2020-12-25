import * as echarts from "../../components/ec-canvas/echarts";

let app = getApp()
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
            onInit: null
        },
    },

    onInit: function initChart(canvas, width, height, dpr) {
        const barChart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr,
        });
        canvas.setChart(barChart);
        barChart.setOption(reportDataOption);
        return barChart;
    },

    onLoad: function (option) {
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('reportData', data => {
            console.log(data)
            let totalScore = 0
            let scoreList = []
            reportDataOption.dataset.source = [
                ["计划", 0, 20],
                ["注意", 0, 20],
                ["同时性加工", 0, 20],
                ["继时性加工", 0, 20],
            ]
            for (let key in data.score) {
                let item = data.score[key]
                scoreList.push(item.score)
                totalScore += item.score
                switch (item.category) {
                    case "plan":
                        reportDataOption.dataset.source[0][1] += item.score;
                        break;
                    case "attention":
                        reportDataOption.dataset.source[1][1] += item.score;
                        break;
                    case "simultaneous":
                        reportDataOption.dataset.source[2][1] += item.score;
                        break;
                    case "successive":
                        reportDataOption.dataset.source[3][1] += item.score;
                        break;
                }
            }

            this.setData({
                name: app.globalData.user.information.userName,
                age: app.globalData.user.information.age,
                totalScore: totalScore,
                finishDate: dateFormat(data.finishTime, "yyyy-mm-dd"),
                finishTime: dateFormat(data.finishTime, "HH:MM"),
                ecBar: {
                    disableTouch: true,
                    onInit: this.onInit
                },
            })

            let examRecord = {
                score: data.score,
                totalScore: totalScore,
                date: dateFormat(data.finishTime, "yyyy-mm-dd HH:MM"),
            }

            const db = wx.cloud.database()
            const _ = db.command
            db.collection('user').where({
                _openid: '{openid}',
            }).update({
                data: {
                    history: _.unshift(examRecord)
                },
            }).then(res => {
                console.log('测试记录已上传')
            }).catch(res => {
                console.log('上传失败')
            })

            wx.cloud.callFunction({
                name: 'login',
            }).then(res => {
                console.log(res)
                wx.request({
                    url: 'https://hsaeno.space:443/usertotest/add',
                    method: 'POST',
                    data: {
                        finishTime: dateFormat(data.finishTime, "yyyy-mm-dd HH:MM"),
                        scores: scoreList,
                        userOpenID: res.result.openid,
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded' // 默认值
                    },
                    success: res => {
                        console.log(res.data)
                    }
                })
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