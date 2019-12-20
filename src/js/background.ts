import '../img/icon-128.png';
import '../img/icon-34-test.png';

const executeOnMainPage = (message: string) => {
  chrome.tabs.getSelected(tab => {
    if (tab && tab.id) {
      chrome.tabs.executeScript(tab.id, {
        code: message,
      });
    }
  });
};

const formatCode = (code: string) => {
  return code;
};

chrome.runtime.onMessage.addListener(request => {
  executeOnMainPage(formatCode(request.message));
});
