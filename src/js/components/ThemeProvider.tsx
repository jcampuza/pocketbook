import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../stores/useStore';
import { ThemeProvider } from '../styled-components';

export const AppThemeProvider = observer(({ children }) => {
  const {
    themeStore: { theme },
  } = useStore();

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
});
