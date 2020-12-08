const app = getApp()
const dateFormat = require('dateformat');
import area from "../../utils/area";

Page({
    data: {
        userInfo: {
            avatarUrl: null,
            nickName: null,
            gender: null,
            areaValue: null,
            areaView: null,
            birthValue: null,
            birthView: null,
            edu: null,
        },
        areaList: area,
        areaSelector: false,
        eduSelector: false,
        birthSelector: false,
        eduList: ['保密', '学龄前', '小学', '初中', '高中', '大学', '研究生'],
        minDate: new Date(1900, 0, 1).getTime(),
        maxDate: new Date().getTime()
    },

    //事件处理函数
    onLoad: function () {
        const eventChannel = this.getOpenerEventChannel()
        let wxUserInfo = null
        eventChannel.on('wxUserInfo', function (data) {
            wxUserInfo = data
        })
        console.log('获得数据:', wxUserInfo)
        let genderDic = ['none', 'male', 'female']
        let userInfo = {
            avatarUrl: wxUserInfo.avatarUrl,
            nickName: wxUserInfo.nickName,
            gender: genderDic[wxUserInfo.gender],
            areaView: [wxUserInfo.province, wxUserInfo.city].join(' '),
            birthValue: new Date(2010, 1, 1).getTime(),
            birthView: dateFormat(new Date(2010, 0, 1), 'yyyy-mm-dd'),
            edu: '保密',
        }
        for (let city in area.city_list) {
            if (area.city_list[city] === wxUserInfo.city)
                userInfo.areaValue = city
        }
        this.setData({
            userInfo: userInfo,
        })
    },

    changeSelectorState: function (e) {
        let selector
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
            'userInfo.gender': e.detail
        })
    },

    selectArea: function (e) {
        let code = e.detail.code
        let name = e.detail.values
        this.setData({
            'userInfo.areaView': [name[0].name, name[1].name].join(' '),
            'userInfo.areaValue': code
        })
        this.changeSelectorState('areaSelector')
    },

    selectEdu: function (e) {
        let data = e.detail.value
        this.setData({
            'userInfo.edu': data
        })
        this.changeSelectorState('eduSelector')
    },

    selectBirth: function (e) {
        let data = e.detail
        this.setData({
            'userInfo.birthValue': data,
            'userInfo.birthView': dateFormat(new Date(data), 'yyyy-mm-dd'),
        })
        this.changeSelectorState('birthSelector')
    },

    commitData: function () {
        let that = this
        let userInfo = {
            nickName: that.data.userInfo.nickName,
            gender: that.data.userInfo.gender,
            birth: new Date(that.data.userInfo.birthValue),
            edu: that.data.userInfo.edu,
            area: that.data.userInfo.areaView
        }

        const db = wx.cloud.database()
        db.collection('user').add({
            data: userInfo,
        }).then(() => {
            console.log('数据已上传')
            userInfo['avatarUrl'] = that.data.userInfo.avatarUrl
            app.globalData.userInfo = userInfo
            wx.navigateBack()
        }).catch((res) => {
            console.log(res)
            console.log('上传失败')
        })
    },

    backToLaunch: function () {
        wx.navigateBack()
    }
});