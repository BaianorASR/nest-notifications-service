import { NotificationContent } from '../entities/notification-content';
import { Notification } from '../entities/notification.entity';
import { NotificationsRepository } from '../repositories/notifications.repository';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

export class SendNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute({
    recipientId,
    content,
    category,
  }: SendNotificationRequest): Promise<SendNotificationResponse> {
    const notification = new Notification({
      recipientId: recipientId,
      content: new NotificationContent(content),
      category,
    });

    await this.notificationsRepository.create(notification);

    return { notification };
  }
}
