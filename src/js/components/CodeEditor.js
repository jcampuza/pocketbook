import React, { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

export const CodeEditor = ({ onChange, value, readOnly = false }) => (
  <AceEditor
    theme="monokai"
    mode="javascript"
    name="editor"
    onChange={onChange}
    value={value}
    tabSize={2}
    fontSize={14}
    width="100%"
    readOnly={readOnly}
  />
);