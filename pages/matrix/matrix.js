//index.js
//获取应用实例
var QR = require("../../utils/qrcode.js");
const wxList = require("../../component/api_config.js").wx_list_config; // 微信公众号列表
const app = getApp()

Page({
  data: {
    routers: [],
    testRouter: [{ MatrixId: "3886543a-58f1-11e8-adc7-44a84203f5fd", MtxName: "两岸婚姻家庭服务", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA4NDIxMDc3OA==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/lianganhunyinjiatingfuwu.png" },
    { MatrixId: "4dd8bc33-58f1-11e8-adc7-44a84203f5fd", MtxName: "国际中山会", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAwNzgzNzcwMw==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/guojizhongshanhui.jpg" },
    { MatrixId: "9d1e64f1-58f0-11e8-adc7-44a84203f5fd", MtxName: "桃园新移民女性关怀", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU4MTA3MDAyNA==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/taoyuanxinyiminnvxingguanhuai.jpg" },
    { MatrixId: "faecf796-58f0-11e8-adc7-44a84203f5fd", MtxName: "互爱新住民", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUxODEwMjc0OQ==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/huaixinzhumin.jpg" },
    { MatrixId: "20a92063-59a2-11e8-8358-44a84203f5fd", MtxName: "湛秀英", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIyMjg5NjA1MQ==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/zhanxiuying.jpg" },
    { MatrixId: "52192de0-59a2-11e8-8358-44a84203f5fd", MtxName: "婚促会", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUzNzEwNTI5Nw==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/huncuhui.jpg" },
    { MatrixId: "5c3f90cf-59a2-11e8-8358-44a84203f5fd", MtxName: "两岸文创交流平台", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI4NDcyMzY0Mw==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/lianganwenchuangjiaoliupingtai.jpg" },
    { MatrixId: "6e660380-59a2-11e8-8358-44a84203f5fd", MtxName: "台湾致公党", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI2NTExMTE5OA==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/taiwanzhigongdang.jpg" },
    { MatrixId: "7ed93efb-59a2-11e8-8358-44a84203f5fd", MtxName: "两岸情新住民关怀之家", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAxMDc2OTY2Mw==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/lianganqingxinzhuminguanhuaizhijia.jpg" },
    { MatrixId: "97256a18-59a2-11e8-8358-44a84203f5fd", MtxName: "两岸创意城市文化推广", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU1NzA5MDg3Ng==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/lianganchuangyichengshiwenhuatuiguang.jpg" },
    { MatrixId: "ad003a26-59a2-11e8-8358-44a84203f5fd", MtxName: "两岸新家庭", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI3ODczMTI5OQ==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/lianganxinjiating.jpg" },
    { MatrixId: "b71e54d8-59a2-11e8-8358-44a84203f5fd", MtxName: "台湾新住民", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUyNTExNDk0OA==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/taiwanxinzhumin.jpg" },
    { MatrixId: "c556f3bb-59a2-11e8-8358-44a84203f5fd", MtxName: "台湾新住民互动平台", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI4MDY4MjA4Nw==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/taiwanxinzhuminhudongpingtai.jpg" },
    { MatrixId: "d8813dbe-59a2-11e8-8358-44a84203f5fd", MtxName: "台湾俪雅会", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU1NTM5MjY0Ng==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/tailianliyahui.jpg" },
    { MatrixId: "ef1eebc4-59a2-11e8-8358-44a84203f5fd", MtxName: "夏莉的AMOUR", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI3MjQ4ODQ2Nw==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/xialideAMOUR.jpg" },
    { MatrixId: "00ab54b3-59a3-11e8-8358-44a84203f5fd", MtxName: "桃园市上海同乡会", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU4NDMxODM1OA==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/taoyuanshishanghaitongxianghui.jpg" },
    { MatrixId: "13023258-59a3-11e8-8358-44a84203f5fd", MtxName: "海峡家缘网", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUzNDc1NTkzNg==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/haixiajiayuanwang.jpg" },
    { MatrixId: "23e7f848-59a3-11e8-8358-44a84203f5fd", MtxName: "湘女在台湾", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI2Nzc0ODUxMA==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/xiangnvzaitaiwan.jpg" }]
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
      title: '智能矩阵'//修改顶部标题的内容
    })

    // 获取微信公众号矩阵列表并处理、
    this.getWxlist();
  },
  getWxlist() {
    let that = this;
    // console.log(wxList)
    wx.request({
      url: wxList,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          routers: res.data
        });
      }
    })
  },
  hrefPublic(e) {
    console.log("111")
    /* 跳转到公众号处理*/
    wx.navigateTo({
      url: '/pages/matrixtips/matrixtips',
    })
  }
})


/*testRouter: [{ MatrixId: "3886543a-58f1-11e8-adc7-44a84203f5fd", MtxName: "两岸婚姻家庭服务", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA4NDIxMDc3OA==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/lianganhunyinjiatingfuwu.png" },
{ MatrixId: "4dd8bc33-58f1-11e8-adc7-44a84203f5fd", MtxName: "国际中山会", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAwNzgzNzcwMw==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/guojizhongshanhui.jpg" },
{ MatrixId: "9d1e64f1-58f0-11e8-adc7-44a84203f5fd", MtxName: "桃园新移民女性关怀", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU4MTA3MDAyNA==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/taoyuanxinyiminnvxingguanhuai.jpg" },
{ MatrixId: "faecf796-58f0-11e8-adc7-44a84203f5fd", MtxName: "互爱新住民", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUxODEwMjc0OQ==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/huaixinzhumin.jpg" },
{ MatrixId: "20a92063-59a2-11e8-8358-44a84203f5fd", MtxName: "湛秀英", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIyMjg5NjA1MQ==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/zhanxiuying.jpg" },
{ MatrixId: "52192de0-59a2-11e8-8358-44a84203f5fd", MtxName: "婚促会", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUzNzEwNTI5Nw==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/huncuhui.jpg" },
{ MatrixId: "5c3f90cf-59a2-11e8-8358-44a84203f5fd", MtxName: "两岸文创交流平台", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI4NDcyMzY0Mw==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/lianganwenchuangjiaoliupingtai.jpg" },
{ MatrixId: "6e660380-59a2-11e8-8358-44a84203f5fd", MtxName: "台湾致公党", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI2NTExMTE5OA==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/taiwanzhigongdang.jpg" },
{ MatrixId: "7ed93efb-59a2-11e8-8358-44a84203f5fd", MtxName: "两岸情新住民关怀之家", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAxMDc2OTY2Mw==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/lianganqingxinzhuminguanhuaizhijia.jpg" },
{ MatrixId: "97256a18-59a2-11e8-8358-44a84203f5fd", MtxName: "两岸创意城市文化推广", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU1NzA5MDg3Ng==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/lianganchuangyichengshiwenhuatuiguang.jpg" },
{ MatrixId: "ad003a26-59a2-11e8-8358-44a84203f5fd", MtxName: "两岸新家庭", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI3ODczMTI5OQ==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/lianganxinjiating.jpg" },
{ MatrixId: "b71e54d8-59a2-11e8-8358-44a84203f5fd", MtxName: "台湾新住民", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUyNTExNDk0OA==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/taiwanxinzhumin.jpg" },
{ MatrixId: "c556f3bb-59a2-11e8-8358-44a84203f5fd", MtxName: "台湾新住民互动平台", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI4MDY4MjA4Nw==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/taiwanxinzhuminhudongpingtai.jpg" },
{ MatrixId: "d8813dbe-59a2-11e8-8358-44a84203f5fd", MtxName: "台湾俪雅会", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU1NTM5MjY0Ng==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/tailianliyahui.jpg" },
{ MatrixId: "ef1eebc4-59a2-11e8-8358-44a84203f5fd", MtxName: "夏莉的AMOUR", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI3MjQ4ODQ2Nw==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/xialideAMOUR.jpg" },
{ MatrixId: "00ab54b3-59a3-11e8-8358-44a84203f5fd", MtxName: "桃园市上海同乡会", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU4NDMxODM1OA==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/taoyuanshishanghaitongxianghui.jpg" },
{ MatrixId: "13023258-59a3-11e8-8358-44a84203f5fd", MtxName: "海峡家缘网", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUzNDc1NTkzNg==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/haixiajiayuanwang.jpg" },
{ MatrixId: "23e7f848-59a3-11e8-8358-44a84203f5fd", MtxName: "湘女在台湾", MtxUrl: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI2Nzc0ODUxMA==&scene=124#wechat_redirect", MtxPic: "http://171.11.74.219:18518/WxImages/MatrixImage/xiangnvzaitaiwan.jpg" }]*/