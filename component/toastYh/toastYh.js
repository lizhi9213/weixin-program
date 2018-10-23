let _compData = {
  '_toast_.isHide': false, // 控制组件的显示隐藏
  '_toast_.content': '' // 显示的内容
}

let toastPannel = {
  // toast 显示方法
  yhToast: function (data) {
    let self = this;
    this.setData({ '_toast_.isHide': true, '_toast_.content': (data.msg || data) });
    setTimeout(function () {
      self.setData({ '_toast_.isHide': false })
    }, (data.duration || 3000));
  }
}

function ToastPannel() {
  // 拿到当前页对象
  let pages = getCurrentPages();
  let curPage = pages[pages.length - 1];
  this._page = curPage;
  // 小程序没有原型链
  Object.assign(curPage, toastPannel);
  // 附加到page上，方便访问
  curPage.toastPannel = this;
  // 把组件的数据合并到页面的data对象中
  curPage.setData(_compData);
  return this;
}

module.exports = {
  ToastPannel
}