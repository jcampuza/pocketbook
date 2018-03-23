import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';

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

export function Notification({ title, message, type }) {
  return (
    <NotificationDiv>
      <NotificationTitle type={type}>{title}</NotificationTitle>
      {message && <NotificationBody>{message}</NotificationBody>}
    </NotificationDiv>
  );
}

@inject(stores => ({
  notifications: stores.notificationStore.notifications,
}))
@observer
export class NotificationContainer extends Component {
  renderNotifications() {
    const { notifications } = this.props;

    return (
      <AppModals>
        {notifications.map(n => (
          <Notification
            title={n.title}
            message={n.message}
            type={n.type}
            key={n.id}
          />
        ))}
      </AppModals>
    );
  }

  render() {
    const { notifications } = this.props;

    if (!notifications.length) {
      return null;
    }

    return this.renderNotifications();
  }
}
