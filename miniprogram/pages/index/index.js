// pages/index/index.js
Page({
    data: {},

    startExamination: function () {
        wx.navigateTo({
            url: '/pages/examination/examination',
        })
    },

    learnRules: function () {
        // console.log(this.data.countdown.getTime)
        // console.log(dateFormat(this.data.countdown.getTime(), 'isoTime'))
    }
});

