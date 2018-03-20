export function createDefaultScript() {
  return {
    id: guid(),
    title: 'New Script',
    description: 'A newly generate script',
    body: 'function () {}'
  }
}

export function guid() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

export function getLastSelectedScriptFromStorage(scripts) {
  const lastSelectedId = localStorage.getItem('last-selected');

  return scripts.find(script => script.id === lastSelectedId);
}