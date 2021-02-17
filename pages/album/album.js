import request from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    albums:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let  {weekData:albums} = await  request(`/top/album?limit=15&type=hot`)
    albums = albums.splice(0,9);
    this.setData({
      albums
    })
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
  toList(e){
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/albumDetail/albumDetail?id=${id}`,
    })
  }
})