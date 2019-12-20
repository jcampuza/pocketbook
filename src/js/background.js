import '../img/icon-128.png';
import '../img/icon-34-test.png';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  executeOnMainPage(formatCode(request.message));
});

function formatCode(code) {
  return code;
}

function executeOnMainPage(message) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.executeScript(tab.id, {
      code: message,
    });
  });
}
