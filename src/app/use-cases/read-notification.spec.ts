import { NotificationNotFoundError } from './errors/notification-not-fount.error';
import { ReadNotificationUseCase } from './read-notification.use-case';

import { makeNotification } from '@test/factories/make-notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';

describe('ReadNotificationUseCase', () => {
  let readNotificationUseCase: ReadNotificationUseCase;
  let notificationsRepository: InMemoryNotificationsRepository;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    readNotificationUseCase = new ReadNotificationUseCase(
      notificationsRepository,
    );
  });

  it('should mark a notification as read', async () => {
    const notification = makeNotification();
    await notificationsRepository.create(notification);

    await readNotificationUseCase.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should throw an error if the notification is not found', async () => {
    try {
      await readNotificationUseCase.execute({ notificationId: 'invalid' });
      fail('Expected error was not thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(NotificationNotFoundError);
    }
  });
});
