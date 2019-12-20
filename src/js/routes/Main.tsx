import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import styled from '../styled-components';
import { AppSidebar } from '../components/AppSidebar';
import { CodeEditor } from '../components/CodeEditor';
import { EditScript } from '../components/EditScript';
import { Button } from '../components/Button';
import {
  createDefaultScript,
  findById,
  getLastSelectedScriptFromStorage,
  Script,
} from '../lib/util';
import { injectScript } from '../lib/injectScript';
import { useStore, RootStore } from '../stores/useStore';
import { useReactState } from '../lib/useReactState';

const AppMainContainer = styled.main<{ fullWidth: boolean }>`
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

interface ScriptContent {
  script: Script;
  onRun: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ScriptContent = ({ script, onRun, onEdit, onDelete }: ScriptContent) => (
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

const selector = (stores: RootStore) => ({
  scripts: stores.scriptStore.scripts,
  filteredScripts: stores.scriptStore.filtered,
  addScript: stores.scriptStore.addScript,
  editScript: stores.scriptStore.editScript,
  removeScript: stores.scriptStore.removeScript,
  filterScripts: stores.scriptStore.filter,
  isCompactMode: stores.settingsStore.isCompactMode,
});

interface State {
  isCreating: boolean;
  isEditing: boolean;
  mainViewExpanded: boolean;
  selectedScript: Script | null | undefined;
  searchQuery: string;
}

export const Main = observer(() => {
  const store = useStore();

  const injected = selector(store);

  const [state, setState] = useReactState<State>({
    isCreating: false,
    isEditing: false,
    mainViewExpanded: false,
    selectedScript: getLastSelectedScriptFromStorage(injected.scripts),
    searchQuery: '',
  });

  const toggleSidebar = () => {
    setState({ mainViewExpanded: !state.mainViewExpanded });
  };

  const toggleEditing = () => {
    setState({ isEditing: true });
  };

  const cancelEditing = () => {
    setState({ isEditing: false });
  };

  const handleKeyboardShortcuts = (event: KeyboardEvent) => {
    if (event.key === 'b' && event.metaKey === true) toggleSidebar();
    if (event.key === 'e' && event.metaKey === true) toggleEditing();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardShortcuts);

    return () => {
      document.removeEventListener('keydown', handleKeyboardShortcuts);
    };
  });

  const onListItemClicked = (id: string) => {
    const selectedScript = injected.scripts.find(script => script.id === id);
    setState({ selectedScript });

    localStorage.setItem('last-selected', id);
  };

  const onQuickActionClicked = (id: string) => {
    const scriptToRun = findById(injected.scripts, id);
    if (scriptToRun) injectScript(scriptToRun.body);
  };

  const onAddItemClicked = () => {
    const newScript = createDefaultScript();
    injected.addScript(newScript);

    setState({ selectedScript: newScript });
  };

  const onEditSubmit = (script: Script) => {
    injected.editScript(script);
    setState({
      isEditing: false,
      selectedScript: script,
    });
  };

  const onDeleteScript = (id: string) => {
    injected.removeScript(id);
    setState({ selectedScript: null });
  };

  const onRunScript = (id: string) => {
    const script = injected.scripts.find(script => script.id === id);

    if (script) {
      injectScript(script.body);
    }
  };

  const onSearchFilterChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    injected.filterScripts(value);
    setState({ searchQuery: value });
  };

  const { isEditing, selectedScript, mainViewExpanded, searchQuery } = state;

  const { isCompactMode } = injected;

  const scripts = injected.filteredScripts.query
    ? injected.filteredScripts.result
    : injected.scripts;

  return (
    <React.Fragment>
      {!isCompactMode && (
        <AppMainContainer fullWidth={isEditing || mainViewExpanded}>
          {selectedScript ? (
            isEditing ? (
              <EditScript
                script={selectedScript}
                onSubmit={onEditSubmit}
                onCancel={cancelEditing}
              />
            ) : (
              <ScriptContent
                script={selectedScript}
                onRun={onRunScript}
                onEdit={toggleEditing}
                onDelete={onDeleteScript}
              />
            )
          ) : (
            <NoneSelectedView>No Script Selected</NoneSelectedView>
          )}
        </AppMainContainer>
      )}

      <AppSidebar
        onListItemClicked={onListItemClicked}
        onAddItemClicked={onAddItemClicked}
        onQuickActionClicked={onQuickActionClicked}
        onSearchFilterChanged={onSearchFilterChanged}
        scripts={scripts}
        searchInput={searchQuery}
      />
    </React.Fragment>
  );
});
