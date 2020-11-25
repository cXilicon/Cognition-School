// pages/examination/examination.js

let dateFormat = require('dateformat');
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'

let systemInfo = wx.getSystemInfoSync();
Page({
    data: {
        currentExamination: 0,
        lastExamination: 0,
        currentDotsIdx: 0,
        examinationSwitchLock: true,
        countdownMillisecond: 0,
        countdownDisplay: '',
        examinations: [
            {
                id: 0,
                style: "transform: scale(1); opacity: 1; ",
                name: 'Planning',
                name_cn: '计划',
                score: '--',
                backgroundStyle: 'background-image: linear-gradient(#eeeeee, #d18188);'
            },
            {
                id: 1,
                style: "transform: scale(0.9); opacity: 0.6;",
                name: 'Attention',
                name_cn: '注意',
                score: '--',
                backgroundStyle: 'background-image: linear-gradient(#eeeeee, #51adcf);'
            },
            {
                id: 2,
                transformScale: 0.9,
                style: "transform: scale(0.9); opacity: 0.6;",
                name: 'Simultaneous',
                name_cn: '同时性加工',
                score: '--',
                backgroundStyle: 'background-image: linear-gradient(#eeeeee, #dfc5a7);'
            }, {
                id: 3,
                transformScale: 0.9,
                style: "transform: scale(0.9); opacity: 0.6;",
                name: 'Succesive',
                name_cn: '继时性加工',
                score: '--',
                backgroundStyle: 'background-image: linear-gradient(#eeeeee, #8db596);'
            },
        ],
        navigateBack: {
            func: function () {
                console.log("CNM")
                wx.navigateBack()
            }
        }
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

    changeExaminationSwiperByTap: function (event) {
        if (this.data.currentExamination !== event.currentTarget.dataset.swiperId) {
            this.setData({
                examinationSwitchLock: false,
                currentExamination: event.currentTarget.dataset.swiperId,
            });
        } else {
            let currentExamination = this.data.currentExamination
            console.log('进入' + this.data.examinations[currentExamination].name_cn + '测试');
            let test_score = Math.floor(Math.random() * 100)
            console.log('完成' + this.data.examinations[currentExamination].name_cn + '测试\n得分:' + test_score.toString())
            this.setData({
                ['examinations[' + currentExamination + '].score']: test_score
            })
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
            "); opacity: " +
            (1 - 0.4 * absOffset) +
            ";";
        let slideInContent =
            "transform: scale(" +
            (0.9 + 0.1 * absOffset) +
            "); opacity: " +
            (0.6 + 0.4 * absOffset) +
            ";";
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

    countDown: function () {
        let countdownSecond = this.data.countdownSecond - 1000
        this.setData({
            isTesting: true,
            countdownSecond: countdownSecond,
            countdownDisplay: dateFormat(countdownSecond, 'isoTime')
        })
    },

    onLoad: function (option) {
        let countdown = new Date(0, 0, 0, 1, 0, 0)
        this.setData({
            countdownSecond: countdown,
            countdownDisplay: dateFormat(countdown, 'isoTime'),
            isTesting: true,
        })
        setInterval(this.countDown, 1000)
    },

    finishExamination: function () {
        let examInfo = this.data.examinations
        let isFinishFlag = true
        let reportData = {
            name: '张三',
            age: '14',
            score: [],
            finishTime: new Date()
        }
        examInfo.forEach(function (item) {
            if (item.score === '--')
                isFinishFlag = false;
            reportData.score.push(item.score)
        })
        if (isFinishFlag) {
            wx.navigateTo({
                url: '/pages/settlement/settlement',
                success: function (res) {
                    res.eventChannel.emit("reportData", reportData)
                }
            })
        } else {
            Dialog.confirm({
                message: '存在未完成的测试项目，是否退出',
                selector: '#van-dialog_1',
            }).then(() => {
                wx.navigateBack()
            }).catch(() => {
                Dialog.close()
            })
        }
    }
});

