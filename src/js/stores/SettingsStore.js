import { observable, action, autorun } from 'mobx';
import { themes, extensionThemes, editorThemes } from '../lib/constants';

const THEME_KEY = 'settings:theme';
const EDITOR_KEY = 'settings:editor';

export class SettingsStore {
  @observable editorTheme;
  @observable theme;

  constructor(storage) {
    this._storage = storage;

    const userPrefs = this._storage.getItems(THEME_KEY, EDITOR_KEY);

    this.theme = userPrefs[THEME_KEY] || extensionThemes[0];
    this.editorTheme = userPrefs[EDITOR_KEY] || editorThemes[0];

    // Whenever theme/editor are updated, set their values in storage
    autorun(() => {
      this._storage.setItems({
        [THEME_KEY]: this.theme,
        [EDITOR_KEY]: this.editorTheme,
      });
    });
  }

  @action
  setEditorTheme = value => {
    this.editorTheme = value;
  };

  @action
  setTheme = value => {
    this.theme = value;
  };
}
