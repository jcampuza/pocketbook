export function injectScript(scriptBody) {
  // Wrap script in a quick IIFE before sending to main chrome tab
  scriptBody = `(() => {${scriptBody}})()`;
  chrome.runtime.sendMessage({ message: scriptBody });
}
