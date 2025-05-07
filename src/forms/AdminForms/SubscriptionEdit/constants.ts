import { Tab } from '../types';
import { General, Subscribers } from './components';

export const tabs: Tab[] = [
  { key: '0', name: 'General', component: General },
  { key: '1', name: 'Subscribers', component: Subscribers },
];
