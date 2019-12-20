import React from 'react';
import AceEditor from 'react-ace';
import { observer } from 'mobx-react-lite';
import { editorThemes } from '../util/themes';

import 'brace/mode/javascript';
import { useStore, RootStore } from '../stores/useStore';

for (const theme of editorThemes) {
  require(`brace/theme/${theme}`);
}

interface CodeEditorProps {
  onChange?: (value: string) => void;
  value: string;
  readOnly?: boolean;
  editorTheme?: string;
}

export const CodeEditorBase = observer(
  ({ onChange, value, readOnly = false, editorTheme }: CodeEditorProps) => (
    <AceEditor
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
  ),
);

const selector = (stores: RootStore) => ({
  editorTheme: stores.settingsStore.editorTheme,
});

export const CodeEditor = (props: CodeEditorProps) => {
  const injected = selector(useStore());

  return <CodeEditorBase {...injected} {...props} />;
};
