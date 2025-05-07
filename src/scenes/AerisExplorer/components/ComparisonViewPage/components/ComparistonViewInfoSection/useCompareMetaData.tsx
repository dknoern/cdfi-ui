import React, { useState, useEffect } from 'react';
import { apiProcessor } from 'tools';
import { CompanyMetaData } from 'types/peerGroups';

type UseCompareMetaDataProps = {
  comparePeerGroupId?: number;
  basePeerGroupId?: number;
  cdfiId?: number;
};

// This hook is a work around to get things like the name of the portfolio segment or peer group and the list of peers/cdfis - currently the comparison object only provides the ids (the ids that are passed in to this hook)
export const useCompareMetaData = ({
  comparePeerGroupId,
  basePeerGroupId,
  cdfiId,
}: UseCompareMetaDataProps) => {
  const defaultData = {
    name: undefined,
    peerCompanies: [],
  };
  const [portfolioMeta, setPortfolioMeta] =
    useState<CompanyMetaData>(defaultData);
  const [peerGroupMeta, setPeerGroupMeta] =
    useState<CompanyMetaData>(defaultData);
  const [cdfiMeta, setCdfiMeta] = useState<any | undefined>(undefined);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (comparePeerGroupId) {
      setLoading(true);
      apiProcessor
        .get('peerGroup', comparePeerGroupId, undefined)
        .then((data) => {
          setPortfolioMeta({
            name: data.name,
            peerCompanies: data.peerCompanies,
          });
          setLoading(false);
        });
    }
  }, [comparePeerGroupId]);

  useEffect(() => {
    if (basePeerGroupId) {
      setLoading(true);
      apiProcessor.get('peerGroup', basePeerGroupId, undefined).then((data) => {
        setPeerGroupMeta({
          name: data.name,
          peerCompanies: data.peerCompanies,
        });
        setLoading(false);
      });
    }
  }, [basePeerGroupId]);

  useEffect(() => {
    if (cdfiId) {
      setLoading(true);
      apiProcessor.get('cdfi', cdfiId).then((data) => {
        setCdfiMeta(data);
        setLoading(false);
      });
    }
  }, [cdfiId]);

  return { loading, portfolioMeta, peerGroupMeta, cdfiMeta };
};
