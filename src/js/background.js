import '../img/icon-128.png';
import '../img/icon-34-test.png';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  executeOnMainPage(formatCode(request.message));
});

chrome.runtime.sendMessage({ type: 'HELLO' });

chrome.runtime.onInstalled.addListener(function(request, sender, sendResponse) {
  if (details.reason === 'install') {
    chrome.runtime.sendMessage({ type: 'APP_INSTALLED' });
  } else if (details.reason === 'update') {
    chrome.runtime.sendMessage({ type: 'APP_UPDATE' });
  }
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
