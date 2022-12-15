import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications.repository';
import { SendNotification } from './send-notification.use-case';

describe('Send notification', () => {
  const notificationsRepository = new InMemoryNotificationsRepository();

  it('should be able to send a notification', async () => {
    const useCase = new SendNotification(notificationsRepository);
    const request = {
      recipientId: '1',
      content: 'This is a test notification',
      category: 'social',
    };

    const { notification } = await useCase.execute(request);

    expect(notification).toBeTruthy();
    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
