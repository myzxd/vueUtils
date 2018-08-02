import 'whatwg-fetch';
import Promise from 'promise-polyfill';

/**
 * 将对象转成 a=1&b=2的形式
 * @param obj 对象
 * @param arr
 * @param idx
 */
function obj2String (obj, arr = [], idx = 0) {
  if(!obj) {
    return '';
  }
  for (let item in obj) {
    arr[idx++] = item+'='+ encodeURIComponent( typeof obj[item] == 'object' ? JSON.stringify(obj[item]) : obj[item] )
  }
  return arr.join("&");
}

/**
 * 真正的请求
 * @param url 请求地址
 * @param options 请求参数
 * @param method 请求方式
 */
function commonFetcdh (url, options, method = 'GET', afterEach = ()=>{}) {
  let searchStr = obj2String(options)
  if (options && options.file) {
    searchStr = options.file
  }
  let initObj = {}
  if (method === 'GET') { // 如果是GET请求，拼接url
    if (searchStr.length > 0) {
      url += '?' + searchStr
    }
    initObj = {
      method: method,
      credentials: 'include'
    }
  } else {
    if (typeof searchStr === 'string') {
      initObj = {
        method: method,
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        }),
        body: JSON.stringify(options),
        credentials: 'include'
      }
    } else {
      initObj = {
        method: method,
        headers: new Headers({
          'contentType': false,
          'processData': false,
          'Accept': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        }),
        body: searchStr,
        credentials: 'include'
      }
    }
  }
  // if (!initObj.headers.headers.has('content-type') && options.body && typeof options.body.getBoundary === 'function') {
  //     headers.set('content-type', '; boundary=' + options.body.getBoundary());
  // }
  return new Promise((resolve, reject) => {
    fetch(url, initObj).then((res) => {

      if (res.status == 204) {
        return {
          code: '成功'
        }
      }else if(res.status >= 400) {
        const error = new Error(res.statusText);
        error.response = res;
        throw error;
      }
      return res.json()
    }).then((data) => {
      afterEach()
      resolve(data)
    }).catch((error) => {
      afterEach()
      error.response.json().then((data) => {
        alert(data.message)
      })
    })
  })
}

const _fetch = {
  /**
   * GET请求
   * @param url 请求地址
   * @param options 请求参数
   */
  get (url, options) {
    return commonFetcdh(url, options, 'GET')
  },

  /**
   * POST请求
   * @param url 请求地址
   * @param options 请求参数
   */
  post (url, options) {
    return commonFetcdh(url, options, 'POST')
  },

  /**
   * PATCH请求
   * @param url 请求地址
   * @param options 请求参数
   */
  patch (url, options= {}) {
    return commonFetcdh(url, options, 'PATCH')
  }
};

export default {
  install (Vue, config = {
    beforeEach () {},
    afterEach () {}
  }) {
    const _fetch = {
      /**
       * GET请求
       * @param url 请求地址
       * @param options 请求参数
       */
      get (url, options) {
        config.beforeEach();
        return commonFetcdh(url, options, 'GET', config.afterEach)
      },

      /**
       * POST请求
       * @param url 请求地址
       * @param options 请求参数
       */
      post (url, options) {
        config.beforeEach();
        return commonFetcdh(url, options, 'POST', config.afterEach)
      },

      /**
       * PATCH请求
       * @param url 请求地址
       * @param options 请求参数
       */
      patch (url, options= {}) {
        config.beforeEach();
        return commonFetcdh(url, options, 'PATCH', config.afterEach)
      }
    };

    //定义全局对象
    Object.defineProperty(Vue.prototype, '$fetch', {
      get: () => _fetch
    });
  }, ..._fetch
}
