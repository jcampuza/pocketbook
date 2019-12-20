export interface Script {
  id: string;
  title: string;
  description: string;
  body: string;
}

export const guid = (): string => {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16),
  );
};

export const createDefaultScript = (): Script => {
  return {
    id: guid(),
    title: 'Hello World',
    description: 'Hello World Script',
    body: '(function() { console.log("hello world")})()',
  };
};

export const getLastSelectedScriptFromStorage = (scripts: Script[]) => {
  const lastSelectedId = localStorage.getItem('last-selected');
  const script = scripts.find(script => script.id === lastSelectedId);

  if (script) {
    return script;
  }

  if (scripts.length) {
    return scripts[0];
  }

  return null;
};

export const findById = <T extends { id: string }>(list: T[], id: string) => {
  return list.find(listItem => listItem.id === id);
};

export const debugLog = (msg: string, level: keyof Console = 'log') => {
  if (process.env.NODE_ENV === 'development') {
    /* eslint-disable-next-line no-console */
    console[level](msg);
  }
};
