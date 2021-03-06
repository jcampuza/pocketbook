export const themes = {
  light: {
    primaryColor: '#ffffff',
    navColor: 'rgb(232,232,232)',
    sidebarColor: 'rgb(245,245,245)',
    textColor: '#222222',
    secondaryTextColor: '#000000',
    listItemOddColor: '#dedede',
    listItemActiveColor: '#ffffff',
    iconColor: 'rgb(35, 35, 35)',
    borderColor: '#CCC',
  },
  dark: {
    primaryColor: 'rgb(18, 18, 18)',
    navColor: 'rgb(35, 35, 35)',
    sidebarColor: 'rgb(35,35,35)',
    textColor: '#FAFAFA',
    secondaryTextColor: '#DEDEDE',
    listItemOddColor: 'rgb(18, 18, 18)',
    listItemActiveColor: 'rgb(71, 71, 71)',
    iconColor: '#DEDEDE',
    borderColor: '#666',
  },
};

export type AppTheme = typeof themes['light'];

export const extensionThemes = ['dark', 'light'] as const;

export const editorThemes = [
  'ambiance',
  'chaos',
  'chrome',
  'clouds',
  'clouds_midnight',
  'cobalt',
  'crimson_editor',
  'dawn',
  'dracula',
  'dreamweaver',
  'eclipse',
  'github',
  'gob',
  'gruvbox',
  'idle_fingers',
  'iplastic',
  'katzenmilch',
  'kr_theme',
  'kuroir',
  'merbivore',
  'merbivore_soft',
  'mono_industrial',
  'monokai',
  'pastel_on_dark',
  'solarized_dark',
  'solarized_light',
  'sqlserver',
  'terminal',
  'textmate',
  'tomorrow',
  'tomorrow_night',
  'tomorrow_night_blue',
  'tomorrow_night_bright',
  'tomorrow_night_eighties',
  'twilight',
  'vibrant_ink',
  'xcode',
];
