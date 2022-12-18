import { Injectable } from '@nestjs/common';

import { NotificationNotFoundError } from './errors/notification-not-fount.error';

import { NotificationsRepository } from '@app/repositories/notifications.repository';

interface UnreadNotificationUseCaseRequest {
  notificationId: string;
}

type UnreadNotificationUseCaseResponse = void;

@Injectable()
export class UnreadNotificationUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute({
    notificationId,
  }: UnreadNotificationUseCaseRequest): Promise<UnreadNotificationUseCaseResponse> {
    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}
