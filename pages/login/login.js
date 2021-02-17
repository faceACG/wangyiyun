import request from "../../utils/request"
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "13698451034",
    possword: "333442lyg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  phoneInput(event) {
    this.setData({
      phone: event.detail.value
    })
  },
  posswordInput(event) {
    this.setData({
      possword: event.detail.value
    })
  },
  testPhone(event) {
    const phone = event.detail.value,
      reg = /^1[3|4|5|7|8][0-9]{9}$/,
      result = reg.test(phone);
    if (!result) {
      wx.showToast({
        icon: "none",
        title: '账号错误，请输入正确的手机号',
      })
    }
  },
  testPossword(event) {
    const possword = event.detail.value;
    if (possword.length < 6) {
      wx.showToast({
        title: '请重新确认密码',
        icon: "none",
      })
    }
  },
   async login() {
    const {
      phone,
      possword
    } = this.data
    console.log(phone);
  const result =  await request(`/login/cellphone?phone=${phone}&password=${possword}`);
  if(result.code == 502){
    wx.showToast({
      title: '密码错误',
      icon:"none"
    })
  }else if(result.code == 200){
    console.log(result)
    const id = result.account.id
    wx.showToast({
      title:"登陆成功"
    })
    wx.setStorage({
      key:"id",
      data:id
    })
    wx.navigateBack({
      delta:1
    })
  }
  }
})