import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { editorThemes, extensionThemes } from '../util/constants';
import { Button, ButtonContainer } from '../ui/Button';
import { TextArea } from '../ui/Textarea';

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

const OptionList = ({ options }) =>
  options.map(option => <option value={option.value}>{option.label}</option>);

@inject(stores => ({
  editorTheme: stores.settingsStore.editorTheme,
  setEditorTheme: stores.settingsStore.setEditorTheme,
  bulkImport: stores.scriptStore.bulkImport,
  scripts: stores.scriptStore.scripts,
  addNotification: stores.notificationStore.addNotification,
  currentTheme: stores.themeStore.currentTheme,
  setTheme: stores.themeStore.setTheme,
}))
@observer
export class Settings extends Component {
  state = {
    isImporting: false,
    importText: '',
  };

  onEditorThemeChanged = e => {
    const value = e.target.value;
    this.props.setEditorTheme(value);
  };

  onExportClicked = () => {
    const generatedExport = JSON.stringify(this.props.scripts);
    this.setState({ isExporting: true, generatedExport });
  };

  onImportClicked = () => {
    this.setState({ isImporting: true });
  };

  onImportTextChanged = e => {
    const value = e.target.value;
    this.setState({ importText: value });
  };

  submitImport = () => {
    const { importText } = this.state;
    const { addNotification, bulkImport } = this.props;

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

      throw err;
    }
  };

  render() {
    const {
      importText,
      isImporting,
      isExporting,
      generatedExport,
    } = this.state;

    const { editorTheme, setTheme, currentTheme } = this.props;

    return (
      <SettingsContainer>
        <FormInput>
          <SelectLabel>Editor Theme</SelectLabel>
          <SelectInput value={editorTheme} onChange={this.onEditorThemeChanged}>
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
          <Button onClick={this.onExportClicked}>Export Scripts</Button>
          <Button onClick={this.onImportClicked}>Import Scripts</Button>
        </ButtonContainer>

        {isImporting && (
          <div>
            <TextArea
              placeholder="Paste Import Here"
              onChange={this.onImportTextChanged}
              value={importText}
            />
            <Button onClick={this.submitImport}>Submit Import</Button>
          </div>
        )}

        {isExporting && (
          <TextArea value={generatedExport}>
            {this.state.generatedExport}
          </TextArea>
        )}
      </SettingsContainer>
    );
  }
}
