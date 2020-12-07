// component/customTabBar/customTabBar.js
Component({
    data: {
        selected: 0,
        list: [
            {
                pagePath: "/pages/training/training",
                iconName: "degree",
            },
            {
                pagePath: "/pages/index/index",
                iconName: "project",
            },
            {
                pagePath: "/pages/mine/mine",
                iconName: "user-boy",
            },
        ],
    },
    attached() {
    },
    methods: {
        switchTab(e) {
            const data = e.currentTarget.dataset;
            const url = data.path;
            console.log(url)
            wx.switchTab({url});
            this.setData({
                selected: data.index,
            });
        },
    },
});