// pages/leaderboard/leaderboard.js
import request from "../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Soaring: {},
    newL: {},
    hot: {},
    Original: {},
    Originalsongs: [],
    hotsongs: [],
    nowgsongs: [],
    Soaringsongs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let {
      list
    } = (await request("/toplist"));
    list = list.splice(0, 5);
    const [Soaring, newL, hot, Original] = list;
    let {
      playlist: {
        tracks: soar
      }
    } = await request(`/playlist/detail?id=${Soaring.id}`);
    console.log(soar)
    const Soaringsongs = soar.splice(0, 3);
    let {
      playlist: {
        tracks: newLi
      }
    } = await request(`/playlist/detail?id=${newL.id}`);
    const nowgsongs = newLi.splice(0, 3);
    let {
      playlist: {
        tracks: hots
      }
    } = await request(`/playlist/detail?id=${hot.id}`);
    const hotsongs = hots.splice(0, 3);
    let {
      playlist: {
        tracks: Originals
      }
    } = await request(`/playlist/detail?id=${Original.id}`);
    const Originalsongs = Originals.splice(0, 3);

    this.setData({
      Soaring,
      newL,
      hot,
      Original,
      Originalsongs,
      hotsongs,
      nowgsongs,
      Soaringsongs
    });

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
  toList(e) {
    const id = e.currentTarget.dataset.listid;
    wx.navigateTo({
      url: `/pages/songList/songList?id=${id}`,
    })
  },
  toplay(e) {
    const {
      id,
      listid
    } = e.currentTarget.dataset;
    console.log

    wx.navigateTo({
      url: `/pages/songDetail/songDetail?id=${id}&listid=${listid}`,
    })
  }
})