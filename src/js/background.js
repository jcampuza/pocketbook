import '../img/icon-128.png'
import '../img/icon-34.png'

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        executeOnMainPage(formatCode(request.message));
    }
)

function formatCode(code) {
    console.log(code);
    return code;
}

function executeOnMainPage(message) {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.executeScript(tab.id, {
            'code': message
        });
    });
}