// pages/index/index.js
Page({
    data: {},

    startExamination: function () {
        wx.redirectTo({
            url: '/pages/catalogue/catalogue',
        })
    },

    learnRules: function () {
        // console.log(this.data.countdown.getTime)
        // console.log(dateFormat(this.data.countdown.getTime(), 'isoTime'))
    }
});

