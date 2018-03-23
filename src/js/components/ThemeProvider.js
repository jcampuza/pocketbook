import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { ThemeProvider } from 'styled-components';

@inject(stores => ({ theme: stores.themeStore.theme }))
@observer
export class AppThemeProvider extends Component {
  render() {
    const { theme, children } = this.props;
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }
}
