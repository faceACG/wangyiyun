// pages/albumDetail/albumDetail.js
import request from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const id = options.id;
    const {
      songs,
      album
    } = await request(`/album?id=${id}`)
    console.log(album)
    let songList = '';
    songs.forEach(item => {
      songList += `${item.id},`
    })


    this.setData({
      songs,
      album,
      songList
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
  play(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/songDetail/songDetail?id=${id}&songList=${this.data.songList}`
    })
  }
})