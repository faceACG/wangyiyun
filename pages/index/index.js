// pages/index/index.js
import request from "../../utils/request";
import arrItem from "../../utils/ArrIItem";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recComList: [],
    list: 3, //主页推荐歌单的页数
    data: [],
    listID:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    //获取bannner
    this.setData({
      banners: (await request("/banner")).banners,
    })
    //获取每日歌单
    let {
      result: rec
    } =  await request("/personalized/?limit=10").then(res=>res);
    this.setData({
      recComList: arrItem(rec, 3)
    })
    //获取今日新歌
    let {
      result: data
    } = await request("/personalized/newsong");
    this.setData({
      data
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
  //跳转到歌单页面
  TOlist(event) {
    console.log(event)
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/songList/songList?id=${id}`,
    })
  },
  //播放歌曲
  play(event) {
    console.log(event.currentTarget.dataset)
    let {
      id,
      pre
    } = event.currentTarget.dataset;
    pre = pre.map(item=>{
      return item.id
    })
    const i = pre.indexOf(id)
    wx.navigateTo({
      url: `/pages/songDetail/songDetail?id=${id}&songList=${pre}&index=${i}`,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})