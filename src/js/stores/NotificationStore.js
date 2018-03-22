import { observable, action } from 'mobx';

export class NotificationStore {
  @observable notifications = [];

  @action.bound
  addNotification(notification) {
    const id = Date.now();
    notification.id = id;
    notification.timer = setTimeout(() => this.removeNotification(id));

    this.notifications.push(notification);
  }

  @action.bound
  removeNotification(notificationId) {
    const notification = this.notifications.find(
      element => element.id === notificationId,
    );

    clearTimeout(this.notifications[index].timer);
    this.notifications.remove(notification);
  }

  @action.bound
  clearNotifications() {
    // Shallow copy so that we run into an issue mutating the array
    const notifications = this.notifications.slice();
    notifications.forEach(notification =>
      this.removeNotification(notification.id),
    );
  }
}
