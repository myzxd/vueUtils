export default {
  /**
   * 以指定长度截断字符串
   * @param str
   * @param len
   * @param ending
   * @returns {string}
   */
  truncate: function (str, len, ending = '...') {
    let newLength = 0;
    let newStr = "";
    const chineseRegex = /[^\x00-\xff]/g;
    let singleChar = "";
    const strLength = str.replace(chineseRegex, "**").length;
    for (let i = 0; i < strLength; i++) {
      singleChar = str.charAt(i).toString();
      if (singleChar.match(chineseRegex) != null) {
        newLength += 2;
      } else {
        newLength++;
      }
      if (newLength > len) {
        break;
      }
      newStr += singleChar;
    }

    if (strLength > len) {
      newStr += ending;
    }
    return newStr;
  },

  /**
   * 下载文件
   * @param name
   * @param data
   */
  fetchFile(name, data) {
    const blob = new Blob([data]);
    if ('download' in document.createElement('a')) {
      const link = document.createElement('a');
      link.download = name;
      link.style.display = 'none';
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(link.href);
      document.body.removeChild(link)
    } else { // IE10+下载
      navigator.msSaveBlob(blob, name)
    }
  },

  /**
   * 深度获取对象数据
   * @param obj
   * @param path
   * @param defVal
   * @returns {*}
   */
  dataGet(obj, path, defVal) {
    if (!path) {
      throw new Error('Path `' + path + '` is empty');
    }
    path = path.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '');
    let keyArr = path.split('.'), key, temp = obj;
    while (true) {
      key = keyArr.shift();
      if (key === undefined) {
        return temp;
      }
      if (key in temp) {
        temp = temp[key];
      } else {
        return defVal;
      }
    }
  },

  /**
   * 深度判断对象数据是否存在
   * @param obj
   * @param path
   * @returns {boolean}
   */
  dataHas(obj, path) {
    if (!path) {
      throw new Error('Path `' + path + '` is empty');
    }
    path = path.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '');
    let keyArr = path.split('.'), key, temp = obj;

    while (true) {
      key = keyArr.shift();
      if (key === undefined) {
        return true;
      }
      if (key in temp) {
        temp = temp[key];
      } else {
        return false
      }
    }
  },

  /**
   * 深度设置对象
   * @param obj
   * @param path
   * @param val
   */
  dataSet(obj, path, val) {
    if (!path) {
      throw new Error('Path `' + path + '` is empty');
    }
    path = path.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '');
    let keyArr = path.split('.'), key, temp = obj;

    while (true) {
      key = keyArr.shift();
      if (!key in temp) {
        temp[key] = {};
      }
      if (keyArr.length === 0) {
        temp[key] = val;
        break;
      } else {
        temp = temp[key];
      }
    }
  },

  /**
   * 仅合并已经存在的对象属性
   * @param obj
   * @param others
   * @returns {*}
   */
  mergeExist(obj, ...others) {
    for(let other of others) {
      for(let name in obj) {
        if(other.hasOwnProperty(name) && other[name] !== undefined) {
          obj[name] = other[name];
        }
      }
    }
    return obj;
  },

  /**
   * 对字符串做加码处理
   * @param str
   * @param start
   * @param end
   * @returns {string}
   */
  maskString(str, start = 2, end = -1) {
    if(end < 0) {
      end = start;
    }
    let s = str.slice(0, start);
    let e = str.slice(-end);
    let m = '';
    for(let i=0; i<=str.length; i++) {
      m += '*';
    }
    return s + m + e;
  }
}
