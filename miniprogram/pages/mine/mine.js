// pages/mine/mine.js
import * as echarts from "../../components/ec-canvas/echarts";

Page({
    data: {
        ecBar: {
            disableTouch: true,
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
        },
        examinationInfoShowFlag: false,
    },
    onLoad(query) {

    },

    switchExaminationInfo: function () {
        this.setData({
            examinationInfoShowFlag: !this.data.examinationInfoShowFlag,
        });
    },
});

var colorList = ["#ec524b", "#f5b461", "#f3eac2", "#9ad3bc"];

var getAbilityChart = {
    dataset: {
        dimensions: ["item", "score", "max"],
        source: [
            ["P", 64, 100],
            ["A", 34, 100],
            ["S1", 52, 100],
            ["S2", 65, 100],
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
        max: 100,
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
    series: [
        {
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
