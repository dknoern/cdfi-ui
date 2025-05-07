import { Cdfi } from 'types';
import { PeerPortfolioSegment } from 'types/peerGroups';

export const extractId = (
  jsonStringObject: string | undefined,
): string | undefined => {
  try {
    return JSON.parse(jsonStringObject as string).id;
  } catch (error) {
    return undefined;
  }
};

export const extractName = (
  jsonStringObject: string | undefined,
): string | undefined => {
  try {
    return JSON.parse(jsonStringObject as string).name;
  } catch (error) {
    return undefined;
  }
};

export const getBaseEntityFormState = (
  baseEntity: PeerPortfolioSegment | undefined,
) => {
  let baseEntityStateKey;
  if (baseEntity?.groupType === 'PEER_GROUP') {
    baseEntityStateKey = 'peerGroupsAgainst';
  } else {
    baseEntityStateKey = 'portfoliosAgainst';
  }

  return {
    [baseEntityStateKey]: JSON.stringify({
      name: baseEntity?.name,
      id: baseEntity?.id,
    }),
  };
};

export const getComparePortfolioSegmentFormState = (
  comparePortfolioSegment: PeerPortfolioSegment | undefined,
) => {
  return {
    comparePeerGroupId: JSON.stringify({
      name: comparePortfolioSegment?.name,
      id: comparePortfolioSegment?.id,
      isTenOrLess: comparePortfolioSegment?.peers?.length
        ? comparePortfolioSegment?.peers?.length <= 10
        : false,
    }),
  };
};

export const getCompareCdfisFormState = (
  allCdfis: Cdfi[],
  cdfiIds: number[],
) => {
  const matchedCdfis = allCdfis
    .filter((cdfi) => cdfiIds?.includes(cdfi.id))
    .map((matched) => JSON.stringify({ name: matched.name, id: matched.id }));
  if (matchedCdfis.length === 1) {
    return {
      compareCdfis: matchedCdfis,
    };
  }
  return {
    comparePortfolioSegmentCdfis: matchedCdfis,
  };
};
