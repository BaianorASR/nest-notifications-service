import { NotificationContent } from './notification-content';

describe('NotificationContent', () => {
  it('should be able to create a notification content', () => {
    const content = new NotificationContent('Hello World');
    expect(content.value).toBeTruthy();
  });
});
