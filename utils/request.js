import config from "../config"
export default (url, data = {}, methods = "get") => {
  return new Promise((resolve, rejects) => {
    return wx.request({
      url: config.host + url,
      data,
      methods,
      success: (res) => {
        resolve(res.data);
      },
      fail(err) {
        rejects(err);
      }
    })
  })
}

//promise