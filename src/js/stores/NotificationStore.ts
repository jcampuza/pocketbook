import { observable, action } from 'mobx';

interface Notification {
  message: string;
  title: string;
  sticky?: boolean;
  timer?: number;
}

interface StoreNotification extends Notification {
  id: number;
}

export class NotificationStore {
  @observable notifications: StoreNotification[] = [];

  @action.bound
  addNotification(notification: Notification, timeout = 4000) {
    const id = Date.now();
    const storeNotification = {
      ...notification,
      id,
    };

    if (!notification.sticky) {
      notification.timer = setTimeout(
        () => this.removeNotification(id),
        timeout,
      );
    }

    this.notifications.push(storeNotification as StoreNotification);
  }

  @action.bound
  removeNotification(notificationId: number) {
    const notification = this.notifications.find(
      element => element.id === notificationId,
    );

    if (notification != null) {
      clearTimeout(notification.timer);
      this.notifications = this.notifications.filter(n => n === notification);
    }
  }

  @action.bound
  clearNotifications() {
    // Shallow copy so that we don't run into an issue mutating the observable array
    const notifications = this.notifications.slice();
    notifications.forEach(notification =>
      this.removeNotification(notification.id),
    );
  }
}
