import React from 'react';
import AceEditor from 'react-ace';
import { observer } from 'mobx-react-lite';
import { editorThemes } from '../lib/themes';

import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-noconflict/snippets/javascript';
import { useStore } from '../stores/useStore';

for (const theme of editorThemes) {
  require(`ace-builds/src-noconflict/theme-${theme}`);
}

interface CodeEditorProps {
  onChange?: (value: string) => void;
  value: string;
  readOnly?: boolean;
  editorTheme?: string;
}

export const CodeEditor = observer(
  ({ onChange, value, readOnly = false }: CodeEditorProps) => {
    const { settingsStore } = useStore();

    return (
      <AceEditor
        style={{ margin: '1rem 0' }}
        theme={settingsStore.editorTheme}
        mode="javascript"
        name="ace-editor"
        onChange={onChange}
        value={value}
        tabSize={2}
        enableBasicAutocompletion
        enableLiveAutocompletion
        fontSize={14}
        width="100%"
        height="600px"
        readOnly={readOnly}
      />
    );
  },
);
