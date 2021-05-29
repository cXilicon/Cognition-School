//app.js
App({
    onLaunch: function () {
        wx.cloud.init({
            env: 'cognition-school-3f9w80x22b0d491',
            traceUser: true,
        });

        const db = wx.cloud.database()
        db.collection('user').where({
            _openid: '{openid}',
        }).get().then(res => {
            console.log(res);
            this.globalData.userInfo = res.data[0]
        })
    },

    globalData: {
        user: null,
    }
})
