/**
 * fetch封装的目的
 * 解决fetch使用的时候一些不方便的操作
 * 1，get（query string），post（request payload），请求参数的差别，
 * 2, 请求头的差异（get，post，文件上传）
 * 3，fetch请求默认是不带cookie的，需要设置fetch(url, {credentials: 'include'})
 * 4，错误处理，服务器返回400,500这样的错误码时不会reject,只有网络错误这些导致请求不能完成时，fetch才会被reject.
 * 5，Fetch 和 Promise 一样，一旦发起，不能中断，也不会超时，只能等待被 resolve 或 reject。
 * 6，兼容问题，promise， fetch， 如果不能使用fetch则转换为原生的xhr
 */

/**
 * 将对象转成 a=1&b=2的形式
 * @param obj 对象
 */
function obj2String(obj, arr = [], idx = 0) {
  for (let item in obj) {
    arr[idx++] = [item, obj[item]];
  };
  return new URLSearchParams(arr).toString();
}

let fetchGloble = {
  berforeEach () {},

  afterEach () {},

  errorEach () {},

  successEach () {}
};

const commonFetcdh = ({
  url = '',
  data = {},
  methods = 'get',
  headers = {},
}) => {
  fetchGloble.berforeEach();

  const headerObj = new Headers(
    Object.assign({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, headers)
  );
  let request = '';

  if (data.file) {
    headers.set('Content-Type', 'multipart/form-data');
  }
  if (methods === 'get') {
    url = url+'?'+obj2String(data);
    request = new Request({
      methods,
      credentials: 'include',
      headers: headerObj,
    });
  } else {
    request = new Request({
      headers: headerObj,
      methods,
      body: JSON.stringify(data),
      credentials: 'include',
    });
  }


  return fetch(url, request).then((res) => {
    fetchGloble.afterEach();
    if (res.status >= 400) {
      fetchGloble.errorEach();
      return Promise.reject();
    } else if (res.status >= 500) {
      fetchGloble.errorEach();
      return Promise.reject({
        msg: '服务器异常'
      });
    }
    fetchGloble.successEach();
    return res.json();
  });
};

const FetchApi = {
  get (url, data) {
    return commonFetcdh({
      url, data, methods: 'get',
    });
  },
  post (url, data) {
    return commonFetcdh({
      url, data, methods: 'post',
    });
  },
}

export default {
  ...FetchApi,
  setFetchGloble(options) {
    fetchGloble = Object.assign({}, fetchGloble, options);
  },
  install(Vue, options) {
    fetchGloble = Object.assign({}, fetchGloble, options);
    Vue.prototype.$fetch = FetchApi;
  },
};
/**
 * fetch.get('接口地址', {请求参数}).then('成功').catch('失败')
 * fetch({
 *   url: '',
 *   metach: '',
 *   data: {aa: 'cccc', cc: 'bbb'},  aa=ccccc&cc=bb
 *   headers: {}
 * })
 */

