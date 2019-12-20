import { observer } from 'mobx-react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { RootStore, useStore } from '../stores/useStore';
import { Button, ButtonContainer } from '../ui/Button';
import { TextArea } from '../ui/Textarea';
import { editorThemes, extensionThemes } from '../util/themes';

const SettingsContainer = styled.div`
  position: relative;
  flex: 1 0 92%;
  display: block;
  height: 500px;
  padding: 1rem;
  color: ${props => props.theme.textColor};
  background-color: ${props => props.theme.primaryColor};

  > * + * {
    margin-bottom: 1rem;
  }
`;

const FormInput = styled.div`
  margin-bottom: 1rem;
`;

const SelectInput = styled.select`
  font-size: 16px;
  height: 2.5rem;
  border: 1px solid #ccc;
  border-radius: 2px;
  font-family: 'Roboto';
  min-width: 200px;
`;

const SelectLabel = styled.label`
  font-size: 16px;

  & + ${SelectInput} {
    margin-left: 1rem;
  }
`;

interface OptionListProps {
  options: Array<{ label: string; value: string }>;
}

const OptionList = ({ options }: OptionListProps) => (
  <>
    {options.map(option => (
      <option value={option.value}>{option.label}</option>
    ))}
  </>
);

const selector = (stores: RootStore) => ({
  editorTheme: stores.settingsStore.editorTheme,
  setEditorTheme: stores.settingsStore.setEditorTheme,
  isCompactModeEnabled: stores.settingsStore.isCompactModeEnabled,
  setCompactMode: stores.settingsStore.setCompactMode,
  bulkImport: stores.scriptStore.bulkImport,
  scripts: stores.scriptStore.scripts,
  addNotification: stores.notificationStore.addNotification,
  currentTheme: stores.themeStore.currentTheme,
  setTheme: stores.themeStore.setTheme,
});

export const Settings = observer(props => {
  const stores = useStore();
  const injected = selector(stores);

  const [state, setStateBase] = useState({
    isImporting: false,
    isExporting: false,
    importText: '',
    generatedExport: '',
  });

  const setState = (stateSlice: Partial<typeof state>) =>
    setStateBase(curr => ({
      ...curr,
      ...stateSlice,
    }));

  const onEditorThemeChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    injected.setEditorTheme(value);
  };

  const onExportClicked = () => {
    const generatedExport = JSON.stringify(injected.scripts);
    setState({ isExporting: true, generatedExport });
  };

  const onImportClicked = () => {
    setState({ isImporting: true });
  };

  const onImportTextChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setState({ importText: value });
  };

  const submitImport = () => {
    const { importText } = state;
    const { addNotification, bulkImport } = props;

    try {
      bulkImport(importText);
      addNotification({
        title: 'Successfully imported scripts!',
        message: 'You can view them in the main tab now.',
      });
    } catch (err) {
      addNotification({
        title: 'Failed to import scripts.',
        message: err.message,
        type: 'error',
      });
    }
  };

  const { importText, isImporting, isExporting, generatedExport } = state;

  const { editorTheme, setTheme, currentTheme } = props;

  return (
    <SettingsContainer>
      <FormInput>
        <SelectLabel>Editor Theme</SelectLabel>
        <SelectInput value={editorTheme} onChange={onEditorThemeChanged}>
          <OptionList
            options={editorThemes.map(theme => ({
              value: theme,
              label: theme,
            }))}
          />
        </SelectInput>
      </FormInput>

      <FormInput>
        <SelectLabel>Extension Theme</SelectLabel>
        <SelectInput
          value={currentTheme}
          onChange={e => setTheme(e.target.value)}
        >
          <OptionList
            options={extensionThemes.map(theme => ({
              value: theme,
              label: theme,
            }))}
          />
        </SelectInput>
      </FormInput>

      <ButtonContainer>
        <Button onClick={onExportClicked}>Export Scripts</Button>
        <Button onClick={onImportClicked}>Import Scripts</Button>
      </ButtonContainer>

      {isImporting && (
        <div>
          <TextArea
            placeholder="Paste Import Here"
            onChange={onImportTextChanged}
            value={importText}
          />
          <Button onClick={submitImport}>Submit Import</Button>
        </div>
      )}

      {isExporting && (
        <TextArea value={generatedExport}>{state.generatedExport}</TextArea>
      )}
    </SettingsContainer>
  );
});
