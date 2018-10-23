//app.js
import { ToastPannel } from './component/toastYh/toastYh.js' // 导入消息提示组件
const sendCode = require("./component/api_config.js").send_code_config; // 发送code
App({
  ToastPannel,
  onLaunch: function () {
    let that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: function (res) {
        if (res.code) {
          // console.log(res.code)
          //发起网络请求，把code 传给后台
          wx.request({
            url: sendCode,
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              // console.log(res.data)
              if (res.data.openid && res.data.openid != "" && res.data.openid != null) {
                that.globalData.openid = res.data.openid;
                // console.log(res.data.openid)
                // console.log(that.globalData.openid)
              } else {
                wx.showModal({
                  title: '提示',
                  content: '无法获取到用户信息，点击确定退出重新打开小程序',
                  success: function () {
                    if (res.confirm) {
                      wx.navigateBack({
                        delta: -1
                      })
                    } else if (res.cancel) {
                      wx.navigateBack({
                        delta: -1
                      })
                    } else {
                      wx.navigateBack({
                        delta: -1
                      })
                    }
                  },
                })
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
    // 判断授权信息
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 变更 登陆状态
          that.globalData.isGrant = 1;// 标记为已经授权
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              // console.log(res.userInfo)
              that.globalData.userInfo = res.userInfo; // 存储授权信息
            }
          })
        }
      }
    })
  },
  toLogin: function () {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  globalData: {
    userInfo: null,
    openid: "",
    isGrant: 0 // 是否授权
  }
})