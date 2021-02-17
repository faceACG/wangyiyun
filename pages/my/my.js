
// pages/my/my.js
import request from "../../utils/request"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    pic:"",
    name:"",
    like:{},
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {

   
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    const id = wx.getStorageSync('id');
    if(!this.data.name){
      console.log(111)
      const {avatarUrl:pic,nickname:name} = (await request(`/user/detail?uid=${id}`)).profile;
      let  list = (await request(`/user/playlist?uid=${id}`)).playlist;
      console.log(list)
      list = list.reduce((arr,item)=>{
       if (item.userId == id){
         arr.push(item)
       }
       return arr;
      },[]);
      console.log(list)
      const like = list.shift(1);
       this.setData({
         pic: pic,
         name: name,
         like:like,
         list:list
       });
    }
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
  //登陆
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  toPlayList(event){
    const id = event.currentTarget.dataset.id ;
    wx.navigateTo({
      url: `/pages/songList/songList?id=${id}`,
    })
  }
})