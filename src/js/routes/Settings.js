import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { editorThemes, extensionThemes } from '../lib/constants';
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

@inject('settingsStore', 'scriptStore', 'notificationStore', 'themeStore')
@observer
export class Settings extends Component {
  state = {
    isImporting: false,
    importText: '',
  };

  onEditorThemeChanged = e => {
    const value = e.target.value;
    this.props.settingsStore.setEditorTheme(value);
  };

  onExportClicked = () => {
    const { scriptStore } = this.props;
    const generatedExport = JSON.stringify(scriptStore.scripts);
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
    const { scriptStore, notificationStore } = this.props;
    const { importText } = this.state;

    try {
      scriptStore.bulkImport(importText);
      notificationStore.addNotification({
        title: 'Successfully imported scripts!',
        message: 'You can view them in the main tab now.',
      });
    } catch (err) {
      notificationStore.addNotification({
        title: 'Failed to import scripts.',
        message: err.message,
        type: 'error',
      });

      throw err;
    }
  };

  render() {
    const { settingsStore, themeStore } = this.props;
    const {
      importText,
      isImporting,
      isExporting,
      generatedExport,
    } = this.state;

    return (
      <SettingsContainer>
        <FormInput>
          <SelectLabel>Editor Theme</SelectLabel>
          <SelectInput
            value={settingsStore.editorTheme}
            onChange={this.onEditorThemeChanged}
          >
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
            value={themeStore.currentTheme}
            onChange={e => themeStore.setTheme(e.target.value)}
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
