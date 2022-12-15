import { randomUUID } from 'node:crypto';

import { CancelNotificationUseCase } from './cancel-notification.use-case';
import { NotificationNotFoundError } from './errors/notification-not-fount.error';

import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { Notification } from '@app/entities/notification.entity';
import { NotificationContent } from '@app/entities/notification-content';

describe('Cancel notification', () => {
  const notificationsRepository = new InMemoryNotificationsRepository();

  beforeEach(() => {
    notificationsRepository.notifications = [];
  });

  it('should be able cancel a notification', async () => {
    const cancelNotificationUseCase = new CancelNotificationUseCase(
      notificationsRepository,
    );

    const notification = new Notification({
      recipientId: randomUUID(),
      content: new NotificationContent('This is a test notification'),
      category: 'social',
    });

    await notificationsRepository.create(notification);

    await cancelNotificationUseCase.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].cancelAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able cancel a notification that does not exist', async () => {
    const cancelNotificationUseCase = new CancelNotificationUseCase(
      notificationsRepository,
    );

    await expect(() =>
      cancelNotificationUseCase.execute({
        notificationId: randomUUID(),
      }),
    ).rejects.toThrow(NotificationNotFoundError);
  });
});
