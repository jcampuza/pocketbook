import { observable, autorun, computed, action } from 'mobx';
import { themes } from '../lib/themes';
import { AppStorage } from '../lib/storage';

type Theme = keyof typeof themes;

export class ThemeStore {
  @observable currentTheme: Theme;

  _storage: AppStorage;

  constructor(storage: AppStorage) {
    this._storage = storage;
    this.currentTheme = (this._storage.getItem('theme') as Theme) || 'light';

    autorun(() => {
      this._storage.setItem('theme', this.currentTheme);
    });
  }

  @action.bound
  setTheme(theme: Theme) {
    this.currentTheme = theme;
  }

  @computed
  get theme() {
    return themes[this.currentTheme];
  }
}
