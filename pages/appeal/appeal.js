// pages/appeal/appeal.js
const imgApi = require("../../component/api_config.js").img_config; // 图片请求地址
const askType = require("../../component/api_config.js").askTypeList_config; // 获取咨询类型接口
const askChild = require("../../component/api_config.js").askChildTypeList_config; // 获取咨询选项接口
const saveForm = require("../../component/api_config.js").appeal_config; // 提交表单
const getIdentity = require("../../component/api_config.js").identity_config; // 获取身份信息
const getMsg = require("../../component/api_config.js").my_msg_config; // 获取我的信息
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: imgApi,
    objectArray: [],
    index: 0,
    typeId: "",
    objectOption: [],
    pindex: 0,
    optionId: "",
    identityList: [],
    userName: "", //用户名字
    userPhone: "", //用户电话
    userIdentity: 0 //用户身份
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '诉求提交'//修改顶部标题的内容
    })
    // toast组件实例
    new app.ToastPannel();
    // 初始化咨询类型下拉
    this.getSelectList();
    // 初始化用户信息
    this.setForm();
  },
  /* 表单提交*/
  formSubmit: function (e) {
    let that = this;
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    // 首先验证逻辑
    let formData = e.detail.value;
    if (formData.name == "") {
      that.yhToast({
        msg: "姓名不能为空!",
        duration: 3000
      });
      return;
    }
    if (formData.phone == "") {
      that.yhToast({
        msg: "电话不能为空!",
        duration: 3000
      });
      return;
    }
    if (that.typeMsg == "") {
      that.yhToast({
        msg: "咨询类型不能为空!",
        duration: 3000
      });
      return;
    }
    if (formData.content == "") {
      that.yhToast({
        msg: "诉求内容不能为空!",
        duration: 3000
      });
      return;
    }
    let testPhone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if (!testPhone.test(formData.phone)) {
      that.yhToast({
        msg: "您输入的电话号码格式不正确!",
        duration: 3000
      });
      return;
    }
    // 采集数据
    let sendData = {}
    sendData.OpenId = getApp().globalData.openid //微信openid
    sendData.Name = formData.name // 当事人姓名
    sendData.Phone = formData.phone // 当事人电话
    sendData.Identity = formData.identity // 当事人身份
    sendData.InquiryType = that.data.typeId // 咨询类别
    sendData.InquirySubType = that.data.optionId // 咨询子类别
    sendData.Appeal = formData.content //诉求内容
    // 发送给后台
    // console.log(sendData);
    wx.request({
      url: saveForm,
      data: sendData,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data)
        // 判断是否提交成功，如果成功提示成功并返回上一页。
        if (res.data.type == 1) {
          wx.showToast({
            title: "提交成功！",
            icon: 'succes',
            duration: 700,
            mask: true
          })
          setTimeout(function () {
            wx.navigateBack() // 返回上一页 delta // 可跨页跳转
          }, 800);
        } else {
          that.yhToast({
            msg: res.data.message,
            duration: 3000
          });
        }
      }
    })
  },
  setForm: function () {
    let that = this;
    // console.log(getApp().globalData.openid)
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
        // 初始化用户姓名
        // 请求回调函数中写
        that.setData({
          userName: (!res.data.Name ? getApp().globalData.userInfo.nickName : res.data.Name), //用户名字
          userPhone: res.data.PhoneNum || "", //用户电话
          userIdentity: res.data.Identity //用户身份
        })
      }
    })
  },
  /* 表单重置 */
  formReset: function () {
    // this.setData({
    //   typeId: "",
    //   optionId: ""
    // })
    // this.getSelectList()
    // console.log('form发生了reset事件')
  },
  /* 获取下拉选项 */
  getSelectList: function () {
    let that = this;
    // 获取咨询类型
    wx.request({
      url: askType,
      data: {
        ParentId: '7c45019f-9d03-471b-83a3-3ddfe61a8ae7'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data)
        that.setData({
          objectArray: res.data,
          typeId: res.data[0].id
        })
        that.getSelectChild();
      }
    })
    // 获取身份信息列表
    wx.request({
      url: getIdentity,
      data: {
        ParentId: '7d10f754-734c-4f76-8446-fdf703f912b5'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data)
        that.setData({
          identityList: res.data,
        })
      }
    })
  },
  /*咨询类型下拉子选项，跟上级联动*/
  getSelectChild: function () {
    let that = this;
    // 先判断父级是否选择了，选择了再请求子集
    if (this.data.typeId == "") {
      that.yhToast({
        msg: "请先选择咨询类型!",
        duration: 3000
      });
      return;
    }
    // 获取查询类型列表
    wx.request({
      url: askChild,
      data: {
        ParentId: that.data.typeId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data) // objectOption
        that.setData({
          objectOption: res.data,
          optionId: res.data[0].id
        })
      }
    })
  },
  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    let nowId = this.data.objectArray[e.detail.value].id;
    // console.log(nowId)
    this.setData({
      index: e.detail.value,
      typeId: nowId
    })
    // 联动子集数据
    this.getSelectChild()
  },
  pickerOption: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    let nowId = this.data.objectOption[e.detail.value].id;
    // console.log(nowId)
    this.setData({
      pindex: e.detail.value,
      optionId: nowId
    })
  }
})