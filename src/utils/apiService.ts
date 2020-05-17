import axios, { Method } from 'axios'

function api({ method, url, data, params }: any) {
  return new Promise((resolve: any, reject: any) => {
    axios({
      method: method as Method,
      url,
      data,
      params,
    })
      .then(resolve)
      .catch((err) => {
        alert(err)
        reject(err)
      })
  })
}

export default api
