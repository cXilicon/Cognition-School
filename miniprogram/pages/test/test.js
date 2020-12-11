let init = null

Page({
    data: {
        percent: 0,
        countTime: 0,
    },
    onLoad: function (options) {

    },

    reset: function (){
        this.setData({
            countTime: 0
        })
        this.setData({
            percent: 0,
        })
    },

    start: function () {
        this.setData({
            countTime: 1
        })
        this.setData({
            percent: 100,
        })
    }
});