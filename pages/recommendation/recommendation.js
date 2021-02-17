import request from "../../utils/request";
import getSong from "../../utils/getSong";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    
    const data = await request(`/playlist/detail?id=5172410111`)
    const list = data.playlist.trackIds.splice(0,15).reduce((arr,item)=>{
      arr.push(item.id);
      return arr;
    },[]);
    const listId = getSong(list);
    
    const {songs} = await request(`/song/detail?ids=${listId}`);
    this.setData({
    songs,
     songList: list
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
  toplay(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/songDetail/songDetail?id=${id}&listid=5172410111`,
    })
  }
})