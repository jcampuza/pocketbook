import React, { useState } from 'react';
import { CodeEditor } from '../components/CodeEditor';
import { Button } from './Button';
import { TextArea } from './TextArea';
import { TextInput } from './TextInput';
import styled from '../styled-components';
import { Script } from '../lib/util';

const ScriptContainer = styled.section`
  padding: 0.5rem 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 1rem;
  }
`;

const ScriptTitle = styled.h3`
  margin: 0 0 1rem;
  font-size: 1.25rem;
  color: ${props => props.theme.textColor};
`;

const ScriptActions = styled.div`
  margin-top: auto;

  > * + * {
    margin-left: 0.5rem;
  }
`;

interface EditScriptProps {
  script: Script;
  onCancel: () => void;
  onSubmit: (script: Script) => void;
}

export const EditScript = (props: EditScriptProps) => {
  const [dirty, setDirty] = useState(props.script);

  const updateField = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.currentTarget;

    setDirty(curr => ({
      ...curr,
      [name]: value,
    }));
  };

  const onEditorChange = (value: string) => {
    const name = 'body';

    setDirty(curr => ({
      ...curr,
      [name]: value,
    }));
  };

  const { title, description, body } = dirty;
  const { onCancel, onSubmit } = props;

  return (
    <ScriptContainer>
      <TextInput
        type="text"
        name="title"
        placeholder="title"
        value={title}
        onChange={updateField}
      />
      <TextArea
        name="description"
        placeholder="description"
        value={description}
        onChange={updateField}
      />

      <CodeEditor onChange={onEditorChange} value={body} />
      <ScriptActions>
        <Button onClick={() => onSubmit(dirty)}>Save</Button>
        <Button onClick={() => onCancel()}>Cancel</Button>
      </ScriptActions>
    </ScriptContainer>
  );
};
