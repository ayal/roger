chrome.browserAction.onClicked.addListener(function(activeTab) {
    var newURL = "http://ayal.github.io/roger/";
    chrome.tabs.create({ url: newURL });
});
