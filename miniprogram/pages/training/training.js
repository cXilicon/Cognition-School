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
                score: 'A',
            },
            {
                id: 1,
                image: 'Venus.svg',
                tag: '计划',
                name: '数字匹配',
                score: '-',
            },
            {
                id: 2,
                image: 'Earth.svg',
                tag: '注意',
                name: '表达性注意',
                score: '-'
            },
            {
                id: 3,
                image: 'Mars.svg',
                tag: '注意',
                name: '注意力保持',
                score: '-',
            },
            {
                id: 4,
                image: 'Jupiter.svg',
                tag: '同时性加工',
                name: '图形记忆',
                score: '-',
            },
            {
                id: 5,
                image: 'Saturn.svg',
                tag: '同时性加工',
                name: '矩阵问题',
                score: '-',
            },
            {
                id: 6,
                image: 'Uranus.svg',
                tag: '继时性加工',
                name: '颜色记忆',
                score: '-',
            },
            {
                id: 7,
                image: 'Neptune.svg',
                tag: '继时性加工',
                name: '数字回忆',
                score: '-',
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

    navigateToExam: function () {

    }
})