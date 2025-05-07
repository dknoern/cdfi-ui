import React from 'react';
import { CountrySelect } from 'forms/shared';
import { Tab } from '../types';
import { General, Location, Other } from './components';

export const tabs: Tab[] = [
  { key: '0', name: 'General', component: General },
  { key: '1', name: 'Location', component: Location },
  { key: '2', name: 'Other', component: Other },
];

export const locationFields = [
  {
    name: 'zipCode',
    title: 'Zip code',
    help: 'Type here the zip-code of Aeris Client company office',
    placeholder: 'Enter zip',
  },
  {
    name: 'country',
    title: 'Country',
    help: 'Type here the country of Aeris Client company office',
    inputComponent: <CountrySelect />,
  },
  {
    name: 'state',
    title: 'State',
    help: 'Type here the state of Aeris Client company office',
    placeholder: 'Enter state',
  },
  {
    name: 'city',
    title: 'City',
    help: 'Type here the city where Aeris Client company takes place',
    placeholder: 'Enter city',
  },
  {
    name: 'street',
    title: 'Street',
    help: 'Type here the street of Aeris Client company',
    placeholder: 'Enter address',
  },
];
