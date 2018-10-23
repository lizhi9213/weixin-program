//index.js
const imgApi = require("../../component/api_config.js").img_config; // 图片请求地址
const userInfoApi = require("../../component/api_config.js").save_userInfo_config; // 保存用户信息

//引入图片预加载组件
const ImgLoader = require('../../img-loader/img-loader.js')
//缩略图
const imgUrlThumbnail = imgApi + 'banner01_min.jpg'
//原图 
const imgUrlOriginal = imgApi + 'banner01.jpg'

//获取应用实例
const app = getApp();

Page({
  data: {
    imgUrl: '',
    imgApi: imgApi,
    routers: [
      {
        name: '智能互动',
        url: '/pages/activity/activity',
        icon: 'grid02.png',
        code: '01'
      },
      {
        name: '智能热线',
        url: '/pages/wisdom/wisdom',
        icon: 'grid03.png',
        code: '03'
      },
      {
        name: '智能矩阵',
        url: '/pages/matrix/matrix',
        icon: 'grid01.png',
        code: '06'
      },
      {
        name: '智能检索',
        url: '/pages/track/track',
        icon: 'grid04.png',
        code: '01'
      },// 服务跟踪
      // {
      //   name: '智慧档案',
      //   url: '/pages/information/information',
      //   icon: 'grid05.png',
      //   code: '01'
      // },
      {
        name: '常见问题',
        url: '/pages/problems/problems',
        icon: 'grid06.png',
        code: '06'
      },
      {
        name: '关于我们',
        url: '/pages/about/about',
        icon: 'grid05.png',
        code: '06'
      }

    ]
  },
  onLoad: function () {
    let app = getApp();
    // toast组件实例
    new app.ToastPannel();
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
  bindViewTap: function () {
    //事件处理函数
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  butonHref: function (e) {
    // 直接跳转
    // console.log(e)
    let hrefUrl = e.currentTarget.dataset.url
    wx.navigateTo({
      url: hrefUrl,
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
        url: hrefUrl,
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
