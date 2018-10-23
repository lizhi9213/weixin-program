// pages/appeal/appeal.js
const imgApi = require("../../component/api_config.js").img_config; // 图片请求地址
const getMsg = require("../../component/api_config.js").my_msg_config; // 获取我的信息
const saveForm = require("../../component/api_config.js").save_msg_config; // 提交表单
const getIdentity = require("../../component/api_config.js").identity_config; // 获取身份信息
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: imgApi,
    identityList: [],
    objectArray: [{
      id: "1",
      name: "单身"
    }, {
      id: "2",
      name: "离异"
    }, {
      id: "3",
      name: "初婚"
    }, {
      id: "4",
      name: "再婚"
    }],
    marriage: "1",
    index: 0,
    endDate: "2010-12-31", // 截止日期
    date: '2000-01-01', //出生日期
    region: ['北京市', '北京市', '朝阳区'], // 现居地址
    customItem: '全部',
    register: ['北京市', '北京市', '朝阳区'], // 户籍地址
    registerItem: '全部',
    CaseId: "",
    msgData: {
      Name: "", // 姓名
      Sex: 0, // 性别
      PhoneNum: "", // 电话
      Identity: 0, // 身份
      Marital_Status: "", // 婚姻状态
      Remarks: "", // 备注
      Address: "", // 详细地址
      Birthday: "" // 生日
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '编辑智慧档案'//修改顶部标题的内容
    })
    // toast组件实例
    new app.ToastPannel();
    // 初始化设置日期结束范围
    let date = new Date();
    let nowYear = date.getFullYear();
    // console.log(nowYear)
    this.setData({
      endDate: nowYear + "-12-31"
    })
    // 获取身份信息列表
    this.getOption();
    // 获取当前用户信息并填充到表单
    this.setForm();
  },
  getOption: function () {
    let that = this;
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
        // 处理现居地和户籍地的选择
        // let register = [res.data.H_Province, res.data.H_City, res.data.H_Area]; // 户籍地
        // let living = [res.data.Province, res.data.City, res.data.Area]; // 现居地

        // 处理省市区
        let register = [];
        if (res.data.H_Province != "" && res.data.H_Province != undefined) {
          register.push(res.data.H_Province);
          if (res.data.H_City != "" && res.data.H_City != undefined) {
            register.push(res.data.H_City);
            if (res.data.H_Area != "" && res.data.H_Area != undefined) {
              register.push(res.data.H_Area);
            } else {
              register.push('全部');
            }
          } else {
            register.push('全部', '全部');
          }
        } else {
          register = ['北京', '北京', '北京']
        }

        let living = [];
        if (res.data.Province != "" && res.data.Province != undefined) {
          living.push(res.data.Province);
          if (res.data.City != "" && res.data.City != undefined) {
            living.push(res.data.City)
            if (res.data.Area != "" && res.data.Area != undefined) {
              living.push(res.data.Area);
            } else {
              living.push('全部');
            }
          } else {
            living.push('全部', '全部');
          }
        } else {
          living = ['北京', '北京', '北京']
        }
        let nickName = "";
        if (!res.data.Name) {
          nickName = getApp().globalData.userInfo.nickName;
          res.data.Name = nickName;
        }
        let gender = -1;
        if (res.data.Sex != 1 && res.data.Sex != 0) {
          // console.log("需要设置：" + getApp().globalData.userInfo.gender)
          gender = getApp().globalData.userInfo.gender;
          res.data.Sex = gender;
        }

        if (!res.data.Marital_Status) {
          res.data.Marital_Status = 1;
        }
        // 请求回调函数中写
        that.setData({
          msgData: {
            Name: res.data.Name || "",
            Sex: res.data.Sex,
            PhoneNum: res.data.PhoneNum,
            Identity: res.data.Identity,
            Marital_Status: res.data.Marital_Status,
            Remarks: res.data.Remarks,
            Address: res.data.Address
          },
          index: parseInt(res.data.Marital_Status) - 1,
          date: res.data.Birthday || '2000-01-01', // 生日
          region: living, // 现居地址
          register: register, // 户籍地址
          CaseId: res.data.CaseId
        })
      }
    })
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
    sendData.CaseId = that.data.CaseId
    sendData.OpenId = getApp().globalData.openid;
    sendData.Name = formData.name // 当事人姓名
    sendData.PhoneNum = formData.phone // 当事人电话
    sendData.Sex = formData.sex // 性别
    sendData.Marry = that.data.marriage // 当事人婚姻状况
    sendData.Identity = formData.identity // 当事人身份
    sendData.Birthday = that.data.date // 出生日期 
    sendData.Remarks = formData.remarks //其他说明
    sendData.Province = that.data.region[0] //现居地省份
    sendData.City = that.data.region[1] //现居地市
    sendData.Area = that.data.region[2] //现居地区
    sendData.HProvince = that.data.register[0] //户籍所在省
    sendData.HCity = that.data.register[1] //户籍所在市
    sendData.HArea = that.data.register[2] //户籍所在区
    sendData.Address = formData.Address //详细地址
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
          }, 800)
        } else {
          that.yhToast({
            msg: res.data.message,
            duration: 3000
          });
        }
      }
    })
  },
  /* 表单重置 */
  formReset: function () {
    this.setData({
      date: "2000-01-01", // 生日
      region: ['北京市', '北京市', '朝阳区'], // 现居地址
      register: ['北京市', '北京市', '朝阳区'], // 户籍地址
      msgData: {
        Name: "", // 姓名
        Sex: 0, // 性别
        PhoneNum: "", // 电话
        Identity: 0, // 身份
        Marital_Status: "", // 婚姻状态
        Remarks: "", // 备注
        Address: "", // 详细地址
        Birthday: "" // 生日
      }
    })
    // console.log('form发生了reset事件')
  },
  bindDateChange: function (e) {
    // 生日信息；
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindRegisterChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      register: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    let nowId = this.data.objectArray[e.detail.value].id;
    // console.log(nowId)
    this.setData({
      index: e.detail.value,
      marriage: nowId
    })
  }
})