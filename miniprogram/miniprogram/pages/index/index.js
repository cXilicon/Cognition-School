// pages/index/index.js
Page({
    data: {},

    startExamination: function () {
        wx.redirectTo({
            url: '/pages/catalogue/catalogue',
        })
    },
});

