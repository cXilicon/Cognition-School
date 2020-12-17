const app = getApp()
const dateFormat = require('dateformat');
import area from "../../utils/area";

Page({
    data: {
        isSignUp: true,
        userInfo: {
            avatarUrl: null,
            userName: null,
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
        maxDate: new Date().getTime(),
        posting: false,
    },

    onLoad: function () {
        const eventChannel = this.getOpenerEventChannel()
        let rawUserInfo = null
        let isSignUp = null
        eventChannel.on('wxUserInfo', data => {
            isSignUp = (data.type === 'signUp')
            rawUserInfo = data.userInfo
            console.log('获得数据:', data)
            let genderDic = ['none', 'male', 'female']

            let initialedUserInfo = {
                avatarUrl: rawUserInfo.avatarUrl,
                userName: isSignUp ? rawUserInfo.nickName : rawUserInfo.userName,
                gender: isSignUp ? genderDic[rawUserInfo.gender] : rawUserInfo.gender,
                areaView: isSignUp ? [rawUserInfo.province, rawUserInfo.city].join(' ') : rawUserInfo.area,
                birthValue: isSignUp ? new Date(2010, 0, 1).getTime() : rawUserInfo.birth.getTime(),
                birthView: dateFormat(isSignUp ? new Date(2010, 0, 1).getTime() : rawUserInfo.birth.getTime(), 'yyyy-mm-dd'),
                edu: isSignUp ? '保密' : rawUserInfo.edu
            }
            let cityName = isSignUp ? rawUserInfo.city : rawUserInfo.area.split(' ')[1]
            for (let city in area.city_list) {
                if (area.city_list[city] === cityName)
                    rawUserInfo.areaValue = city
            }
            this.setData({
                userInfo: initialedUserInfo,
                isSignUp: isSignUp
            })
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

    editUserName: function (e) {
        let data = e.detail
        this.setData({
            'userInfo.userName': data,
        })
    },

    commitData: function () {
        if (!this.data.posting) {
            this.setData({
                posting: true
            })
            let that = this
            let user = {
                information: {
                    userName: that.data.userInfo.userName,
                    gender: that.data.userInfo.gender,
                    birth: new Date(that.data.userInfo.birthValue),
                    edu: that.data.userInfo.edu,
                    area: that.data.userInfo.areaView,
                },
                history: []
            }
            const db = wx.cloud.database()

            if (this.data.isSignUp) {
                db.collection('user').add({
                    data: user,
                }).then(() => {
                    console.log('数据已上传')
                    user.information['avatarUrl'] = that.data.userInfo.avatarUrl
                    user.information['age'] = new Date(new Date().getTime() - user.information.birth.getTime()).getFullYear() - 1970
                    app.globalData.user = user
                    this.setData({
                        posting: false
                    })
                    wx.switchTab({
                        url: '/pages/index/index'
                    })
                }).catch(() => {
                    console.log('上传失败')
                    this.setData({
                        posting: false
                    })
                })

                wx.cloud.callFunction({
                    name: 'login',
                }).then(res => {
                    console.log(res)
                    wx.request({
                        url: 'http://xiangxc.ink:8080/user/add',
                        method: 'POST',
                        data: {
                            area: user.information.area,
                            birthday: dateFormat(user.information.birth, "yyyy-mm-dd"),
                            education: user.information.edu,
                            openID: res.result.openid,
                            sex: user.information.gender,
                            sign: '',
                            userName: user.information.userName,
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded' // 默认值
                        },
                        success: res => {
                            console.log(res.data)
                        }
                    })
                })
            } else {
                db.collection('user').where({
                    _openid: '{openid}',
                }).update({
                    data: {
                        information: user.information
                    },
                }).then(() => {
                    console.log('更新成功')
                    user.information['avatarUrl'] = that.data.userInfo.avatarUrl
                    user.information['age'] = new Date(new Date().getTime() - user.information.birth.getTime()).getFullYear() - 1970
                    app.globalData.user = user
                    this.setData({
                        posting: false
                    })
                }).catch(() => {
                    console.log('更新失败')
                    this.setData({
                        posting: false
                    })
                })
            }
        }


    },

    backToLaunch: function () {
        wx.navigateBack()
    }
});