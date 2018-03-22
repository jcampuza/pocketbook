import { observable, action } from "mobx";

export const themes = {
  primary: {},
  dark: {}
}

export const extensionThemes = [
  'dark',
  'light'
];

export const editorThemes = [
"ambiance",
"chaos",
"chrome",
"clouds",
"clouds_midnight",
"cobalt",
"crimson_editor",
"dawn",
"dreamweaver",
"eclipse",
"github",
"idle_fingers",
"iplastic",
"katzenmilch",
"kr_theme",
"kuroir",
"merbivore",
"merbivore_soft",
"mono_industrial",
"monokai",
"pastel_on_dark",
"solarized_dark",
"solarized_light",
"sqlserver",
"terminal",
"textmate",
"tomorrow",
"tomorrow_night",
"tomorrow_night_blue",
"tomorrow_night_bright",
"tomorrow_night_eighties",
"twilight",
"vibrant_ink",
"xcods"
];

export class SettingsStore {
  @observable editorTheme;
  @observable theme;

  constructor() {
    const settings = JSON.parse(localStorage.getItem('settings'));

    if (!settings) {
      this.editorTheme = editorThemes[0];
      this.theme = extensionThemes[0];
    } else {
      this.editorTheme = settings.editorTheme;
      this.theme = settings.theme;
    }
  }

  @action
  setEditorTheme = (value) => {
    this.editorTheme = value;
  };

  @action
  setTheme = (value) => {
    this.theme = value;
  }
}