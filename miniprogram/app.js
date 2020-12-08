//app.js
App({
    onLaunch: function () {
        wx.cloud.init({
            env: 'cognition-school-3f9w80x22b0d491',
            traceUser: true,
        });

        const db = wx.cloud.database()
        // 查询当前用户所有的 counters
        db.collection('user').where({
            _openid: '{openid}',
        }).get().then(res => {
            this.globalData.userInfo = res.data[0]
        })
    },

    globalData: {
        userInfo: {
            avatarUrl: "null",
            nickName: null,
            gender: null,
            birth: null,
            edu: null,
            area: null,
        }
    }
})
