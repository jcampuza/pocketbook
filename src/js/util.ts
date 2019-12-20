export interface Script {
  id: string;
  title: string;
  description: string;
  body: string;
}

export function guid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16),
  );
}

export function createDefaultScript(): Script {
  return {
    id: guid(),
    title: 'Hello World',
    description: 'Default Generated Hello World Script',
    body: '(function() { console.log("hello world")})()',
  };
}

export function getLastSelectedScriptFromStorage(scripts: Script[]) {
  if (scripts.length && scripts.length === 1) {
    return scripts[0];
  }

  const lastSelectedId = localStorage.getItem('last-selected');

  return scripts.find(script => script.id === lastSelectedId);
}

export function findById<T extends { id: string }>(list: T[], id: string) {
  return list.find(listItem => listItem.id === id);
}

export function debugLog(msg: string, level: keyof Console = 'log') {
  if (process.env.NODE_ENV === 'development') {
    /* eslint-disable-next-line no-console */
    console[level](msg);
  }
}
