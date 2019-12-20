import { observer } from 'mobx-react';
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { useStore } from '../stores/useStore';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

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

const NotificationTitle = styled.h4<{ type: string }>`
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

export function Fade({ children, ...props }: CSSTransitionProps) {
  return (
    <CSSTransition {...props} timeout={duration} classNames="notification">
      {children}
    </CSSTransition>
  );
}

interface NotificationProps {
  title: string;
  message: string;
  type: string;
  onRemove: () => void;
}

export const Notification = ({
  title,
  message,
  type,
  onRemove,
}: NotificationProps) => {
  return (
    <NotificationDiv>
      <NotificationTitle type={type}>{title}</NotificationTitle>
      {message && <NotificationBody>{message}</NotificationBody>}

      <NotificationClose onClick={onRemove}>close</NotificationClose>
    </NotificationDiv>
  );
};

export const NotificationContainer = observer(() => {
  const { notificationStore } = useStore();
  const { removeNotification, notifications } = notificationStore;

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
});
