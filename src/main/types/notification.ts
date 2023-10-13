export type NotificationCallbackType = () => Promise<void> | void;

export type NotificationCallbacksType = {
  onClick?: NotificationCallbackType;
  actionCallbacks?: NotificationCallbackType[];
};
