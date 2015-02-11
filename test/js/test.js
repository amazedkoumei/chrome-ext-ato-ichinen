const GOOGLE_URL_CASE = [
  // TODO: path なしのケースは NOT_GOOGLE_URL_CASE であるべき
  "http://www.google.co.jp",
  "http://www.google.com",
  "https://www.google.co.jp/search?ix=seb&sourceid=chrome&ie=UTF-8&q=hoge",
  "https://www.google.com/#hl=en&output=search&sclient=psy-ab&q=hoge&oq=hoge&aq=f&aqi=p-p1g3&aql=&gs_l=hp.3..35i39j0l3.1910.2169.0.2447.4.4.0.0.0.0.141.483.1j3.4.0...0.0.4WyO-fgOyfc&pbx=1&qscrl=1&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp=741b4b372c983251&biw=1422&bih=783",
  "https://www.google.co.jp/webhp?sourceid=chrome-instant&ie=UTF-8#hl=ja&safe=off&output=search&sclient=psy-ab&q=%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF&qscrl=1&oq=&gs_l=&pbx=1&fp=47ee0b0c44807526&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&biw=1417&bih=758"
]
const NOT_GOOGLE_URL_CASE = [
  "https://www.google.com/analytics/web/#home/a2427596w16501515p17503788/",
  "https://amazedkoumei.com"
]
const TBS_PARAM_CASE = [
  "https://www.google.co.jp/search?tbs=qdr:y&aq=f&sourceid=chrome&ie=UTF-8&q=hoge",
  "https://www.google.co.jp/search?aq=f&sourceid=chrome&q=hoge&tbs=qdr:y&ie=UTF-8",
  "https://www.google.co.jp/search?aq=f&sourceid=chrome&ie=UTF-8&q=hoge&tbs=qdr:y"
]

module("statusManager.js", {
  setup: function() {
    if(statusManager.getStatus() === true) {
      statusManager.changeStatus()
    }    
  }
});
test("", function() {
  equal(statusManager.getStatus(), false, "初期値");
  statusManager.changeStatus();
  equal(statusManager.getStatus(), true, "changeStatus実行後");
  statusManager.changeStatus();
  equal(statusManager.getStatus(), false, "changeStatus再実行後");
});

module("urlManager.js");
test("isGoogle function", function() {
  for(var i = 0; i < GOOGLE_URL_CASE.length ; i++) {
    var url = GOOGLE_URL_CASE[i]
    equal(urlManager.isGoogle(url), true, url);
  }
  for(var i = 0; i < NOT_GOOGLE_URL_CASE.length ; i++) {
    var url = NOT_GOOGLE_URL_CASE[i]
    equal(urlManager.isGoogle(url), false, url);
  }
});
test("getAsQdrParam", function() {
  var url;

  url = "https://www.google.co.jp/search?as_qdr=y1&aq=f&sourceid=chrome&ie=UTF-8&q=hoge";
  equal(urlManager.getParam(url, "as_qdr"), "y1", "最初のGETパラメータ");
  url = "https://www.google.co.jp/search?aq=f&sourceid=chrome&q=hoge&as_qdr=y1&ie=UTF-8";
  equal(urlManager.getParam(url, "as_qdr"), "y1", "中ほどのGETパラメータ");
  url = "https://www.google.co.jp/search?aq=f&sourceid=chrome&ie=UTF-8&q=hoge&as_qdr=y1";
  equal(urlManager.getParam(url, "as_qdr"), "y1", "最後のGETパラメータ");
});
test("getTbsParam", function() {
  var url;

  url = TBS_PARAM_CASE[0];
  equal(urlManager.getParam(url, "tbs"), "qdr:y", "最初のGETパラメータ");
  url = TBS_PARAM_CASE[1];
  equal(urlManager.getParam(url, "tbs"), "qdr:y", "中ほどのGETパラメータ");
  url = TBS_PARAM_CASE[2];
  equal(urlManager.getParam(url, "tbs"), "qdr:y", "最後のGETパラメータ");
});


// 以降結合試験

module("chrome.browserAction.onClicked, status is TRUE to FALSE", {
  setup: function() {
    if(statusManager.getStatus() === false) {
      statusManager.changeStatus()
    }
  },
  run: function(url) {
    var tabId = url

    listener = chrome.browserAction.listener.onClicked
    listener({id:tabId, url:url})

    return tabId;
  }
})
test("isGoogle", function() {
  for(var i = 0; i < GOOGLE_URL_CASE.length ; i++) {
    this.setup()
    var url = GOOGLE_URL_CASE[i]
    var tabId = this.run(url)
    equal(chrome.tabs.status[tabId]["url"], url, url);
    equal(chrome.browserAction.icon.path, "../icon/icon-19-off.png", url);
  }
});
test("isNotGoogle", function() {
  for(var i = 0; i < NOT_GOOGLE_URL_CASE.length ; i++) {
    this.setup()
    var url = NOT_GOOGLE_URL_CASE[i]
    var tabId = this.run(url)
    equal(chrome.tabs.status[tabId], null, url);
    equal(chrome.browserAction.icon.path, "../icon/icon-19-off.png", url);
  }
});

module("chrome.browserAction.onClicked, status is FALSE to TRUE", {
  setup: function() {
    if(statusManager.getStatus() === true) {
      statusManager.changeStatus()
    }
  },
  run: function(url) {
    var tabId = url

    listener = chrome.browserAction.listener.onClicked
    listener({id:tabId, url:url})

    return tabId;
  }
})
test("isGoogle", function() {
  for(var i = 0; i < GOOGLE_URL_CASE.length ; i++) {
    this.setup()
    var url = GOOGLE_URL_CASE[i]
    var tabId = this.run(url)
    equal(chrome.tabs.status[tabId]["url"], url + "&tbs=qdr:y", url);
    equal(chrome.browserAction.icon.path, "../icon/icon-19-on.png", url);
  }
});
test("isNotGoogle", function() {
  for(var i = 0; i < NOT_GOOGLE_URL_CASE.length ; i++) {
    this.setup()
    var url = NOT_GOOGLE_URL_CASE[i]
    var tabId = this.run(url)
    equal(chrome.tabs.status[tabId], null, url);
    equal(chrome.browserAction.icon.path, "../icon/icon-19-on.png", url);
  }
});

module("chrome.tabs.onUpdated status is TRUE", {
  setup: function() {
    if(statusManager.getStatus() === false) {
      statusManager.changeStatus()
    }
    chrome.tabs.status = {}
  },
  run: function(url) {
    var tabId = url

    listener = chrome.tabs.listener.onUpdated
    listener(tabId, {}, {id:tabId, url:url})

    return tabId;
  }
})
test("isGoogle", function() {
  for(var i = 0; i < GOOGLE_URL_CASE.length ; i++) {
    this.setup()
    var url = GOOGLE_URL_CASE[i]
    var tabId = this.run(url)
    equal(chrome.tabs.status[tabId]["url"], url + "&tbs=qdr:y", url);
  }
});
test("with TBS param", function() {
  for(var i = 0; i < TBS_PARAM_CASE.length ; i++) {
    this.setup()
    var url = TBS_PARAM_CASE[i]
    var tabId = this.run(url)
    equal(chrome.tabs.status[tabId], null, url);
  }
});
test("isNotGoogle", function() {
  for(var i = 0; i < NOT_GOOGLE_URL_CASE.length ; i++) {
    this.setup()
    var url = NOT_GOOGLE_URL_CASE[i]
    var tabId = this.run(url)
    equal(chrome.tabs.status[tabId], null, url);
  }
});

module("chrome.tabs.onUpdated status is FALSE", {
  setup: function() {
    if(statusManager.getStatus() === true) {
      statusManager.changeStatus()
    }
    chrome.tabs.status = {}
  },
  run: function(url) {
    var tabId = url

    listener = chrome.tabs.listener.onUpdated
    listener(tabId, {}, {id:tabId, url:url})

    return tabId;
  }
})
test("isGoogle", function() {
  for(var i = 0; i < GOOGLE_URL_CASE.length ; i++) {
    this.setup()
    var url = GOOGLE_URL_CASE[i]
    var tabId = this.run(url)
    equal(chrome.tabs.status[tabId], null, url);
  }
});
test("isNotGoogle", function() {
  for(var i = 0; i < NOT_GOOGLE_URL_CASE.length ; i++) {
    this.setup()
    var url = NOT_GOOGLE_URL_CASE[i]
    var tabId = this.run(url)
    equal(chrome.tabs.status[tabId], null, url);
  }
});
