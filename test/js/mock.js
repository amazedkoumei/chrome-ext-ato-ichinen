var chrome = {
  browserAction: {
    // for testing
    listener: {},
    // for testing
    icon: {},
    // for mocking
    onClicked: {
      addListener: function(func){
        chrome.browserAction.listener.onClicked = func;
      }
    },
    // for mocking
    setIcon: function(obj){
      chrome.browserAction.icon = obj
    }
  },
  tabs: {
    // for testing
    listener: {},
    // for testing
    status: {},
    // for mocking
    onUpdated: {
      addListener: function(func){
        chrome.tabs.listener.onUpdated = func;        
      }
    },
    // for mocking
    update: function(tabId, arr){
      chrome.tabs.status[tabId] = arr
    }
  }
};
