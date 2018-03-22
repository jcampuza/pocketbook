import { observable, action } from 'mobx';

export class NotificationStore {
  @observable notifications = [];

  @action.bound
  addNotification(notification, timeout = 4000) {
    const id = Date.now();
    notification.id = id;

    if (!notification.sticky) {
      notification.timer = setTimeout(
        () => this.removeNotification(id),
        timeout,
      );
    }

    this.notifications.push(notification);
  }

  @action.bound
  removeNotification(notificationId) {
    const notification = this.notifications.find(
      element => element.id === notificationId,
    );

    if (notification != null) {
      clearTimeout(notification.timer);
      this.notifications.remove(notification);
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
