chrome.browserAction.onClicked.addListener(function() {
  if(statusManager.getStatus()) {
    chrome.browserAction.setIcon({path:"../icon/icon-19-off.png"});
  } else {
    chrome.browserAction.setIcon({path:"../icon/icon-19-on.png"});
  }
  statusManager.changeStatus();
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(statusManager.getStatus()) {
    if(urlManager.isGoogle(tab.url) && !urlManager.getParam(tab.url, "as_qdr") && !urlManager.getParam(tab.url, "url")) {
      chrome.tabs.update(tabId, {url:tab.url + "&as_qdr=y1"});
    }
  }
});

