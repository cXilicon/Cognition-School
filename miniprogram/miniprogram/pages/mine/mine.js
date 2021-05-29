// pages/mine/mine.js
import * as echarts from "../../components/ec-canvas/echarts";

let app = getApp()
const dateFormat = require('dateformat');

Page({
    data: {
        ecBar: {
            disableTouch: true,
            onInit: null
        },
        examinationDetailShow: false,
        hasUserInfo: false,
        userInfo: {
            avatarUrl: null,
            nickName: null,
            age: null,
            tags: null,
        },
        history: [],
        detail: {
            total: 0,
            plan: 0,
            attention: 0,
            simultaneous: 0,
            successive: 0,
            finishDate: null,
        }
    },

    onInit: function (canvas, width, height, dpr) {
        const barChart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr, // new
        });
        canvas.setChart(barChart);
        barChart.setOption(getAbilityChart);
        return barChart;
    },

    onShow: function () {
        if (this.data.hasUserInfo) {
            this.getInfo()
        }
    },

    getInfo: function () {
        let that = this
        let userInfo = app.globalData.userInfo.information
        let age = userInfo.age
        let edu = userInfo.edu
        let tags = [age + '岁', '学历: ' + edu].join(' | ')
        console.log(tags)
        this.setData({
            userInfo: {
                avatarUrl: userInfo.avatarUrl,
                nickName: userInfo.userName,
                age: userInfo.age,
                tags: tags,
            }
        })

        const db = wx.cloud.database()
        db.collection('user').where({
            _openid: '{openid}',
        }).get().then(res => {
            console.log('成功获取记录', res.data[0])
            let history = res.data[0].history
            if (history.length !== 0) {
                let recent = history[0]
                for (let key in recent.score) {
                    let item = recent.score[key]
                    switch (item.category) {
                        case "plan":
                            getAbilityChart.dataset.source[0][1] += item.score;
                            break;
                        case "attention":
                            getAbilityChart.dataset.source[1][1] += item.score;
                            break;
                        case "simultaneous":
                            getAbilityChart.dataset.source[2][1] += item.score;
                            break;
                        case "successive":
                            getAbilityChart.dataset.source[3][1] += item.score;
                            break;
                    }
                }
            }
            that.setData({
                ecBar: {
                    disableTouch: true,
                    onInit: that.onInit
                },
                history: history
            })
        }).catch((res) => {
            console.log('获取失败', res)
        })
    },

    showExaminationDetail: function (e) {
        let data = e.currentTarget.dataset.exam
        let total = 0
        let plan = 0
        let attention = 0
        let simultaneous = 0
        let successive = 0
        for (let key in data.score) {
            let item = data.score[key]
            total += item.score
            switch (item.category) {
                case "plan":
                    plan += item.score;
                    break;
                case "attention":
                    attention += item.score;
                    break;
                case "simultaneous":
                    simultaneous += item.score;
                    break;
                case "successive":
                    successive += item.score;
                    break;
            }
        }
        this.setData({
            detail: {
                total: total,
                plan: plan,
                attention: attention,
                simultaneous: simultaneous,
                successive: successive,
                finishDate: data.date,
            },
            examinationDetailShow: true,
        });
    },

    closeExamDetail: function () {
        this.setData({
            examinationDetailShow: false,
        });
    },

    editUserInfo: function () {
        wx.navigateTo({
            url: '/pages/userInfo/userInfo',
            success: res => {
                res.eventChannel.emit('wxUserInfo', {
                    type: 'edit',
                    userInfo: app.globalData.userInfo.information,
                })
            }
        })
    },

    onLoad: function () {
        let that = this
        const db = wx.cloud.database()
        db.collection('user').where({
            _openid: '{openid}',
        }).get().then(res => {
            console.log(res)
            if (res.data.length !== 0) {
                let user = res.data[0]
                user.information['avatarUrl'] = user.information.avatarUrl
                user.information['age'] = new Date(new Date().getTime() - user.information.birth.getTime()).getFullYear() - 1970
                app.globalData.userInfo = user
                that.setData({
                    hasUserInfo: true
                })
                this.getInfo()
            } else {
                console.log('未查询到数据');
                that.setData({
                    hasUserInfo: false
                })
            }
        }).catch(res => {
            console.log('数据库读取错误', res)
            that.setData({
                hasUserInfo: false
            })
        })
    },

    signUp: function (e) {
        wx.getUserProfile({
            desc: '用于完善用户资料',
            lang: 'zh_CN'
        }).then((data) => {
            console.log(data);
            wx.navigateTo({
                url: '/pages/userInfo/userInfo',
                success: res => {
                    res.eventChannel.emit('wxUserInfo', {
                        type: 'signUp',
                        userInfo: data.userInfo,
                    })
                }
            })
        })
    },
});

let colorList = ["#ec524b", "#f5b461", "#f3eac2", "#9ad3bc"];

let getAbilityChart = {
    dataset: {
        dimensions: ["item", "score", "max"],
        source: [
            ["计划", 0, 20],
            ["注意", 0, 20],
            ["同时性加工", 0, 20],
            ["继时性加工", 0, 20],
        ],
    },
    color: ["#9ad3bc", "#ec524b", "#f5b461", "#f3eac2"],
    legend: {
        orient: "vertical",
        left: "left",
        top: "center",
        padding: [5, 0],
        selectedMode: false,
    },
    angleAxis: {
        show: false, //隐藏角度轴（圆心角）
        max: 20,
        startAngle: 90, //极坐标从第一象限开始，即平面直角坐标系,用时钟理解，0就是三点钟方向，这里我们从12点钟方向开始，也就是3点钟方向加90度
        splitLine: {
            show: false, //隐藏分隔线
        },
    },
    barMaxWidth: 30, //设置圆环最大宽度
    radiusAxis: {
        show: false, //隐藏径向轴（半径）
        type: "category",
    },
    polar: {
        radius: [10, "100%"],
        center: ["75%", "50%"],
    },
    series: [{
            //上层的圆环
            type: "bar",
            encode: {
                angle: "score",
                radius: "item",
            },
            coordinateSystem: "polar", //设置类型为极坐标
            roundCap: true, //柱状图末端呈现圆角
            itemStyle: {
                //设置每一个圆环的颜色
                color: function (params) {
                    return colorList[params.dataIndex];
                },
            },
            animationEasing: "bounceOut", //初始动画
            barGap: "-100%", //柱间距离,用来将上下两种圆环重合
            z: 200, //圆环层级，和zindex相似
        },
        {
            //下层的圆环
            type: "bar",
            encode: {
                angle: "max",
                radius: "item",
            },
            coordinateSystem: "polar",
            roundCap: true,
            itemStyle: {
                //设置每一个圆环的颜色
                color: "#eeeeee",
            },
            z: 100,
            barGap: "-100%", //柱间距离,用来将上下两种圆环重合
        },
        {
            name: "计划",
            type: "bar",
            coordinateSystem: "polar", //设置类型为极坐标
            data: [],
        },
        {
            name: "注意",
            type: "bar",
            coordinateSystem: "polar", //设置类型为极坐标
            data: [],
        },
        {
            name: "同时性加工",
            type: "bar",
            coordinateSystem: "polar", //设置类型为极坐标
            data: [],
        },
        {
            name: "继时性加工",
            type: "bar",
            coordinateSystem: "polar", //设置类型为极坐标
            data: [],
        },
    ],
};