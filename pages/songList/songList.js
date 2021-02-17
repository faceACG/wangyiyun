// pages/songList/songList.js
import request from "../../utils/request"
import getSong from "../../utils/getSong"
Page({
  data: {
    id: 0,
    name: "",
    tracks: [],
    coverImgUrl: '',
    info: "",
    tag: [],
    current: 0,
    listArr: [],
    total: 0
  },

  async init() {
    const {
      playlist: {
        name,
        coverImgUrl,
        trackIds,
        tags,
        description,
      }
    } = await request(`/playlist/detail?id=${this.data.id}`);

    //从trackIds中获取歌单所有歌曲
    let listArr = trackIds.reduce((arr, item) => {
      arr.push(item.id);
      return arr;
    }, []);
    this.setData({
      listArr
    })
    const result = getSong(listArr);
    this.setData({
      name,
      coverImgUrl,
      tags,
      description
    });

    if (listArr.length > 20) { //只加载20首音乐,下拉加载更多
      const total = Math.floor(listArr.length / 20),
        result = getSong(listArr.slice(0, 20)),
        current = 0;
      this.limitSong(result);
      this.setData({
        current,
        total
      })
    } else {
      this.limitSong(result)
    }
    wx.setNavigationBarTitle({
      title: name,
    });
    wx.setNavigationBarColor({
      backgroundColor: "#c20c0c",
      frontColor: "#ffffff"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
    })
    this.init()
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
  play(event) { //播放歌曲
    console.log(this.data.tracks)
    const {
      listid,
      id
    } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/songDetail/songDetail?id=${id}&listid=${listid}`,
    })
  },
  getMore(e) {
    // const baseHeight = e.detail.scrollTop / 300;
    let current = this.data.current,
      total = this.data.total;
      console.log(current)
    if (e.detail.scrollTop - 200 * current > 200) {
      if (total >= current+1) {
        current++;
        const result = this.data.listArr.slice(20 * current, 20 * (current + 1));
        this.limitSong(result);
      } else {
        const length = this.data.listArr.length-1;
        const result = this.data.listArr.slice(20* current, length);
        console.log(result)
        if (result.lengt > 0) {
          this.limitSong(result)
        }
      }
      this.setData({
        current
      })
    }
  },
  //获取歌曲
  async limitSong(result) {
    console.log(result)
    let {
      songs: tracks
    } = (await request(`/song/detail?ids=${result}`));
    tracks = this.data.tracks.concat(tracks); //push返回的是数组新的长度
    this.setData({
      tracks,
    });
  }
})