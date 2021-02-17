// pages/search/search.js
import request from "../../utils/request"
Page({
  data: {
    hots: [],
    search: '',
    songs: []
  },
  onLoad: async function (options) {
    let {
      result: {
        hots
      }
    } = await request("/search/hot");
    this.setData({
      hots
    })
  },
  inputd(e) {
    const value = e.detail.value;
    this.setData({
      search: value
    })
  },
  search(e) {
    const search = e.currentTarget.dataset.search;
    this.setData({
      search
    })
  },
  async Tosearch() {
    const searchText = this.data.search.trim();
    console.log(searchText)
    this.setData({
      search: "",
    })
    if (searchText) {
      const {
        result: {
          songs
        }
      } = await request(`/search?keywords=${searchText}`);
      const songList = songs.reduce((str,item)=>{
        return str + `${item.id},`
      },'')
      console.log(songs)
      this.setData({
        songs,
        songList
      })
    }
  },
  async toPlay(e){
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/songDetail/songDetail?id=${id}&songList=${this.data.songList}`,
    })
  }
})