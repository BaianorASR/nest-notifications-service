export class NotificationContent {
  private content: string;

  get value(): string {
    return this.content;
  }

  private validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string) {
    const isValidContent = this.validateContentLength(content);

    if (!isValidContent) throw new Error('Invalid content length');

    this.content = content;
  }
}
