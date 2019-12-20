import { configure as configureMobx } from 'mobx';
import React from 'react';
import { render } from 'react-dom';
import { MemoryRouter as Router } from 'react-router-dom';
import { App } from './App';
import { AppThemeProvider } from './components/ThemeProvider';
import { StoreProvider } from './stores/useStore';
import '../css/popup.css';

const isDev = process.env.NODE_ENV === 'development';
configureMobx({
  enforceActions: isDev ? 'observed' : 'never',
});

const Core = () => (
  <StoreProvider>
    <AppThemeProvider>
      <Router>
        <App />
      </Router>
    </AppThemeProvider>
  </StoreProvider>
);

render(<Core />, window.document.getElementById('app-container'));
