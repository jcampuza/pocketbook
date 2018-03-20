import React from 'react';
import styled from 'styled-components';

export class EditScript extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dirty: {
        ...props.script 
      }
    };
  }

  updateField = (e) => {
    const { name, value } = e.target;
    
    const dirty = {
      ...this.state.dirty,
      [name]: value,
    };
    
    this.setState({ dirty })
  }

  onEditorChange = (value) => {
    const name = 'body';
    
    const dirty = {
      ...this.state.dirty,
      [name]: value,
    };

    this.setState({ dirty });
  }

  render() {
    const {
      title,
      description,
      body
    } = this.state.dirty;

    const {
      onCancel,
      onSubmit
    } = this.props;

    return (
      <ScriptContainer>
        <ScriptTitle>Editing: {title}</ScriptTitle>

        <input name="title" placeholder="title" value={title} onChange={this.updateField} />
        <textarea name="description" placeholder="description" value={description} onChange={this.updateField} />

        <CodeEditor 
          onChange={this.onEditorChange} 
          value={body}
        />
        <ScriptActions>
          <Button onClick={() => onSubmit(this.state.dirty)}>Save</Button>
          <Button onClick={() => onCancel()}>Cancel</Button>
        </ScriptActions>
      </ScriptContainer>
    )
  }
}