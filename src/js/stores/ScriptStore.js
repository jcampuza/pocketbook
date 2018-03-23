import { observable, action, autorun } from 'mobx';
import { mockScripts } from '../mocks';
import { guid } from '../util';

export class ScriptStore {
  @observable scripts = [];
  @observable
  filtered = {
    query: '',
    result: [],
  };

  constructor(storage) {
    this._storage = storage;
    this.scripts = JSON.parse(this._storage.getItem('scripts')) || mockScripts;

    autorun(() => {
      const scripts = this.scripts.slice();
      this._storage.setItem('scripts', JSON.stringify(scripts));
    });
  }

  @action.bound
  addScript(script) {
    this.scripts.push(script);
  }

  @action.bound
  removeScript(id) {
    const scriptToRemove = this.scripts.find(script => script.id === id);

    if (scriptToRemove) {
      this.scripts.remove(scriptToRemove);
    }
  }

  @action.bound
  editScript(script) {
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
  bulkImport(jsonText) {
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
