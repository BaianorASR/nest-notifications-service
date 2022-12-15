import { randomUUID } from 'node:crypto';

import { NotificationContent } from './notification-content';

import { Replace } from '@helpers/replace.helper';

export interface NotificationProps {
  recipientId: string;
  content: NotificationContent;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(props: Replace<NotificationProps, { createdAt?: Date }>) {
    this._id = randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
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

  public get readAt(): Date | null {
    return this.props.readAt ?? null;
  }

  public set readAt(date: Date | null) {
    this.props.readAt = date;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
