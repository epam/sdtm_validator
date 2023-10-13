import { Notification, NotificationConstructorOptions } from 'electron';
import noop from 'lodash/noop';

import { NotificationCallbacksType } from '../types';

const showNotification = (notificationOptions: NotificationConstructorOptions, callbackOptions?: NotificationCallbacksType) => {
  const { onClick = noop, actionCallbacks = [] } = callbackOptions || {};

  const notification = new Notification(notificationOptions);

  notification.on('click', () => {
    onClick();
  });

  notification.on('action', (_, index) => {
    actionCallbacks[index]();
  });

  notification.show();
};

export const NotificationManager = {
  showNotification
};
