// pages/training/training.js
let app = getApp()

Page({
    data: {
        examinations: [
            {
                id: 0,
                image: 'Mercury.svg',
                tag: '计划',
                name: '舒尔特方格',
                name_en: 'schulteGrid',
            },
            {
                id: 1,
                image: 'Venus.svg',
                tag: '计划',
                name: '数字匹配',
                name_en: 'numberMatching',
            },
            {
                id: 2,
                image: 'Earth.svg',
                tag: '注意',
                name: '表达性注意',
                name_en: 'expressionAttention',
            },
            {
                id: 3,
                image: 'Mars.svg',
                tag: '注意',
                name: '注意力保持',
                name_en: 'attentionRetention',
            },
            {
                id: 4,
                image: 'Jupiter.svg',
                tag: '同时性加工',
                name: '图形记忆',
                name_en: 'graphicMemory',
            },
            {
                id: 5,
                image: 'Uranus.svg',
                tag: '继时性加工',
                name: '颜色记忆',
                name_en: 'colorMemory',
            },
        ],
        isTested: false,
        lockShow: false,
    },

    onShow: function () {
        if (!this.data.isTested) {
            let that = this
            const db = wx.cloud.database()
            db.collection('user').where({
                _openid: '{openid}',
            }).get().then(res => {
                let history = res.data[0].history
                if (history.length !== 0) {
                    that.setData({
                        isTested: true,
                        lockShow: false
                    })
                } else {
                    that.setData({
                        lockShow: true,
                    })
                }
            }).catch(() => {
                console.log('获取失败')
            })
        }
    },

    navigateToExam: function (e) {
        if (this.data.isTested) {
            let target = e.currentTarget.dataset.item
            wx.navigateTo({
                url: '/pages/examinations/' + target.name_en + '/' + target.name_en,
                success: res => {
                    res.eventChannel.emit('entrance', {
                        entrance: 'training',
                    })
                }
            })
        }
    }
})