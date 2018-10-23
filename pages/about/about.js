//index.js
//获取应用实例
const imgApi = require("../../component/api_config.js").img_config; // 图片请求地址
const app = getApp()

Page({
  data: {
    imgUrl: imgApi,
    markers: [{ // 地图上的点标记
      iconPath: "/static/img/location.png",
      id: 0,
      latitude: 39.8761810000,
      longitude: 116.3509010000,
      width: 50,
      height: 50
    }],
    controls: [{ // 地图上的空间，不随着地图拖动而移动
      id: 1,
      iconPath: '/static/img/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    wx.setNavigationBarTitle({
      title: '关于我们'//修改顶部标题的内容
    })

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  regionchange(e) {
    // 视野发生变化时触发
    // console.log(e.type)
  },
  markertap(e) {
    let that = this;
    // console.log(e.markerId)
    // 点击标记点时触发
    var lat = that.data.markers[0].latitude + 0;
    var lon = that.data.markers[0].longitude + 0;
    // 点击markes点标记调用微信内置地图导航
    wx.openLocation({
      latitude: lat,
      longitude:lon,
      scale: 28
    })
  },
  controltap(e) {
    // 点击控件时触发
    // console.log(e.controlId)
  }
})
