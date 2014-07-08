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
  url = "https://www.google.com/#hl=en&output=search&sclient=psy-ab&q=hoge&oq=hoge&aq=f&aqi=p-p1g3&aql=&gs_l=hp.3..35i39j0l3.1910.2169.0.2447.4.4.0.0.0.0.141.483.1j3.4.0...0.0.4WyO-fgOyfc&pbx=1&qscrl=1&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp=741b4b372c983251&biw=1422&bih=783";
  equal(urlManager.isGoogle(url), true, url);
  url = "https://www.google.co.jp/webhp?sourceid=chrome-instant&ie=UTF-8#hl=ja&safe=off&output=search&sclient=psy-ab&q=%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF&qscrl=1&oq=&gs_l=&pbx=1&fp=47ee0b0c44807526&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&biw=1417&bih=758"
  equal(urlManager.isGoogle(url), true, url);

  url = "https://www.google.com/analytics/web/#home/a2427596w16501515p17503788/";
  equal(urlManager.isGoogle(url), false, url);
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
test("getTbsParam", function() {
  var url;

  url = "https://www.google.co.jp/search?tbs=qdr:y&aq=f&sourceid=chrome&ie=UTF-8&q=hoge";
  equal(urlManager.getParam(url, "tbs"), "qdr:y", "最初のGETパラメータ");
  url = "https://www.google.co.jp/search?aq=f&sourceid=chrome&q=hoge&tbs=qdr:y&ie=UTF-8";
  equal(urlManager.getParam(url, "tbs"), "qdr:y", "中ほどのGETパラメータ");
  url = "https://www.google.co.jp/search?aq=f&sourceid=chrome&ie=UTF-8&q=hoge&tbs=qdr:y";
  equal(urlManager.getParam(url, "tbs"), "qdr:y", "最後のGETパラメータ");
});
