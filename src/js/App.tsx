import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import '../css/popup.css';
import { NotificationContainer } from './components/ModalContainer';
import { About, Main, Settings } from './routes';
import { RootStore, useStore } from './stores/useStore';
import { AboutIcon, ScriptIcon, SettingsIcon } from './ui/Icons';
import { debugLog } from './util';
import { VERSION } from './util/constants';

const AppContainer = styled.div<{ compact: boolean }>`
  position: relative;
  display: flex;
  flex-direction: row;
  width: ${({ compact }) => (compact ? '' : '800px')};
  height: ${({ compact }) => (compact ? '250px' : '500px')};
`;

const ContainerBase = observer(({ children, isCompactModeEnabled }) => (
  <AppContainer compact={isCompactModeEnabled}>{children}</AppContainer>
));

const selector = (stores: RootStore) => ({
  isCompactModeEnabled: stores.settingsStore.isCompactModeEnabled,
});

const Container = (props: { children: React.ReactNode }) => {
  const stores = useStore();
  const injected = selector(stores);

  return <ContainerBase {...injected} {...props} />;
};

const AppNavigationContainer = styled.aside`
  display: flex;
  flex-direction: column;
  flex: 0 0 8%;
  height: 100%;
  min-width: 50px;
  background-color: ${props => props.theme.navColor};
`;

const AppNavigation = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavLink = styled(Link)`
  padding: 1rem 0;
  color: ${props => props.theme.textColor};
`;

const ExpandButton = styled.button`
  min-width: 75px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

export const App = () => {
  const { settingsStore, storage, notificationStore } = useStore();

  useEffect(() => {
    const version = storage.getItem('version');

    if (version == null) {
      debugLog('APPLICATION: first run');
      notificationStore.addNotification(
        {
          title: 'Thanks for installing!',
          message: 'Navigate to the about tab to learn more about pocketbook!',
        },
        8000,
      );
    } else if (parseFloat(version) < VERSION) {
      debugLog('APPLICATION: update installed');
      notificationStore.addNotification(
        {
          title: 'Pocketbook recently Updated!',
          message: 'Check the changelog to view changes.',
        },
        8000,
      );
    }

    storage.setItem('version', VERSION);
  }, []);

  return (
    <Container>
      <AppNavigationContainer>
        <AppNavigation>
          <NavLink to="/">
            <ScriptIcon />
          </NavLink>
          <NavLink to="/settings">
            <SettingsIcon />
          </NavLink>
          <NavLink style={{ marginTop: 'auto' }} to="/about">
            <AboutIcon />
          </NavLink>
          {settingsStore.isCompactModeEnabled && (
            <ExpandButton onClick={() => settingsStore.setIsCompactMode(false)}>
              Expand
            </ExpandButton>
          )}
        </AppNavigation>
      </AppNavigationContainer>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/settings">
          <Settings />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </Switch>
      <NotificationContainer />
    </Container>
  );
};
