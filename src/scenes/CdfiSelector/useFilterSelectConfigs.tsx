import React, { useState, useEffect } from 'react';
import {
  useTargetBeneficiaries,
  useImpactAreas,
  useLendingTypes,
  useSubImpactAreas,
  useAreasServed,
} from 'dataManagement/usePlatformSettings';
import { apiProcessor } from 'tools';

type DataType = { name: string; isEnabled: boolean };
type OptionType = { label: string; value: string };
type OptionGroupsType = { label: string; title: string; options: OptionType[] };

const makeOptions = (data: DataType[]): OptionType[] => {
  return data
    ?.filter((item) => item.isEnabled)
    .map((item) => ({
      label: item.name,
      value: item.name,
    }));
};

export const useFilterSelectConfigs = () => {
  const [dataForOptions, setDataForOptions] = useState<{
    targetBeneficiaries?: OptionType[];
    impactAreas?: OptionType[];
    lendingTypes?: OptionType[];
    subImpactAreas?: OptionType[];
    areasServed?: OptionType[];
    irisOptions?: OptionGroupsType[];
    sdgOptions?: OptionType[];
    cdfiLocationsOptions?: OptionType[];
  }>({});
  const [sdgIrisTagsData, setSdgIrisTagsData] = useState<any>(null);

  const { data: targetBeneficiaries } = useTargetBeneficiaries();
  const { data: impactAreas } = useImpactAreas();
  const { data: lendingTypes } = useLendingTypes();
  const { data: subImpactAreas } = useSubImpactAreas();
  const { data: areasServed } = useAreasServed();

  useEffect(() => {
    const fetchSdgIrisTagsData = async () => {
      const data = await apiProcessor.get('sdgIrisTags');
      setSdgIrisTagsData(data);
    };

    fetchSdgIrisTagsData();
  }, []);

  useEffect(() => {
    const transformedTargetBeneficiaries: OptionType[] = targetBeneficiaries
      ? makeOptions(targetBeneficiaries.taxBeneficiaries ?? [])
      : [];
    const transformedImpactAreas: OptionType[] = impactAreas
      ? makeOptions(impactAreas.impactAreas ?? [])
      : [];
    const transformedLendingTypes: OptionType[] = lendingTypes
      ? makeOptions(lendingTypes.lendingTypes ?? [])
      : [];
    const transformedSubImpactAreas: OptionType[] = subImpactAreas
      ? makeOptions(subImpactAreas.subImpactAreas ?? [])
      : [];
    const transformedAreasServed: OptionType[] = areasServed
      ? makeOptions(areasServed.states ?? [])
      : [];

    const cdfiLocationsOptions: OptionType[] = areasServed
      ? areasServed.states
          .filter((item) => item.isEnabled)
          .map((item) => ({ label: item.name, value: item.code }))
      : [];

    const irisOptions = sdgIrisTagsData
      ? sdgIrisTagsData
          .filter((item: any) => item.parentId === 2)
          .map((item: any) => ({
            label: item.name,
            title: item.name,
            options: item.tags.map((tag: any) => ({
              label: tag.name,
              value: tag.name,
            })),
          }))
      : [];

    const sdgOptions = sdgIrisTagsData
      ? sdgIrisTagsData
          .find((item: any) => item.id === 1 && item.parentId === null)
          .tags.map((tag: any) => ({
            label: tag.name,
            value: tag.name,
          }))
      : [];

    setDataForOptions({
      targetBeneficiaries: transformedTargetBeneficiaries,
      impactAreas: transformedImpactAreas,
      lendingTypes: transformedLendingTypes,
      subImpactAreas: transformedSubImpactAreas,
      areasServed: transformedAreasServed,
      irisOptions,
      sdgOptions,
      cdfiLocationsOptions,
    });
  }, [
    targetBeneficiaries,
    impactAreas,
    lendingTypes,
    subImpactAreas,
    areasServed,
    sdgIrisTagsData,
  ]);

  return dataForOptions;
};
