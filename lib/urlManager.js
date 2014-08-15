/*!
 * urlManager JavaScript Library v0.1.1
 *
 * Copyright (c) 2012 amazedkoumei (Twitter: @amazedkoumei, Blog:http://blog.amazedkoumei.com)
 * Licensed under the MIT license + "keep this comment block even if you modify it".
 *
 * History:
 *  05-03-2012 new created
 *  05-06-2012 added getParam
 *  05-07-2012 modified isGoogle bugfix for google analytics and google calendar and more.
 */
var urlManager = $({});

$.extend(urlManager, {
  isGoogle: function(url) {
    return url.match(/https?:\/\/www\.google[^\/]+?(\/#|\/search|\/webhp|$)/) != null;
  },
  getGoogleQuery: function(url) {
    var quPattern = new RegExp(/http.*\?.*&qu=(.+?)(&.*|#.*|$)/);
    var qPattern = new RegExp(/http.*\?.*&q=(.+?)(&.*|#.*|$)/);

    // アドレスバーではなくGoogle検索窓で複数ワード検索した時に区切り文字が+になる。
    // 検索ワード自体に含まれる+文字はURLエンコードされる（%2B）
    url = url.replace(/\+/g, " ");
    
    url = decodeURIComponent(url);
    if(url.match(quPattern) || url.match(qPattern)) {
      return RegExp.$1;
    } else {
      return "";
    }
  },
  getParam: function(url, name) {
    var pattern = new RegExp("http.*\?(.*&)?" + name + "=(.+?)(&.*|#.*|$)");

    url = decodeURIComponent(url);
    if(url.match(pattern)) {
      return RegExp.$2;
    } else {
      return "";
    }
  }
});