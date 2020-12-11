let init = null

Page({
    data: {
        percent: 0,
        timeTarget: 10000,
        timeNow: 0,
    },
    onLoad: function (options) {

    },

    reset: function () {
        clearInterval(init)
        this.setData({
            timeNow: 0,
            percent: 0,
        })
    },

    start: function () {
        this.reset()
        init = setInterval(
            () => {
                this.setData({
                    timeNow: this.data.timeNow + 10,
                    percent: 100 * (this.data.timeNow + 10) / this.data.timeTarget
                })
                if (this.data.timeNow >= this.data.timeTarget) {
                    clearInterval(init)
                }
            }, 10)
    },

    stop: function () {
        clearInterval(init)
    }
});