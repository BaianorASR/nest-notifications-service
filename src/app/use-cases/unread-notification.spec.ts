import { NotificationNotFoundError } from './errors/notification-not-fount.error';
import { UnreadNotificationUseCase } from './unread-notification.use-case';

import { makeNotification } from '@test/factories/make-notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';

describe('UnreadNotificationUseCase', () => {
  let unreadNotificationUseCase: UnreadNotificationUseCase;
  let notificationsRepository: InMemoryNotificationsRepository;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    unreadNotificationUseCase = new UnreadNotificationUseCase(
      notificationsRepository,
    );
  });

  it('should mark a notification as unread', async () => {
    const notification = makeNotification({ readAt: new Date() });
    await notificationsRepository.create(notification);

    await unreadNotificationUseCase.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should throw an error if the notification is not found', async () => {
    try {
      await unreadNotificationUseCase.execute({ notificationId: 'invalid' });
      fail('Expected error was not thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(NotificationNotFoundError);
    }
  });
});
