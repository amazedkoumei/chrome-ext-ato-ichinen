module("statusManager.js");
test("", function() {
  equal(statusManager.getStatus(), false, "初期値");
  statusManager.changeStatus();
  equal(statusManager.getStatus(), true, "changeStatus実行後");
  statusManager.changeStatus();
  equal(statusManager.getStatus(), false, "changeStatus再実行後");
});
module("urlManager.js");
test("isGoogle", function() {
  var url;

  url = "http://www.google.co.jp";
  equal(urlManager.isGoogle(url), true, url);
  url = "https://www.google.co.jp";
  equal(urlManager.isGoogle(url), true, url);
  url = "http://www.google.com";
  equal(urlManager.isGoogle(url), true, url);
  url = "https://www.google.co.jp/search?ix=seb&sourceid=chrome&ie=UTF-8&q=hoge";

  equal(urlManager.isGoogle(url), true, url);
  url = "https://amazedkoumei.com";
  equal(urlManager.isGoogle(url), false, url);
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
