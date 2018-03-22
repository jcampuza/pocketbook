import { observable, autorun, computed, action } from 'mobx';
import { themes } from '../lib/themes';

export class ThemeStore {
  @observable currentTheme;

  constructor(storage) {
    this._storage = storage;
    this.currentTheme = this._storage.getItem('theme') || 'light';

    autorun(() => {
      this._storage.setItem('theme', this.currentTheme);
    });
  }

  @action.bound
  setTheme(theme) {
    this.currentTheme = theme;
  }

  @computed
  get theme() {
    console.log('getting theme');
    return themes[this.currentTheme];
  }
}
