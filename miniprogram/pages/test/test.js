//index.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';

let app = getApp()

Page({
    data: {
        display: null
    },

    onLoad(query) {
        let userInfo = app.globalData.userInfo
        [userInfo.avatarUrl, userInfo.nickName, userInfo.gender, userInfo.birth, userInfo.edu] = []
        console.log(app.globalData.userInfo)
    }
})