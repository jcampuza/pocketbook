import { observable, action, autorun } from 'mobx';
import { extensionThemes, editorThemes } from '../lib/themes';
import { AppStorage } from '../lib/storage';

const THEME_KEY = 'settings:theme';
const EDITOR_KEY = 'settings:editor';
const COMPACT_MODE_KEY = 'settings:compact';

export class SettingsStore {
  @observable editorTheme: string;
  @observable theme: string;
  @observable isCompactMode: boolean;
  @observable isCompactModeEnabled: boolean;

  _storage: AppStorage;

  constructor(storage: AppStorage) {
    this._storage = storage;

    const userPrefs = this._storage.getItems(
      THEME_KEY,
      EDITOR_KEY,
      COMPACT_MODE_KEY,
    );

    this.theme = userPrefs[THEME_KEY] || extensionThemes[0];
    this.editorTheme = userPrefs[EDITOR_KEY] || editorThemes[0];
    this.isCompactModeEnabled = userPrefs[COMPACT_MODE_KEY] === 'true' || false;
    this.isCompactMode = userPrefs[COMPACT_MODE_KEY] === 'true' || false;

    // Whenever theme/editor are updated, set their values in storage
    autorun(() => {
      this._storage.setItems({
        [THEME_KEY]: this.theme,
        [EDITOR_KEY]: this.editorTheme,
        [COMPACT_MODE_KEY]: this.isCompactModeEnabled,
      });
    });
  }

  @action.bound
  setEditorTheme(value: string) {
    this.editorTheme = value;
  }

  @action.bound
  setTheme(value: string) {
    this.theme = value;
  }

  @action.bound
  setCompactMode(value: boolean) {
    this.isCompactModeEnabled = value;
  }

  @action.bound
  setIsCompactMode(value: boolean) {
    this.isCompactMode = value;
  }
}
