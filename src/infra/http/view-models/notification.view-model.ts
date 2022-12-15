import { Notification } from '@app/entities/notification.entity';

export interface NotificationHTTP {
  id: string;
  recipientId: string;
  content: string;
  category: string;
}

export class NotificationViewModel {
  static toHTTP(notification: Notification): NotificationHTTP {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
    };
  }
}
