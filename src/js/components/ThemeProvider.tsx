import { observer } from 'mobx-react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useStore } from '../stores/useStore';

export const AppThemeProvider = observer(({ children }) => {
  const {
    themeStore: { theme },
  } = useStore();

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
});
