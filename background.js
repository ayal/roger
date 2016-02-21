chrome.browserAction.onClicked.addListener(function(activeTab) {
    var newURL = "http://www.frameroger.com";
    chrome.tabs.create({ url: newURL });
});
