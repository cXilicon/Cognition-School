const app = getApp()

// 判断是否授权过

// 判断数据库中是否存在信息

Page({
    data: {
        hasUserInfo: true
    },
    onLoad: function (options) {
        let that = this
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    console.log('用户已授权')
                    that.getUserInfoFromDatabase()
                        .then(() => {
                            console.log('未查询到用户数据，开启注册按钮')
                            that.setData({
                                hasUserInfo: false
                            })
                        })
                        .catch(() => {
                            console.log('数据库读取错误')
                            that.setData({
                                hasUserInfo: false
                            })
                        })
                } else {
                    console.log('用户未授权')
                    that.setData({
                        hasUserInfo: false
                    })
                }
            }
        })
    },

    signUp: function (e) {
        if (e.detail.userInfo) {
            console.log('用户完成授权')
            this.getUserInfoFromDatabase()
                .then(() => {
                    console.log('未查询到用户数据，前往注册')
                    wx.navigateTo({
                        url: '/pages/userInfo/userInfo',
                        success: res => {
                            res.eventChannel.emit('wxUserInfo', {
                                type: 'signUp',
                                userInfo: e.detail.userInfo,
                            })
                        }
                    })
                })
                .catch(() => {
                    console.log('数据库读取错误')
                })
        } else
            console.log('用户取消授权')
    },

    // 查询数据库
    getUserInfoFromDatabase: function () {
        return new Promise((success, fail) => {
                const db = wx.cloud.database()
                db.collection('user').where({
                    _openid: '{openid}',
                }).get().then(res => {
                    if (res.data.length !== 0) {
                        // 查询到数据
                        let user = res.data[0]
                        wx.getUserInfo({
                            success: res => {
                                user.information['avatarUrl'] = res.userInfo.avatarUrl
                                app.globalData.user = user
                                console.log('查询到用户数据，前往主页面')
                                wx.switchTab({
                                    url: '/pages/index/index'
                                })
                            }
                        })
                    } else {
                        // 未获得数据
                        success(res)
                    }
                }).catch(res => {
                    fail(res)
                })
            }
        )
    },
});