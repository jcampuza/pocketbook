import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import styled from 'styled-components';
import { AppSidebar } from '../components/AppSidebar';
import { CodeEditor } from '../components/CodeEditor';
import { EditScript } from '../components/EditScript';
import { Button } from '../ui/Button';
import {
  createDefaultScript,
  findById,
  getLastSelectedScriptFromStorage,
} from '../util';
import { injectScript } from '../util/injectScript';

const AppMainContainer = styled.main`
  flex: 1 0 66%;
  height: 100vh;
  overflow-y: auto;
  color: ${props => props.theme.textColor};
  background-color: ${props => props.theme.primaryColor};

  flex-basis: ${props => (props.fullWidth ? '92%' : '66%')};
`;

const NoneSelectedView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

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

const ScriptDescription = styled.p`
  margin: 0 0 1rem;
  font-size: 1rem;
  color: ${props => props.theme.textColor};
`;

const ScriptActions = styled.div`
  margin-top: auto;

  > * + * {
    margin-left: 0.5rem;
  }
`;

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

@inject(stores => ({
  scripts: stores.scriptStore.scripts,
  filteredScripts: stores.scriptStore.filtered,
  addScript: stores.scriptStore.addScript,
  editScript: stores.scriptStore.editScript,
  removeScript: stores.scriptStore.removeScript,
  filterScripts: stores.scriptStore.filter,
  isCompactMode: stores.settingsStore.isCompactMode,
}))
@observer
export class Main extends Component {
  constructor(props) {
    super(props);

    const openInCompactMode = !!props.isCompactMode;

    this.state = {
      isCreating: false,
      isEditing: false,
      mainViewExpanded: false,
      selectedScript: getLastSelectedScriptFromStorage(props.scripts),
      searchQuery: '',
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyboardShortcuts);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyboardShortcuts);
  }

  handleKeyboardShortcuts = event => {
    if (event.key === 'b' && event.metaKey === true) this.toggleSidebar();
    if (event.key === 'e' && event.metaKey === true) this.toggleEditing();
  };

  toggleSidebar() {
    this.setState({ mainViewExpanded: !this.state.mainViewExpanded });
  }

  toggleCreating = () => {
    this.setState({ isCreating: true });
  };

  cancelEditing = () => {
    this.setState({ isEditing: false });
  };

  onListItemClicked = id => {
    const selectedScript = this.props.scripts.find(script => script.id === id);
    this.setState({ selectedScript });

    localStorage.setItem('last-selected', id);
  };

  onQuickActionClicked = id => {
    const scriptToRun = findById(this.props.scripts, id);
    if (scriptToRun) injectScript(scriptToRun.body);
  };

  onAddItemClicked = () => {
    const newScript = createDefaultScript();
    this.props.addScript(newScript);

    this.setState({ selectedScript: newScript });
  };

  toggleEditing = () => {
    this.setState({ isEditing: true });
  };

  onEditSubmit = script => {
    this.props.editScript(script);
    this.setState({
      isEditing: false,
      selectedScript: script,
    });
  };

  onDeleteScript = id => {
    this.props.removeScript(id);
    this.setState({ selectedScript: null });
  };

  onRunScript = id => {
    injectScript(this.props.scripts.find(script => script.id === id).body);
  };

  onSearchFilterChanged = e => {
    const value = e.target.value;
    this.props.filterScripts(value);
    this.setState({ searchQuery: value });
  };

  render() {
    const {
      isCreating,
      isEditing,
      selectedScript,
      mainViewExpanded,
    } = this.state;

    const { isCompactMode } = this.props;

    const scripts = this.props.filteredScripts.query
      ? this.props.filteredScripts.result
      : this.props.scripts;

    return (
      <React.Fragment>
        {!isCompactMode && (
          <AppMainContainer fullWidth={isEditing || mainViewExpanded}>
            {selectedScript ? (
              isEditing ? (
                <EditScript
                  script={selectedScript}
                  onSubmit={this.onEditSubmit}
                  onCancel={this.cancelEditing}
                />
              ) : (
                <ScriptContent
                  script={selectedScript}
                  onRun={this.onRunScript}
                  onEdit={this.toggleEditing}
                  onDelete={this.onDeleteScript}
                />
              )
            ) : (
              <NoneSelectedView>No Script Selected</NoneSelectedView>
            )}
          </AppMainContainer>
        )}

        <AppSidebar
          onListItemClicked={this.onListItemClicked}
          onAddItemClicked={this.onAddItemClicked}
          onQuickActionClicked={this.onQuickActionClicked}
          onSearchFilterChanged={this.onSearchFilterChanged}
          scripts={scripts}
        />
      </React.Fragment>
    );
  }
}
