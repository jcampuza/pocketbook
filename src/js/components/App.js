import React, { Component } from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Script } from "../models/script";
import { injectScript } from "../lib/injectScript";
import { CodeEditor } from "./CodeEditor";
import { mockScripts } from "../mocks";
import { AppSidebar } from "./AppSidebar";
import { Button } from "./Button";
import { createDefaultScript, guid, getLastSelectedScriptFromStorage, findById } from "../util";

const scripts = JSON.parse(localStorage.getItem('scripts')) || mockScripts;
const AppMainContainer = styled.main`
  flex: 1 0 66%;
  height: 100vh;
  overflow-y: auto;
  transition: flex-basis 200ms ease-out;

  flex-basis: ${props => props.fullWidth
    ? '92%'
    : '66%'
  };
`;

const NoneSelectedView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const ScriptContainer = styled.section`
  padding: .5rem 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 1rem;
  }
`

const ScriptTitle = styled.h3`
  margin: 0 0 1rem;
  font-size: 1.25rem;
  color: rgba(0, 0, 0, 0.69);
`

const ScriptDescription = styled.p`
  margin: 0 0 1rem;
  font-size: 1rem;
  color: #222222;
`

const CodePre = styled.pre`
  display: block;
  overflow-x: auto;
  border-radius: 2px;
  width: 100%;
  background-color: #222222;
  color: #f1f1f1;
  padding: .5rem;
`;

const CodeCode = styled.code`
  font-family: monospace;
`;

const CodeDisplay = ({ children }) => (
  <CodePre>
    <CodeCode>{children}</CodeCode>
  </CodePre>
);

const ScriptActions = styled.div`
  margin-top: auto;

  > * + * {
    margin-left: .5rem;
  }
`;

const TextInput = styled.input.attrs({
  type: 'text',
})`
  font-family: 'Roboto';
  font-size: 14px;
  padding: .5rem;
  width: 50%;
`;

const TextArea = styled.textarea`
  font-family: 'Roboto';
  font-size: 14px;
  padding: .5rem;
  width: 50%;
  min-width: 50%;
  max-width: 50%;
`;

class EditScript extends Component {
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

        <TextInput type="text" name="title" placeholder="title" value={title} onChange={this.updateField} />
        <TextArea name="description" placeholder="description" value={description} onChange={this.updateField} />

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

const ScriptContent = ({ script, onRun, onEdit, onDelete }) => (
  <React.Fragment>
    <ScriptContainer>
      <ScriptTitle>{script.title}</ScriptTitle>
      <ScriptDescription>{script.description}</ScriptDescription>
      <CodeEditor value={script.body} readOnly={true} />

      <ScriptActions>
        <Button onClick={() => onRun(script.id)}>Run</Button>
        <Button onClick={() => onEdit(script.id)}>Edit</Button>
        <Button onClick={() => onDelete(script.id)}>Delete</Button>
      </ScriptActions>
    </ScriptContainer>
  </React.Fragment>
);

export default class extends Component {
  state = {
    isCreating: false,
    isEditing: false,
    mainViewExpanded: false,
    scripts,
    selectedScript: getLastSelectedScriptFromStorage(scripts)
  }

  componentDidMount() {
    this.enableKeyboardShortCuts();
  }

  enableKeyboardShortCuts() {
    document.addEventListener('keydown', event => {
      if (event.key === 'b' && event.metaKey === true) this.toggleSidebar();
      if (event.key === 'e' && event.metaKey === true) this.toggleEditing();
    });
  }

  toggleSidebar() {
    this.setState({ mainViewExpanded: !this.state.mainViewExpanded })
  }

  syncWithStorage = () => {
    localStorage.setItem('scripts', JSON.stringify(this.state.scripts));
    console.log('SYNCED WITH STORAGE');
  }

  toggleCreating = () => {
    this.setState({ isCreating: true });
  }

  cancelEditing = () => {
    this.setState({ isEditing: false });
  }

  addScript = (script) => {
    this.setState({
      scripts: [...this.state.scripts, script],
      isCreating: false,
    });
  }

  onListItemClicked = (id) => {
    const { scripts } = this.state;

    const selectedScript = scripts.find(script => script.id === id);
    this.setState({ selectedScript });

    localStorage.setItem('last-selected', id);
  }

  onQuickActionClicked = (id) => {
    const scriptToRun = findById(this.state.scripts, id);
    if (scriptToRun) injectScript(scriptToRun.body);
  }

  onAddItemClicked = () => {
    const scripts = this.state.scripts;
    const newScript = createDefaultScript();
    console.log(newScript);

    this.setState({
      scripts: [...scripts, newScript],
      selectedScript: newScript
    });
  }

  toggleEditing = () => {
    this.setState({ isEditing: true });
  }

  onEditSubmit = (script) => {
    const scripts = this.state.scripts.map(s => s.id === script.id ? script : s);
    this.setState({
      scripts,
      isEditing: false,
      selectedScript: scripts.find(s => s.id === script.id)
    }, this.syncWithStorage);
  }

  onDeleteScript = (id) => {
    let { scripts } = this.state.scripts;

    scripts = this.state.scripts.filter(script => script.id !== id);
    this.setState({ scripts, selectedScript: null }, this.syncWithStorage);
  }

  onRunScript = (id) => {
    injectScript(this.state.scripts.find(script => script.id === id).body);
  }

  render () {
    const {
      isCreating,
      isEditing,
      selectedScript,
      scripts,
      mainViewExpanded
    } = this.state;

    return (
      <React.Fragment>
        <AppMainContainer fullWidth={isEditing || mainViewExpanded}>
          {selectedScript
            ? isEditing
              ? <EditScript
                  script={selectedScript}
                  onSubmit={this.onEditSubmit}
                  onCancel={this.cancelEditing}
                />
              : <ScriptContent
                  script={selectedScript}
                  onRun={this.onRunScript}
                  onEdit={this.toggleEditing}
                  onDelete={this.onDeleteScript}
                />
            : <NoneSelectedView>No Script Selected</NoneSelectedView>
          }
        </AppMainContainer>
        <AppSidebar
          onListItemClicked={this.onListItemClicked}
          onAddItemClicked={this.onAddItemClicked}
          onQuickActionClicked={this.onQuickActionClicked}
          scripts={scripts}
        />
      </React.Fragment>
    );
  }
}
