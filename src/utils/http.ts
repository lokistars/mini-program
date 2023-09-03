
const baseURL = 'http://192.168.10.2:8090'

// 添加拦截器
const httpInterceptor = {
    invoke(options: UniApp.RequestOptions) {
        // 1. 非 http 开头需拼接地址
        if (!options.url.startsWith('http')) {
            options.url = baseURL + options.url
        }
        // 2. 请求超时, 默认 60s
        options.timeout = 10000
        // 3. 添加小程序端请求头标识
        options.header = {
            ...options.header,
            'source-client': 'miniapp',
        }
    },
}

uni.addInterceptor("request", httpInterceptor)
uni.addInterceptor("uploadFile", httpInterceptor)


type Data<T> = {
    status:Number
    message: string
    devMessage: string
    data: T
}


// 2.2 添加类型，支持泛型
export const http = <T>(options: UniApp.RequestOptions) => {
    // 1. 返回 Promise 对象
    return new Promise<Data<T>>((resolve, reject) => {
      uni.request({
        ...options,
        // 响应成功
        success(res) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            // 提取核心数据 res.data
            resolve(res.data as Data<T>)
          } else {
            uni.showToast({
              icon: 'none',
              title: (res.data as Data<T>).message || '请求错误',
            })
            reject(res)
          }
        },
        // 响应失败
        fail(err) {
          uni.showToast({
            icon: 'none',
            title: '网络错误，换个网络试试',
          })
          reject(err)
        },
      })
    })
  }