import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const duration = 1000;

const AppModals = styled.div`
  position: absolute;
  right: 3%;
  top: 3%;
  z-index: 9;
`;

const NotificationDiv = styled.div`
  width: 200px;
  border: 1px solid #aaa;
  border-radius: 2px;
  padding: 0.75rem;
  width: 300px;
  background-color: #f3f3f3;
  box-shadow: 0 1px 5px 0px rgba(0, 0, 0, 0.33);
`;

const NotificationTitle = styled.h4`
  margin: 0;
  font-size: 1rem;
  color: ${props => (props.type === 'error' ? '#e02727' : '')};
`;

const NotificationBody = styled.p`
  margin: 1rem 0 0;
  font-size: 1rem;
`;

const NotificationClose = styled.p`
  font-size: 0.8rem;
  color: '#999';
  margin: 1rem 0 0;
  cursor: pointer;
`;

export function Fade({ children, ...props }) {
  return (
    <CSSTransition {...props} timeout={duration} classNames="notification">
      {children}
    </CSSTransition>
  );
}

export function Notification({ title, message, type, onRemove }) {
  return (
    <NotificationDiv>
      <NotificationTitle type={type}>{title}</NotificationTitle>
      {message && <NotificationBody>{message}</NotificationBody>}

      <NotificationClose onClick={onRemove}>close</NotificationClose>
    </NotificationDiv>
  );
}

@inject(stores => ({
  notifications: stores.notificationStore.notifications,
  removeNotification: stores.notificationStore.removeNotification,
}))
@observer
export class NotificationContainer extends Component {
  render() {
    const { notifications, removeNotification } = this.props;
    console.log(notifications.length);
    return (
      <AppModals>
        <TransitionGroup className="notification">
          {notifications.map(n => (
            <Fade key={n}>
              <Notification
                title={n.title}
                message={n.message}
                type={n.type}
                key={n.id}
                onRemove={() => removeNotification(n.id)}
              />
            </Fade>
          ))}
        </TransitionGroup>
      </AppModals>
    );
  }
}
