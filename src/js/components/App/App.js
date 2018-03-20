import React, { Component } from "react";
import styled from 'styled-components';

import ScriptForm from "../ScriptForm";
import { Script } from "../../models/script";
import { injectScript } from "../../lib/injectScript";

const scripts = localStorage.getItem('scripts') || [
  {
    id: 1,
    title: 'Return Appointment',
    description: `
      Returns an appointment in the flexdrive dealer portal.
      Will skip through all the flows with the default options checked, or the
      least destructive options`,
    body: `function helloWorld() {
  console.log("hello world");`
  },
  {
    id: 2,
    title: 'Pickup Appointment',
    description: `
      Pickup an appointment in the flexdrive dealer portal.
      Will skip through all the flows with the default options checked, or the
      least destructive options`,
    body: `// PICKUP SUP
    (async () => {
      const delay = (ms) => new Promise(res => setTimeout(() => res(), ms));
      const qsa = (sel) => Array.from(document.querySelectorAll(sel));	
      const clickContinue = () => {
        const btns = qsa('button');
        btns.find(btn => btn.innerText === 'Continue').click();	
      }

      // check verify infos
      const checks = qsa('input[type="checkbox"]');
      checks.forEach(check => check.click());
      clickContinue();

      await delay(200);

      // vehicle Inspection
      const radioGroups = qsa('.InspectionCard__RadioList');
      radioGroups.forEach(group => {
        const radios = group.querySelectorAll('input[type="radio"]');
        radios[0].click();
      });

      clickContinue();
      await delay(200);

      // tap to sign
      const tappable = qsa('[data-hook=tap-to-sign]');
      tappable[0].click();
    })()`

  }
];

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 400px;
`;

const AppSidebarContainer = styled.section`
  flex: 0 0 33%;
  border-left: 1px solid #999999;
  height: 100vh;
  background-color: rgba(0,0,0,0.05);
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #ffffff;
`;

const SidebarListItem = styled.li`
  padding: .5rem .5rem;
  border-bottom: 1px solid #999;

  &:hover {
    background-color: rgba(0,0,0,0.02);
    cursor: pointer;
  }
`;

const ScriptListItem = ({ script, onClick }) => {
  const { title, id } = script;

  return (
    <SidebarListItem onClick={() => onClick(id)}>{title}</SidebarListItem>
  )
}

const SidebarAddListItem = SidebarListItem.extend`
  background-color: #eaeaea;

  &:hover {
    background-color: rgba(0,0,0,0.03);
    cursor: pointer;
  }
`;

const AppMainContainer = styled.main`
  flex: 1 0 66%;
  height: 100vh;
  overflow-y: auto;
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
`

const ScriptTitle = styled.h3`
  margin: 0 0 1rem;
  font-size: 1.25rem;
  color: rgba(0,0,0,0.5);
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
`

const Button = styled.button`
  border: none;
  border-radius: 2px;
  background-color: #e0e0e0;
  padding: 0 8px;
  height: 24px;
  min-width: 60px;
  cursor: pointer;
`

class EditScript extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clean: props.script,
      dirty: { ...props.script }
    };
  }

  updateField = (e) => {
    const { name, value } = e.target;
    const dirty = {
      [name]: value,
      ...this.state.dirty,
    }
    console.log(dirty);
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
        <textarea name="body" placeholder="function body" value={body} onChange={this.updateField} />

        <ScriptActions>
          <Button onClick={() => onSubmit(script)}>Save</Button>
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
      <CodeDisplay>{script.body}</CodeDisplay>

      <ScriptActions>
        <Button onClick={() => onRun(script.id)}>Run</Button>
        <Button onClick={() => onEdit(script.id)}>Edit</Button>
        <Button onClick={() => onDelete(script.id)}>Delete</Button>
      </ScriptActions>
    </ScriptContainer>
  </React.Fragment>
);

const getLastSelectedScriptFromStorage = () => {
  const lastSelectedId = parseInt(localStorage.getItem('last-selected'), 10);

  return scripts.find(script => script.id === lastSelectedId);
}

export default class extends Component {
  state = {
    isCreating: false,
    isEditing: false,
    scripts,
    selectedScript: getLastSelectedScriptFromStorage()
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

  onEditScript = () => {
    this.setState({ isEditing: true });
  }

  onEditSubmit = (script) => {
    const scripts = this.state.scripts.map(s => s.id === script.id ? script : s);
    this.setState({ scripts });
  }

  onDeleteScript = (id) => {
    let { scripts } = this.state.scripts;

    scripts = this.state.scripts.filter(script => script.id !== id);
    this.setState({ scripts });
  }

  onRunScript = (id) => {
    injectScript(this.state.scripts.find(script => script.id === id).body);
  }

  render () {
    const {
      isCreating,
      isEditing,
      selectedScript,
      scripts
    } = this.state;

    return (
      <AppContainer>
        <AppMainContainer>
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
                  onEdit={this.onEditScript}
                  onDelete={this.onDeleteScript}
                />
            : <NoneSelectedView>No Script Selected</NoneSelectedView>
          }
        </AppMainContainer>
        <AppSidebarContainer>
          <SidebarList>
            {scripts.map(script =>
              <ScriptListItem onClick={this.onListItemClicked} script={script} key={script.id}/> 
            )}
            <SidebarAddListItem>Add Item</SidebarAddListItem>
          </SidebarList>
        </AppSidebarContainer>
      </AppContainer>
    );
  }
}
