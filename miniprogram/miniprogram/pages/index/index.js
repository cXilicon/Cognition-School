// pages/index/index.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
const app = getApp();
Page({
    data: {},

    startExamination: function () {
        if (app.globalData.userInfo) {
            wx.redirectTo({
                url: '/pages/catalogue/catalogue',
            })
        } else {
            Dialog.alert({
                title: '登录后可以解锁成绩记录及分析功能',
                selector: '#van-dialog',
            }).then(() => {
                wx.redirectTo({
                    url: '/pages/catalogue/catalogue',
                })
            }).catch(() => {
                Dialog.close()
            })
        }
    },
});