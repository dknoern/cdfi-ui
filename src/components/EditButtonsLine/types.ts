import React from 'react';
import { Metric } from 'types';

export type MetricTags = Pick<Metric, 'id' | 'tags'>;

export type NameEditDataType<IdType = React.Key> = { id: IdType; name: string };
