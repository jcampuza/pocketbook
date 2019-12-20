import React, { useState } from 'react';
import { CodeEditor } from '../components/CodeEditor';
import { Button } from '../ui/Button';
import { TextArea } from '../ui/Textarea';
import { TextInput } from '../ui/TextInput';
import styled from 'styled-components';

const ScriptContainer = styled.section`
  padding: 0.5rem 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 1rem;
  }
`;

export const EditScript = props => {
  const [dirty, setDirty] = useState(props.script);

  const updateField = e => {
    const { name, value } = e.target;

    setDirty(curr => ({
      ...curr,
      [name]: value,
    }));
  };

  const onEditorChange = value => {
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
      <ScriptTitle>Editing: {title}</ScriptTitle>

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
