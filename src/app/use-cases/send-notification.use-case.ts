import { Injectable } from '@nestjs/common';

import { NotificationContent } from '@app/entities/notification-content';
import { Notification } from '@app/entities/notification.entity';
import { NotificationsRepository } from '@app/repositories/notifications.repository';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
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
