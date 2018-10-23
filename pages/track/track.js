//index.js
const getStatus = require("../../component/api_config.js").get_status_config; // 获取诉求提交状态
const imgApi = require("../../component/api_config.js").img_config; // 图片请求地址

//引入图片预加载组件
const ImgLoader = require('../../img-loader/img-loader.js')

//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrl: '',
    winWidth: 0,
    winHeight: 0
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
      title: '智能检索'//修改顶部标题的内容
    })

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res)
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });

    //初始化图片预加载组件
    this.imgLoader = new ImgLoader(this);

    // 获取诉求提交状态
    wx.request({
      url: getStatus,
      data: { OpenId: getApp().globalData.openid },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data)
        if (res.data.status == 1) {
          // 已经提交诉求，正在处理
          // console.log(that.data.winWidth)
          let nowImg1 = that.data.winWidth >= 360 ? 'appeal01x2.png' : 'appeal01.png';
          that.loadImage('appeal01_min.png', nowImg1);
        } else if (res.data.status == 0) {
          let nowImg2 = that.data.winWidth >= 360 ? 'appeal02x2.png' : 'appeal02.png';
          that.loadImage('appeal02_min.png', nowImg2)
        }
      }
    })
  },
  loadImage(a,b) {
    // a 缩略图 b 原图
    //加载缩略图
    this.setData({
      imgUrl: imgApi + a
    })

    //同时对原图进行预加载，加载成功后再替换
    this.imgLoader.load((imgApi + b), (err, data) => {
      console.log('图片加载完成', err, data.src)

      if (!err)
        this.setData({ imgUrl: data.src })
    })
  },
})
