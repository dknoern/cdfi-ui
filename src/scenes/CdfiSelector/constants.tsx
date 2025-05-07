import styles from './CdfiSelector.module.scss';

export enum FilterEnum {
  PERFORMANCE = 'PERFORMANCE',
  PRIMARY_LENDING_TYPE = 'PRIMARY_LENDING_TYPE',
  RATED = 'RATED',
  IMPACT_MANAGEMENT_RATING = 'IMPACT_MANAGEMENT_RATING',
  FINANCIAL_PERFORMANCE_RATING = 'FINANCIAL_PERFORMANCE_RATING',
  LOCATION = 'LOCATION',
  IMPACT = 'IMPACT',
  AREA_SERVED = 'AREA_SERVED',
  SECTORAL_FOCUS = 'SECTORAL_FOCUS',
  TOTAL_ASSETS = 'TOTAL_ASSETS',
  LENDING_TYPE = 'LENDING_TYPE',
}

export type FilterDataType = {
  filter: FilterEnum;
  values: string[];
  displayName: string;
} | null;

const mapDataKeyToEnum = (dataKey: string) => {
  switch (dataKey) {
    case 'rated':
      return {
        filter: FilterEnum.RATED,
        displayName: 'Rated',
      };
    case 'impactManagementRating':
      return {
        filter: FilterEnum.IMPACT_MANAGEMENT_RATING,
        displayName: 'Impact Management Rating',
      };
    case 'financialPerformanceRating':
      return {
        filter: FilterEnum.FINANCIAL_PERFORMANCE_RATING,
        displayName: 'Financial Performance Rating',
      };
    case 'primaryLendingType':
      return {
        filter: FilterEnum.PRIMARY_LENDING_TYPE,
        displayName: 'Primary Lending Type',
      };
    case 'lendingType':
      return {
        filter: FilterEnum.LENDING_TYPE,
        displayName: 'Lending Type',
      };
    case 'sectoralFocus':
      return {
        filter: FilterEnum.SECTORAL_FOCUS,
        displayName: 'Impact Areas',
      };
    case 'state':
      return {
        filter: FilterEnum.LOCATION,
        displayName: 'CDFI Location',
      };
    case 'areaServed':
      return {
        filter: FilterEnum.AREA_SERVED,
        displayName: 'Area(s) Served',
      };
    case 'totalAssets':
      return {
        filter: FilterEnum.TOTAL_ASSETS,
        displayName: 'Total Assets',
      };
    default:
      break;
  }
};

const mapEnumToDataKey = (filter: FilterEnum) => {
  switch (filter) {
    case FilterEnum.RATED:
      return 'rated';
    case FilterEnum.IMPACT_MANAGEMENT_RATING:
      return 'impactManagementRating';
    case FilterEnum.FINANCIAL_PERFORMANCE_RATING:
      return 'financialPerformanceRating';
    case FilterEnum.PRIMARY_LENDING_TYPE:
      return 'primaryLendingType';
    case FilterEnum.LENDING_TYPE:
      return 'lendingType';
    case FilterEnum.SECTORAL_FOCUS:
      return 'sectoralFocus';
    case FilterEnum.IMPACT:
      return 'subImpactAreas';
    case FilterEnum.LOCATION:
      return 'state';
    case FilterEnum.AREA_SERVED:
      return 'areaServed';
    case FilterEnum.TOTAL_ASSETS:
      return 'totalAssets';
    default:
      return '';
  }
};

export const filterSelectConfigs = [
  {
    title: 'Rated',
    dataKey: 'rated',
    className: styles.multiSelect,
  },
  {
    title: 'Impact Management Rating',
    dataKey: 'impactManagementRating',
    className: styles.multiSelect,
  },
  {
    title: 'Financial Performance Rating',
    dataKey: 'financialPerformanceRating',
    className: styles.multiSelect,
  },
  {
    title: 'SDGs',
    dataKey: 'sdgs',
    className: styles.multiSelect,
  },
  {
    title: 'Impact Areas',
    dataKey: 'sectoralFocus',
    className: styles.multiSelect,
  },
  {
    title: 'Sub Impact Areas',
    dataKey: 'subImpactAreas',
    className: styles.multiSelect,
  },
  {
    title: 'Target Beneficiaries',
    dataKey: 'targetBeneficiaries',
    className: styles.multiSelect,
  },
  {
    title: 'IRIS+',
    dataKey: 'iris',
    className: styles.multiSelect,
  },
  {
    title: 'Lending Type',
    dataKey: 'lendingType',
    className: styles.multiSelect,
  },
  {
    title: 'Primary Lending Type',
    dataKey: 'primaryLendingType',
    className: styles.multiSelect,
  },
  {
    title: 'CDFI Location',
    dataKey: 'state',
    className: styles.multiSelect,
  },
  {
    title: 'Area(s) Served',
    dataKey: 'areaServed',
    className: styles.multiSelect,
  },
];

export const transformUISelectionsToFiltersPayload = (
  selectionsObject: Record<string, string[]>,
): FilterDataType[] => {
  const filters = Object.entries(selectionsObject)
    .map(([dataKey, values]) => {
      const mappedEnum = mapDataKeyToEnum(dataKey);
      if (mappedEnum && values.length > 0) {
        const { filter, displayName } = mappedEnum;
        return {
          filter,
          values,
          displayName,
        };
      }
      return null;
    })
    .filter((filterPayloadObj) => filterPayloadObj !== null);
  return filters;
};

export const transformUIAdditionalFiltersToFiltersPayload = (
  additionalFiltersObject: Record<string, [number, number] | undefined>,
) => {
  const addtionalFilters = Object?.entries(additionalFiltersObject)
    ?.map(([equationId, values]) => {
      if (values?.[0] !== undefined || values?.[1] !== undefined) {
        return {
          equationId,
          values,
        };
      }
      return null;
    })
    .filter((filteredPayloadObject) => filteredPayloadObject !== null);
  return addtionalFilters;
};

export const transformUITotalAssetsToFilterPayload = (
  values: [number, number],
): FilterDataType => {
  return {
    filter: FilterEnum.TOTAL_ASSETS,
    values: values?.map((val) => val.toString()),
    displayName: 'Total Assets',
  };
};

export const transformFiltersDataToUISelections = (
  filters: { filter: FilterEnum; values: string[]; displayName: string }[],
): Record<string, string[]> => {
  const selectionsObject: Record<string, string[]> = {};
  filters.forEach(({ filter, values }) => {
    const dataKey = mapEnumToDataKey(filter);
    if (dataKey) {
      selectionsObject[dataKey] = values;
    }
  });
  return selectionsObject;
};

export const transformAdditionalFiltersDataToUIInputs = (
  additionalFilters: { equationId: number; values: [number, number] }[],
) => {
  const additionalFiltersObject: Record<string, [number, number]> = {};
  additionalFilters.forEach(({ equationId, values }) => {
    if (values !== undefined) {
      additionalFiltersObject[equationId] = values;
    }
  });
  return additionalFiltersObject;
};

export const transformTotalAssetsDataToUIValues = (totalAssets: {
  filter: FilterEnum;
  values: string[];
  displayName: string;
}): [number, number] | undefined => {
  if (totalAssets) {
    return totalAssets?.values?.map((val) => Number(val)) as [number, number];
  }
  return undefined;
};
