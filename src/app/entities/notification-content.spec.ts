import { NotificationContent } from './notification-content';

describe('Notification Content', () => {
  it('should be able to create a notification content', () => {
    const content = new NotificationContent('Hello World');
    expect(content.value).toBeTruthy();
  });

  it('should not be able to create a notification content with less 5 characters', () => {
    expect(() => {
      new NotificationContent('qqq');
    }).toThrow();
  });

  it('should not be able to create a notification content with more 240 characters', () => {
    expect(() => {
      new NotificationContent('1'.repeat(241));
    }).toThrow();
  });
});
