// components/custom-nav-bar/custom-nav-bar.js
Component({
    properties: {
        navigateBackArea: {
            type: Boolean,
            value: true
        },
        navigateBackMethod: {
            type: Object,
            value: null
        }
    },

    data: {
        statusBarHeight: 0,
        navBarHeight: 0,
    },

    methods: {
        navigateBack: function () {
            if (this.properties.navigateBackMethod != null)
                this.properties.navigateBackMethod.func()
            else
                wx.navigateBack()
        }
    },

    attached: function () {
        const systemInfo = wx.getSystemInfoSync();
        const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
        this.setData({
            statusBarHeight: systemInfo.statusBarHeight,
            navBarHeight:
                (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 +
                menuButtonInfo.height,
        });
    },
});
