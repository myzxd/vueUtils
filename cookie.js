export default {
  defaults: {},
  converter: {},
  active() {
    return typeof document === 'undefined';
  },
  set(key, value, options) {
    let result;
    options = Object.assign({path: '/'}, this.defaults, options);
    if (typeof options.expires === 'number') {
      var expires = new Date();
      expires.setMilliseconds(expires.getMilliseconds() + options.expires * 864e+5);
      options.expires = expires;
    }

    // We're using "expires" because "max-age" is not supported by IE
    options.expires = options.expires ? options.expires.toUTCString() : '';

    try {
      result = JSON.stringify(value);
      if (/^[\{\[]/.test(result)) {
        value = result;
      }
    } catch (e) {
    }

    if (!this.converter.write) {
      value = encodeURIComponent(String(value))
        .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
    } else {
      value = this.converter.write(value, key);
    }

    key = encodeURIComponent(String(key));
    key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
    key = key.replace(/[\(\)]/g, escape);

    var attrs = '';

    for (let a in options) {
      if (!options[a]) {
        continue;
      }
      attrs += '; ' + a;
      if (options[a] === true) {
        continue;
      }
      attrs += '=' + options[a];
    }
    return (document.cookie = key + '=' + value + attrs);
  },

  get(key) {
    let result;

    if (!key) {
      result = {};
    }

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all. Also prevents odd result when
    // calling "get()"
    var cookies = document.cookie ? document.cookie.split('; ') : [];
    var rdecode = /(%[0-9A-Z]{2})+/g;
    var i = 0;

    for (; i < cookies.length; i++) {
      var parts = cookies[i].split('=');
      var cookie = parts.slice(1).join('=');

      if (cookie.charAt(0) === '"') {
        cookie = cookie.slice(1, -1);
      }

      try {
        var name = parts[0].replace(rdecode, decodeURIComponent);
        cookie = this.converter.read ?
          this.converter.read(cookie, name) : cookie.replace(rdecode, decodeURIComponent);

        if (key === name) {
          result = cookie;
          break;
        }

        if (!key) {
          result[name] = cookie;
        }
      } catch (e) {
      }
    }

    return result;
  },

  remove(key, options) {
    options = Object.assign({}, options, {expires: -1});
    this.set(key, '', options);
  }
};
