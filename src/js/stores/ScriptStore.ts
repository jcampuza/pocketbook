import { observable, action, autorun } from 'mobx';
import { mockScripts } from '../mocks';
import { guid, Script } from '../util';
import { AppStorage } from '../util/storage';

export class ScriptStore {
  @observable scripts: Script[] = [];
  @observable
  filtered: { query: string; result: Script[] } = {
    query: '',
    result: [],
  };

  _storage: AppStorage;

  constructor(storage: AppStorage) {
    this._storage = storage;
    const scriptsFromStorage = this._storage.getItem('scripts');

    this.scripts = scriptsFromStorage
      ? JSON.parse(scriptsFromStorage)
      : mockScripts;

    autorun(() => {
      const scripts = this.scripts.slice();
      this._storage.setItem('scripts', JSON.stringify(scripts));
    });
  }

  @action.bound
  addScript(script: Script) {
    console.log(script);
    this.scripts.push(script);
  }

  @action.bound
  removeScript(id: string) {
    const scriptToRemove = this.scripts.find(script => script.id === id);

    if (scriptToRemove) {
      this.scripts = this.scripts.filter(s => s !== scriptToRemove);
    }
  }

  @action.bound
  editScript(script: Script) {
    const idx = this.scripts.findIndex(s => script.id === s.id);

    if (idx) {
      this.scripts.splice(idx, 1, script);
    }
  }

  @action.bound
  filter(query = '') {
    query = query.toLowerCase();
    const result = this.scripts.filter(script => {
      return (
        script.title.toLowerCase().includes(query) ||
        script.body.toLowerCase().includes(query)
      );
    });

    this.filtered = {
      query,
      result,
    };
  }

  @action.bound
  bulkImport(jsonText: string) {
    try {
      const parsedJson = JSON.parse(jsonText);

      if (!Array.isArray(parsedJson)) {
        throw new Error('Imported scripts are not structured correctly');
      }

      // Reassign the IDs to avoid potential conflicts
      // Eventually add more validation
      for (const potentialScript of parsedJson) {
        potentialScript.id = guid();
      }

      this.scripts = this.scripts.concat(parsedJson);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
