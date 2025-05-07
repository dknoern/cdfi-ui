import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export interface NotificationItem {
  id: number;
  content: React.ReactNode;
  isNew?: boolean;
}

export interface RedirectFn {
  (
    pathname: RouteComponentProps['location']['pathname'],
    state: RouteComponentProps['location']['state'],
  ): void;
}
