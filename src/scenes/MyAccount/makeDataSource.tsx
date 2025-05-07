import { getTooltipData } from './makeColumns';
import { SubscriberSubscriptionEditFormData } from '../../types';

const tooltip = getTooltipData();

const getCdfisCurrentlyIncluded = (array: any) => {
  return array.length === 0
    ? 'None'
    : array
        .reduce(function (a: string | any[], b: { name: string }) {
          return a + ['', ', '][+!!a.length] + b.name;
        }, '')
        .split(', ')
        .sort()
        .join(', ');
};

const getSubscriptionLevel = (value: number | string | undefined) => {
  return !value ? 'None' : value === 'All' ? 'Unlimited CDFIs' : value;
};

export const getDataSource = (
  subscriberSubscription: SubscriberSubscriptionEditFormData | undefined,
) => {
  return [
    {
      name: 'Aeris® Ratings Reports:',
      level: getSubscriptionLevel(
        subscriberSubscription?.cdfiCountRatingReports,
      ),
      slots: subscriberSubscription?.cdfisRatingReports.length,
      included: getCdfisCurrentlyIncluded(
        subscriberSubscription?.cdfisRatingReports,
      ),
      tooltip: tooltip.ratingsReports,
    },
    {
      name: 'Aeris® Performance Maps:',
      level: getSubscriptionLevel(
        subscriberSubscription?.cdfiCountPerformanceMaps,
      ),
      slots: subscriberSubscription?.cdfisPerformanceMaps.length,
      included: getCdfisCurrentlyIncluded(
        subscriberSubscription?.cdfisPerformanceMaps,
      ),
      tooltip: tooltip.perfomanceMaps,
    },
    {
      name: 'Aeris® Explorer:',
      level: getSubscriptionLevel(subscriberSubscription?.cdfiCountPeerGroups),
      slots: subscriberSubscription?.cdfisPeerGroups.length,
      included: getCdfisCurrentlyIncluded(
        subscriberSubscription?.cdfisPeerGroups,
      ),
      tooltip: tooltip.peerGroups,
    },
    {
      name: 'Aeris® Fact Sheets:',
      level: getSubscriptionLevel(subscriberSubscription?.cdfiCountFactSheets),
      slots: subscriberSubscription?.cdfisFactSheets.length,
      included: getCdfisCurrentlyIncluded(
        subscriberSubscription?.cdfisFactSheets,
      ),
      tooltip: tooltip.factSheets,
    },
    {
      name: 'Library:',
      level: getSubscriptionLevel(subscriberSubscription?.cdfiCountLibrary),
      slots: subscriberSubscription?.cdfisLibrary.length,
      included: getCdfisCurrentlyIncluded(subscriberSubscription?.cdfisLibrary),
      tooltip: tooltip.library,
    },
    {
      name: 'Custom Data Reports:',
      level: subscriberSubscription?.isCustomDataReports ? 'Yes' : 'No',
      slots: '',
      included: '',
      tooltip: tooltip.customDataReports,
    },
  ];
};
