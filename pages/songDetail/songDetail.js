// pages/songDetail/songDetail.js
import request from "../../utils/request";
import getSong from "../../utils/getSong";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    songUrl: '',
    picUrl: "",
    toggle: true,
    lrc: "",
    backAudio: {},
    songList: [],
    index: 0,
    id: "",
    requestList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  flagToggle(flag) {
    this.setData({
      flag
    })
  },
  onLoad: async function (options) {
    let {
      id,
      songList,
      index,
      listid
    } = options;
    let lists = [];
    if (listid) {
      let {
        playlist: {
          trackIds: list
        }
      } = await request(`/playlist/detail?id=${listid}`);

      list = list.reduce((arr,item)=>{
        return arr.concat(item.id)
      },[])
      index = list.indexOf(id*1);
      lists = list;
      console.log(list)
    }
    console.log(songList)
    songList = songList ? songList.split(",").map(item => item * 1) : lists;
    index = songList.indexOf(id * 1);
    this.setData({
      id,
      songList,
      index
    })
    //页面加载
    this.init(options);
    wx.setNavigationBarColor({
      backgroundColor: "#c20c0c",
      frontColor: "#ffffff"
    });
    //音乐播放
    this.data.backAudio = wx.getBackgroundAudioManager();

    //监听音乐是否在播放
    this.data.backAudio.onPlay(() => {
      this.flagToggle(true)
    });
    this.data.backAudio.onPause(() => {
      this.flagToggle(false)
    });
    this.data.backAudio.onStop(() => {
      this.flagToggle(false)
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
  async init() { //页面初始化网络请求以及歌曲自动播放
    //网络请求
    const UrlRequest = await request(`/song/url?id=${this.data.id}`);
    const {
      data: [{
        url: songUrl
      }]
    } = UrlRequest;
    const ListRequest = await request(`/song/detail?ids=${this.data.id}`)
    console.log(ListRequest)
    const {
      songs: [{
        name,
        al: {
          picUrl
        }
      }]
    } = ListRequest;
    console.log(ListRequest)
    const LrcRequest = await request(`/lyric?id=${this.data.id}`);
    const lrc = LrcRequest.lrc?LrcRequest.lrc.lyric:"";
    
    this.setData({
      picUrl,
      lrc,
      songUrl,
    })
    wx.setNavigationBarTitle({
      title: name
    });
    this.data.backAudio.src = this.data.songUrl;
    this.data.backAudio.title = name;
    this.data.backAudio.autoplay = true;

    return [UrlRequest, ListRequest, LrcRequest] //返回用于取消请求
  },
  //切换歌词和播放界面
  toggleLyrics() {
    this.setData({
      toggle: !this.data.toggle
    })
  },

  //播放和暂停
  play() {
    this.setData({
      flag: !this.data.flag
    })
    this.data.flag ? this.data.backAudio.play() : this.data.backAudio.pause()
  },
  // 切换歌曲
  toggleSong(event) {
    console.log(this.data.index)
    if (event.target.id === "pre") {
      console.log(this.data.index);
      console.log(this.data.songList);
      if (this.data.index == 0) {
        this.setData({
          id: this.data.songList[this.data.songList.length - 1],
          index: this.data.songList.length - 1
        })
      } else {
        this.setData({
          id: this.data.songList[this.data.index - 1],
          index: this.data.index - 1
        })
      }
    } else {
      if (this.data.index == this.data.songList.length - 1) {
        console.log(this.data.songList)
        this.setData({
          id: this.data.songList[0],
          index: 0
        })
      } else {
        const i = this.data.index * 1 + 1;
        this.setData({
          id: this.data.songList[i],
          index: this.data.index * 1 + 1
        })
      }
    }
    this.init()
  }
})