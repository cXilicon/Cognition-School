const app = getApp()
const dateFormat = require('dateformat');
import area from "../../utils/area";

Page({
    data: {
        gender: 'male',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        avatarUrl: "",
        areaList: area,
        areaSelector: false,
        area: "保密 保密",
        eduSelector: false,
        edu: "保密",
        columns: ['保密', '学龄前', '小学', '初中', '高中', '大学', '研究生'],
        birthSelector: false,
        birth: "1900-01-01",
        minDate: new Date(1900, 1, 1).getTime(),
        maxDate: new Date().getTime()
    },

    //事件处理函数
    onLoad: function () {
        if (app.globalData.userInfo) {
            console.log(1)
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
            this.setData({
                avatarUrl: this.data.userInfo.avatarUrl
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
                this.setData({
                    avatarUrl: this.data.userInfo.avatarUrl
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },

    getUserInfo: function (e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },

    changeSelectorState: function (e) {
        let selector = null
        if (e.currentTarget)
            selector = e.currentTarget.dataset.selector
        else
            selector = e
        this.setData({
            [selector]: !this.data[selector]
        })
    },

    selectGender: function (e) {
        this.setData({
            gender: e.detail
        })
    },

    selectArea: function (e) {
        let data = e.detail.values
        this.setData({
            area: data[0].name + ' ' + data[1].name,
        })
        this.changeSelectorState('areaSelector')
    },

    selectEdu: function (e) {
        let data = e.detail.value
        this.setData({
            edu: data
        })
        this.changeSelectorState('eduSelector')
    },

    selectBirth: function (e) {
        let data = e.detail
        this.setData({
            birth: dateFormat(new Date(data), 'yyyy-mm-dd')

        })
        this.changeSelectorState('birthSelector')
    },

});