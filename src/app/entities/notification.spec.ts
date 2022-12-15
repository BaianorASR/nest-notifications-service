import { NotificationContent } from './notification-content';
import { Notification } from './notification.entity';

describe('Notification Entity', () => {
  it('should be able to create a notification', () => {
    const content = new Notification({
      content: new NotificationContent(
        'Você recebeu um pix de Vitor Belarmino',
      ),
      category: 'pix',
      recipientId: 'example-uuid-123',
    });

    expect(content).toBeTruthy();
  });
});
