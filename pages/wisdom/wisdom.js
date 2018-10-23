//index.js
//获取应用实例
const imgApi = require("../../component/api_config.js").img_config; // 图片请求地址
const userInfoApi = require("../../component/api_config.js").save_userInfo_config; // 保存用户信息
//引入图片预加载组件
const ImgLoader = require('../../img-loader/img-loader.js')

//缩略图
const imgUrlThumbnail = imgApi + 'appeal_min.jpg'
//原图 
const imgUrlOriginal = imgApi + 'appeal.png'
const app = getApp()

Page({
  data: {
    imgUrl: ''
  },
  //事件处理函数
  bindViewTap: function (e) {
    // console.log(e)
    return;
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    wx.setNavigationBarTitle({
      title: '智能热线'//修改顶部标题的内容
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
    //初始化图片预加载组件
    this.imgLoader = new ImgLoader(this);
    // 初始化图片预加载
    this.loadImage();
  },
  loadImage() {
    //加载缩略图
    this.setData({
      imgUrl: imgUrlThumbnail
    })

    //同时对原图进行预加载，加载成功后再替换
    this.imgLoader.load(imgUrlOriginal, (err, data) => {
      console.log('图片加载完成', err, data.src)

      if (!err)
        this.setData({ imgUrl: data.src })
    })
  },
  // 点击页面跳转
  bindViewTap: function (e) {
    // console.log(e.currentTarget.dataset.url)
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    })
  },
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '010-84084779', //此号码仅用于测试  
      success: function () {
        // console.log("拨打电话成功！")
      },
      fail: function () {
        // console.log("拨打电话失败！")
      }
    })
  },
  bindGetUserInfo: function (e) {
    let that = this;
    // 判断 授权状态并处理
    // console.log(e)
    if (e.detail.errMsg == "getUserInfo:ok" && getApp().globalData.isGrant == 0) {
      getApp().globalData.isGrant = 1; // 标记已经授权
      getApp().globalData.userInfo = e.detail.userInfo; // 写入全局信息；
      that.saveInfo(e.detail.userInfo);
    }
    let isGrant = getApp().globalData.isGrant;
    if (isGrant == 1) {
      // console.log("已经授权")
      // 直接跳转
      let hrefUrl = e.currentTarget.dataset.url
      wx.navigateTo({
        url: "/pages/appeal/appeal",
      })
    } else {
      // console.log("没有授权")
      that.yhToast({
        msg: "请先授权后查看!",
        duration: 2000
      });
    }
  },
  saveInfo: function (data) {
    // console.log(data)
    let sendData = {}
    sendData.OpenId = getApp().globalData.openid; //用户的openid,
    sendData.APPId = "appid:wx783a02610110d6ce"//小程序APPID
    sendData.NickName = data.nickName; //用户昵称
    sendData.AvatarUrl = data.avatarUrl; //用户头像
    sendData.Gender = data.gender; //用户性别
    sendData.City = data.city; //用户所在城市
    sendData.Province = data.province; //用户所在省份
    sendData.Country = data.country; //用户所在国家
    sendData.Language = data.language; //用户的语言，（简体中文）
    // console.log(sendData);
    wx.request({
      url: userInfoApi,
      data: sendData,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data)
      }
    })
  }
})
