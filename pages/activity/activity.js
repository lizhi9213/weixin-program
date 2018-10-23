//index.js
//获取应用实例
const imgApi = require("../../component/api_config.js").img_config; // 图片请求地址
//引入图片预加载组件
const ImgLoader = require('../../img-loader/img-loader.js')
const app = getApp()
Page({
  data: {
    autoplay: false,
    interval: 5000,
    duration: 1000,
    circular: true,
    movies: [{
      minImg: imgApi + 'active02_min.jpg',
      oriImg: imgApi + 'active02.png',
      loaded: false,
      href: 'https://mzb.hztx-ha.com/h5/newque.aspx'
    }],
    swiperCurrent: 0
  },
  onLoad: function () {
    var that = this;
    wx.setNavigationBarTitle({
      title: '智能互动'//修改顶部标题的内容
    })

    //初始化图片预加载组件，并指定统一的加载完成回调
    this.imgLoader = new ImgLoader(this, this.imageOnLoad.bind(this))
    // 初始化图片预加载, // 在请求到数据回调成功中使用
    this.loadImage();
  },
  loadImage() {
    //同时发起全部图片的加载
    this.data.movies.forEach(item => {
      this.imgLoader.load(item.oriImg)
    })
  },
  //加载完成后的回调
  imageOnLoad(err, data) {
    console.log('图片加载完成', err, data.src)
    const imgList = this.data.movies.map(item => {
      if (item.oriImg == data.src)
        item.loaded = true
      return item
    })
    this.setData({ movies: imgList })
  },
  hrefTo: function (e) {
    //页面跳转函数
    // console.log(e)
    // 跳转到外部页面,out专门用于渲染
    var url = e.target.dataset.url
    wx.navigateTo({
      url: "/pages/out/out?url=" + url,
      success: function () {

      }, //成功后的回调；
      fail: function () { }, //失败后的回调；  
      complete: function () { } //结束后的回调(成功，失败都会执行)
    })
  },
  swiperChange: function (e) {
    if (this.data.swiperCurrent == e.detail.current) {
      return;
    }
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  swiperClick: function (e) {
    // console.log(e.currentTarget.dataset.dir);
    var type = e.currentTarget.dataset.dir;
    // 1是向左，2是向右
    // 获取总页数，获取当前页码
    var nowCur = this.data.swiperCurrent; // 当前页码
    var numCur = this.data.movies.length; // 总页数
    var goCur;
    // 判断是前进还是后退
    if (type == 1) {
      // 左侧前一个
      if (nowCur == 0) {
        goCur = numCur - 1;
      } else {
        goCur = nowCur - 1;
      }

    } else if (type == 2) {
      // 右侧下一个
      if (nowCur == numCur - 1) {
        goCur = 0;
      } else {
        goCur = nowCur + 1;
      }

    }
    // 执行轮播图动画过渡到目标slider
    this.setData({
      swiperCurrent: goCur
    })
  },
  swipclick: function (e) {
    // 点击图片跳转
    console.log(this.data.swiperCurrent);
    // wx.switchTab({
    //   url: this.data.links[this.data.swiperCurrent]
    // })
  }
})
