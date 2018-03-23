import React, { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import { inject, observer } from 'mobx-react';
import { editorThemes } from '../util/constants';

// Available Themes
import 'brace/mode/javascript';
import 'brace/theme/ambiance';
import 'brace/theme/chaos';
import 'brace/theme/chrome';
import 'brace/theme/clouds';
import 'brace/theme/clouds_midnight';
import 'brace/theme/cobalt';
import 'brace/theme/crimson_editor';
import 'brace/theme/dawn';
import 'brace/theme/dreamweaver';
import 'brace/theme/eclipse';
import 'brace/theme/github';
import 'brace/theme/idle_fingers';
import 'brace/theme/iplastic';
import 'brace/theme/katzenmilch';
import 'brace/theme/kr_theme';
import 'brace/theme/kuroir';
import 'brace/theme/merbivore';
import 'brace/theme/merbivore_soft';
import 'brace/theme/mono_industrial';
import 'brace/theme/monokai';
import 'brace/theme/pastel_on_dark';
import 'brace/theme/solarized_dark';
import 'brace/theme/solarized_light';
import 'brace/theme/sqlserver';
import 'brace/theme/terminal';
import 'brace/theme/textmate';
import 'brace/theme/tomorrow';
import 'brace/theme/tomorrow_night';
import 'brace/theme/tomorrow_night_blue';
import 'brace/theme/tomorrow_night_bright';
import 'brace/theme/tomorrow_night_eighties';
import 'brace/theme/twilight';
import 'brace/theme/vibrant_ink';
import 'brace/theme/xcode';

export const CodeEditor = inject(stores => ({
  editorTheme: stores.settingsStore.editorTheme,
}))(
  observer(({ onChange, value, readOnly = false, editorTheme }) => (
    <AceEditor
      style={{ margin: '1rem 0' }}
      theme={editorTheme}
      mode="javascript"
      name="editor"
      onChange={onChange}
      value={value}
      tabSize={2}
      fontSize={14}
      width="100%"
      height="600px"
      readOnly={readOnly}
    />
  )),
);
