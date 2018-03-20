export function injectScript (scriptBody) {
    chrome.runtime.sendMessage({ message: scriptBody });
}