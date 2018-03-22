import React, { Component } from "react";
import styled from "styled-components";
import { editorThemes, extensionThemes } from "../lib/themes";
import { observer, inject } from "mobx-react";

const AppContainer = styled.div`
  position: relative;
  flex: 1 0 auto;
  display: block;
  height: 500px;
  padding: 1rem;
`;

const FormInput = styled.div`
  margin-bottom: 1rem;
`;

const SelectInput = styled.select`
  font-size: 16px;
  height: 2.5rem;
  border: 1px solid #ccc;
  border-radius: 2px;
  font-family: "Roboto";
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

@inject('settingsStore')
@observer
export class Settings extends Component {
  state = {};

  componentDidMount() {
    console.log(this.props.settingsStore);
  }

  onEditorThemeChanged = (e) => {
    const value = e.target.value;
    this.props.settingsStore.setEditorTheme(value);
  }

  render() {
    const { settingsStore } = this.props;

    return (
      <AppContainer>
        <FormInput>
          <SelectLabel>Editor Theme</SelectLabel>
          <SelectInput value={settingsStore.editorTheme} onChange={this.onEditorThemeChanged}>
            <OptionList
              options={editorThemes.map(theme => ({
                value: theme,
                label: theme
              }))}
            />
          </SelectInput>
        </FormInput>

        <FormInput>
          <SelectLabel>Extension Theme</SelectLabel>
          <SelectInput>
            <OptionList
              options={extensionThemes.map(theme => ({
                value: theme,
                label: theme
              }))}
            />
          </SelectInput>
        </FormInput>
      </AppContainer>
    );
  }
}
