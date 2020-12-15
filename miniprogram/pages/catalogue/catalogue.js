// pages/catalogue/catalogue.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

let dateFormat = require('dateformat');
let systemInfo = wx.getSystemInfoSync();

let level = {
    A: 10,
    B: 8,
    C: 6,
    D: 4,
    F: 2
}

Page({
    data: {
        currentExamination: 0,
        lastExamination: 0,
        currentDotsIdx: 0,
        examinationSwitchLock: true,
        countdownMillisecond: 0,
        finishedItemCount: 0,
        examinations: [
            {
                id: 0,
                frontImage: 'exam-0.png',
                backgroundImage: 'Mercury.jpeg',
                category: 'plan',
                name: '舒尔特方格',
                name_en: 'schulteGrid',
                score: '--',
                style: "transform: scale(1);",
                backgroundStyle: 'background-image: linear-gradient(#eeeeee, #707070);'
            },
            {
                id: 1,
                frontImage: 'exam-1.png',
                backgroundImage: 'Venus.jpeg',
                category: 'plan',
                name: '数字匹配',
                name_en: 'numberMatching',
                score: '--',
                style: "transform: scale(0.9);",
                backgroundStyle: 'background-image: linear-gradient(#eeeeee, #329084);'
            },
            {
                id: 2,
                frontImage: 'exam-2.png',
                backgroundImage: 'Earth.jpeg',
                category: 'attention',
                name: '表达性注意',
                name_en: 'expressionAttention',
                score: '--',
                style: "transform: scale(0.9);",
                backgroundStyle: 'background-image: linear-gradient(#eeeeee, #0e6575);'
            },
            {
                id: 3,
                frontImage: 'exam-3.png',
                backgroundImage: 'Mars.jpeg',
                category: 'attention',
                name: '注意力保持',
                name_en: 'attentionRetention',
                score: '--',
                style: "transform: scale(0.9);",
                backgroundStyle: 'background-image: linear-gradient(#eeeeee, #fc4927);'
            },
            {
                id: 4,
                frontImage: 'exam-4.png',
                backgroundImage: 'Jupiter.jpeg',
                category: 'simultaneous',
                name: '图形记忆',
                name_en: 'graphicMemory',
                score: '--',
                style: "transform: scale(0.9);",
                backgroundStyle: 'background-image: linear-gradient(#eeeeee, #21b0c0);'
            },
            {
                id: 5,
                frontImage: 'exam-5.png',
                backgroundImage: 'Saturn.jpeg',
                category: 'simultaneous',
                name: '矩阵问题',
                name_en: 'matrixProblem',
                score: '--',
                style: "transform: scale(0.9);",
                backgroundStyle: 'background-image: linear-gradient(#eeeeee, #9d713f);'
            },
            {
                id: 6,
                frontImage: 'exam-6.png',
                backgroundImage: 'Uranus.jpeg',
                category: 'successive',
                name: '颜色记忆',
                name_en: 'colorMemory',
                score: '--',
                style: "transform: scale(0.9);",
                backgroundStyle: 'background-image: linear-gradient(#eeeeee, #3a72c1);'
            },
            {
                id: 7,
                frontImage: 'exam-7.png',
                backgroundImage: 'Neptune.jpeg',
                category: 'successive',
                name: '数字回忆',
                name_en: 'numberMemory',
                score: '--',
                style: "transform: scale(0.9);",
                backgroundStyle: 'background-image: linear-gradient(#eeeeee, #80619f);'
            },
            {
                id: 8,
                frontImage: 'exam-8.png',
                backgroundImage: 'Pluto.jpeg',
                name: '生成报告',
                score: '--',
                style: "transform: scale(0.9);",
                backgroundStyle: 'background-image: linear-gradient(#eeeeee, #aaaaaa'
            },
        ],
    },

    examinationSwiperChanged: function (event) {
        if (event.detail.source === "touch") {
            this.setData({
                currentDotsIdx: event.detail.current,
                lastExamination: event.detail.current,
                currentExamination: event.detail.current,
                examinationSwitchLock: true,
            });
        } else {
            this.setData({
                currentDotsIdx: event.detail.current,
                lastExamination: event.detail.current,
                examinationSwitchLock: true,
            });
        }
    },

    tapExamination: function (event) {
        if (this.data.currentExamination !== event.currentTarget.dataset.swiperId) {
            // 切换页面
            this.setData({
                examinationSwitchLock: false,
                currentExamination: event.currentTarget.dataset.swiperId,
            });
        } else if (event.currentTarget.dataset.swiperId !== 8) {
            // 进入测试
            let currentExamination = this.data.currentExamination
            if (this.data.examinations[currentExamination].score !== '--') {
                Toast('该测试已完成');
            } else {
                console.log('进入' + this.data.examinations[currentExamination].name + '测试');
                if (true) {
                    let examId = event.currentTarget.dataset.swiperId
                    if (examId <= 3) {
                        wx.navigateTo({
                            url: '/pages/examinations/' + this.data.examinations[examId].name_en + '/' + this.data.examinations[examId].name_en,
                            success: res => {
                                res.eventChannel.emit('entrance', {
                                    entrance: 'exam',
                                })
                            }
                        })
                    } else {
                        let test_score = ['A', 'B', 'C', 'D', 'F'][Math.floor(Math.random() * 5)]
                        this.setData({
                            ['examinations[' + currentExamination + '].score']: test_score,
                        })
                    }
                } else {
                    let test_score = ['A', 'B', 'C', 'D', 'F'][Math.floor(Math.random() * 5)]
                    this.setData({
                        ['examinations[' + currentExamination + '].score']: test_score,
                    })
                }
                this.setData({
                    finishedItemCount: this.data.finishedItemCount += 1
                })
            }
            // 输出总成绩
            if (this.data.finishedItemCount === 8) {
                let examInfo = this.data.examinations
                let totalScore = 0
                examInfo.forEach(function (item) {
                    if (item.id !== 8)
                        totalScore += level[item.score]
                })
                if (totalScore >= 70)
                    totalScore = 'S'
                else if (totalScore >= 60)
                    totalScore = 'A'
                else if (totalScore >= 50)
                    totalScore = 'B'
                else if (totalScore >= 30)
                    totalScore = 'C'
                else if (totalScore >= 20)
                    totalScore = 'D'
                else
                    totalScore = 'F'
                this.setData({
                    ['examinations[8].score']: totalScore,
                })
            }
        } else {
            if (this.data.finishedItemCount === 8) {
                let examInfo = this.data.examinations
                let reportData = {
                    score: {},
                    level: examInfo[8].score,
                    finishTime: new Date()
                }
                examInfo.forEach(function (item) {
                    if (item.id !== 8) {
                        reportData.score[item.name_en] = {
                            score: level[item.score],
                            category: item.category
                        }
                    }
                })
                // console.log(reportData)
                wx.navigateTo({
                    url: '/pages/settlement/settlement',
                    success: function (res) {
                        res.eventChannel.emit("reportData", reportData)
                    }
                })
            } else {
                Toast('还有 ' + (8 - this.data.finishedItemCount) + ' 项测试未完成');
            }
        }
    },


    changeExaminationSwiper: function (event) {
        let lastExamination = this.data.lastExamination;
        let offset =
            event.detail.dx /
            (systemInfo.windowWidth - (80 / 375) * systemInfo.windowWidth);
        let currentExamination =
            offset > 0
                ? Math.floor(lastExamination + offset)
                : Math.ceil(lastExamination + offset);
        let slideInId = offset > 0 ? currentExamination + 1 : currentExamination - 1;
        let slideIn = "examinations[" + slideInId + "].style";
        let slideOut = "examinations[" + currentExamination + "].style";
        let absOffset =
            Math.abs(offset) - Math.abs(currentExamination - lastExamination);
        let slideOutContent =
            "transform: scale(" +
            (1 - 0.1 * absOffset) +
            "); "
        let slideInContent =
            "transform: scale(" +
            (0.9 + 0.1 * absOffset) +
            "); "
        if (slideInId < 0 || slideInId > this.data.examinations.length - 1) {
            this.setData({
                currentDotsIdx: Math.round(lastExamination + offset),
                [slideOut]: slideOutContent,
            });
        } else {
            this.setData({
                currentDotsIdx: Math.round(lastExamination + offset),
                [slideOut]: slideOutContent,
                [slideIn]: slideInContent,
            });
        }
    },

    onLoad: function (option) {
    },

    exitExamination: function () {
        Dialog.confirm({
            title: '是否终止测试',
            selector: '#van-dialog',
        }).then(() => {
            wx.switchTab({url: "/pages/index/index"})
        }).catch(() => {
            Dialog.close()
        })
    }
});

