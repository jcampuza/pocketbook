import React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';

import '../css/popup.css';
import { Link } from 'react-router-dom';
import App from './components/App';
import { Settings } from './components/Settings';
import { SettingsStore } from './stores/SettingsStore';
import { Provider } from 'mobx-react';
import { Storage } from './lib/storage';

const storage = new Storage(localStorage);
const settingsStore = new SettingsStore(storage);

const AppContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 500px;
`;

const AppModals = styled.div`
  position: absolute;
  right: 3%;
  top: 3%;
`;

const Notification = styled.div`
  width: 200px;
  border: 1px solid #aaa;
  border-radius: 2px;
  padding: 0.75rem;
  width: 300px;
  background-color: #f3f3f3;
  box-shadow: 0 1px 5px 0px rgba(0, 0, 0, 0.33);
`;

const AppNavigationContainer = styled.aside`
  display: flex;
  flex-direction: column;
  flex: 0 0 8%;
  height: 100%;
  background-color: rgb(232, 232, 232);
`;

const AppNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavLink = styled(Link)`
  padding: 1rem 0;
  color: #000;
`;

const Core = () => (
  <Provider settingsStore={settingsStore}>
    <Router>
      <AppContainer>
        <AppNavigationContainer>
          <AppNavigation>
            <NavLink to="/">TODO</NavLink>
            <NavLink to="/settings">TODO</NavLink>
          </AppNavigation>
        </AppNavigationContainer>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/settings" component={Settings} />
        </Switch>

        <AppModals />
      </AppContainer>
    </Router>
  </Provider>
);

render(<Core />, window.document.getElementById('app-container'));
