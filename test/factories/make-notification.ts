import { randomUUID } from 'node:crypto';

import { Notification } from '@app/entities/notification.entity';
import { NotificationContent } from '@app/entities/notification-content';

export function makeNotification(
  override: Partial<Notification> = {},
): Notification {
  return new Notification({
    recipientId: randomUUID(),
    category: 'test',
    content: new NotificationContent('This is a test notification.'),
    ...override,
  });
}
