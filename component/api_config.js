var host = "https://mzb.hztx-ha.com";
var host1 = "https://mzb.hztx-ha.com";


var config = {
  // 下面的地址配合 Server 工作
  host,

  host1,

  // 图片
  img_config: `${host1}/WxImages/`,

  // 测试图片
  testImg_config: `${host1}/WxImages`,

  // 登陆向后台发送code
  send_code_config: `${host}/data/WeixinPro.ashx?Action=GetOpenId
`,

  // 微信矩阵公众号列表接口
  wx_list_config: `${host}/data/WeixinPro.ashx?Action=GetWeiXinList`,

  // 获取咨询类型接口 // 参数：ParentId=’7c45019f-9d03-471b-83a3-3ddfe61a8ae7’
  askTypeList_config: `${host}/data/WeixinPro.ashx?Action=GetAskTypeList`,

  // 获取咨询选项接口 // 参数：ParentId=’咨询类型的id’
  askChildTypeList_config: `${host}/data/WeixinPro.ashx?Action=GetAskChildTypeList`,

  // 获取身份信息选项接口 // 参数：ParentId='7d10f754-734c-4f76-8446-fdf703f912b5'
  identity_config: `${host}/data/WeixinPro.ashx?Action=GetAskChildTypeList`,

  // 诉求提交接口
  appeal_config: `${host}/data/WeixinPro.ashx?Action=AddAppeal`,

  // 获取我的信息接口  // OpenId：微信id
  my_msg_config: `${host}/data/WeixinPro.ashx?Action=GetMyInfoDetail`,

  // 保存我的信息接口  // OpenId：微信id
  save_msg_config: `${host}/data/WeixinPro.ashx?Action=UpdateMyInfo`,

  // 保存微信用户信息 
  save_userInfo_config: `${host}/Data/WeixinPro.ashx?Action=AddWxUserInfo`,

  // 智慧档案获取状态 
  get_status_config: `${host}/data/WeixinPro.ashx?Action=CheckApealStatus`,
}

// 导出对象
module.exports = config