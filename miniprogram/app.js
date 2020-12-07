//app.js
App({
    onLaunch: function () {
        wx.cloud.init({
            env: 'cognition-school-3f9w80x22b0d491',
            traceUser: true,
        });
    },

    globalData: {
        userInfo: null
    }
})
