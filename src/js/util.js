export function createDefaultScript() {
  return {
    id: guid(),
    title: 'Hello World',
    description: 'Default Generated Hello World Script',
    body: '(function() { console.log("hello world")})()',
  };
}

export function guid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16),
  );
}

export function getLastSelectedScriptFromStorage(scripts) {
  const lastSelectedId = localStorage.getItem('last-selected');

  return scripts.find(script => script.id === lastSelectedId);
}

export function findById(list, id) {
  return list.find(listItem => listItem.id === id);
}

export function debugLog(msg, level = 'log') {
  if (process.env.NODE_ENV === 'development') {
    console[level](msg);
  }
}

export function blacklist(src, ...args) {
  const copy = {};

  for (const key in src) {
    if (args.indexOf(key) === -1) {
      copy[key] = src[key];
    }
  }

  return copy;
}

export function pick(src, ...args) {
  const copy = {};

  for (const key in src) {
    if (args.indexOf(key) >= 0) {
      copy[key] = src[key];
    }
  }

  return copy;
}
