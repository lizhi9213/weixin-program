//index.js
const imgApi = require("../../component/api_config.js").host; // 图片请求地址
const getMsg = require("../../component/api_config.js").my_msg_config; // 获取我的信息
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrl: imgApi,
    winWidth: 0,
    winHeight: 0,
    msgData: {},
    marital: "",
    register: "", // 户籍地
    living: "" // 现居地
  },
  onShow: function (options) {
    // 生命周期函数--监听小程序显示(后退到这个页面的时候这个就会被回调)    当小程序启动，或从后台进入前台显示，会触发 onShow    
    this.msgInit();
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
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    // 初始化我的信息
    this.msgInit()
  },
  msgInit: function () {
    let that = this;
    //console.log(getApp().globalData.openid)
    //console.log(getMsg)
    wx.request({
      url: getMsg,
      data: {
        OpenId: getApp().globalData.openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data)
        let result = res.data;
        // 处理婚姻显示
        let status = res.data.Marital_Status;
        let sFullName = ""
        if (status == '1') {
          sFullName = "单身";
        } else if (status == '2') {
          sFullName = "离异";
        } else if (status == '3') {
          sFullName = "初婚";
        } else if (status == '4') {
          sFullName = "再婚";
        } else {
          sFullName = "未选择";
        }

        // 处理省市区
        let register = "无";
        if (res.data.H_Province != "" && res.data.H_Province != undefined) {
          register = res.data.H_Province
          if (res.data.H_City != "" && res.data.H_City != undefined) {
            register += (" " + res.data.H_City);
            if (res.data.H_Area != "" && res.data.H_Area != undefined) {
              register += (" " + res.data.H_Area);
            }
          }
        }
        // console.log(register)
        let living = "无";
        if (res.data.Province != "" && res.data.Province != undefined) {
          living = res.data.Province
          if (res.data.City != "" && res.data.City != undefined) {
            living += (" " + res.data.City);
            if (res.data.Area != "" && res.data.Area != undefined) {
              living += (" " + res.data.Area);
            }
          }
        }
        // console.log(living)
        if (!res.data.ImgAddr) {
          let avatarUrl = getApp().globalData.userInfo.avatarUrl;
          res.data.ImgAddr = avatarUrl;
        }
        if (!res.data.Name) {
          let nickName = getApp().globalData.userInfo.nickName;
          res.data.Name = nickName;
        }

        if (res.data.Sex != 1 && res.data.Sex != 0) {
          // console.log("需要设置：" +getApp().globalData.userInfo.gender)
          let gender = getApp().globalData.userInfo.gender;
          res.data.Sex = gender;
        }
        that.setData({
          msgData: res.data,
          marital: sFullName,
          register: register,
          living: living,
        })
      }
    })
  },
  bindEdit: function () {
    // console.log("编辑")
    wx.navigateTo({
      url: '/pages/editmsg/editmsg',
    })
  }
})
