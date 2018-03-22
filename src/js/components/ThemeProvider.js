import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { ThemeProvider } from 'styled-components';

@inject('themeStore')
@observer
export class AppThemeProvider extends Component {
  render() {
    const { themeStore, children } = this.props;
    return <ThemeProvider theme={themeStore.theme}>{children}</ThemeProvider>;
  }
}
