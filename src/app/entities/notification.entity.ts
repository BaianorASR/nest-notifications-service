import { Replace } from 'src/helpers/replace.helper';

import { NotificationContent } from './notification-content';

export interface NotificationProps {
  recipientId: string;
  content: NotificationContent;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private props: NotificationProps;

  constructor(props: Replace<NotificationProps, { createdAt?: Date }>) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public set recipientId(uuid: string) {
    this.props.recipientId = uuid;
  }

  public get content(): NotificationContent {
    return this.props.content;
  }

  public set content(content: NotificationContent) {
    this.props.content = content;
  }

  public get category(): string {
    return this.props.category;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public set readAt(date: Date | null | undefined) {
    this.props.readAt = date;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
