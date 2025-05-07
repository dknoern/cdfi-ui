import { observable, action, decorate } from 'mobx';
import { apiProcessor } from '../tools';
import { defaultReportsPageUrlParams } from 'scenes/AerisExplorer/constants';
import {
  PeerPortfolioSegment,
  PeerAnalysisReport,
  PeerPortfolioPermissions,
  ComparisonPermissions,
  Comparison,
  GlobalCdifiWithMetrics,
  ComparisonName,
  PeerGroupName,
} from 'types/peerGroups';
import { Equation } from '../types/equation';

class AerisExplorerPeerGroupStore {
  peerGroupsAndPortfolioSegments: PeerPortfolioPermissions[] | undefined =
    undefined;

  cdfis: any[] | undefined = undefined;

  peerGroupOrPortfolioSegment: PeerPortfolioSegment | undefined = undefined;

  peerGroup: PeerPortfolioSegment | undefined = undefined;

  reportEquations: any | undefined = undefined;

  reportsPageUrlParams = defaultReportsPageUrlParams;

  ratingsReport: any | undefined = undefined;

  comparison: Comparison | undefined = undefined;

  comparisons: ComparisonPermissions[] | undefined = undefined;

  aerisExplorerHomePath = '';

  activeKey = '';

  subscriberFirstVisit = true;

  compareAggregate: string | undefined = 'Quartile';

  setCompareAggregate = (aggregate: string | undefined) => {
    this.compareAggregate = aggregate;
  };

  setAerisExplorerHomePath = (homePath: string) => {
    this.aerisExplorerHomePath = homePath;
  };

  setActiveKey = (key: string) => {
    this.activeKey = key;
  };

  setSubscriberFirstVisit = (bool: boolean) => {
    this.subscriberFirstVisit = bool;
  };

  setPeerGroupsAndPortfolioSegments = (
    result: PeerPortfolioPermissions[],
  ): void => {
    this.peerGroupsAndPortfolioSegments = result;
  };

  getPeerGroups = async (
    cdfiId: number | null = null,
    companyId: number | null = null,
    includeGlobal: boolean,
  ): Promise<void> => {
    const params = {
      cdfiId,
      companyId,
      includeGlobal,
    };
    this.setPeerGroupsAndPortfolioSegments(
      await apiProcessor.get('peerGroupsWithPermissions', params),
    );
  };

  refreshGlobalPeerGroups = async (): Promise<void> => {
    return await apiProcessor.get('refreshGlobalPeerGroups');
  };

  getPeerGroupsGlobalOptions = async (
    cdfiId: number | null = null,
    companyId: number | null = null,
  ): Promise<PeerPortfolioPermissions[]> => {
    const params = {
      cdfiId,
      companyId,
      includeGlobal: true,
    };
    return apiProcessor.get('peerGroupsWithPermissions', params);
  };

  setPeerGroup = (result: PeerPortfolioSegment): void => {
    this.peerGroup = result;
  };

  getPeerGroup = async (id: number) => {
    this.setPeerGroup(await apiProcessor.get('peerGroup', id, undefined));
  };

  createPeerGroup = async (payload: PeerPortfolioSegment) => {
    return await apiProcessor.post('createPeerGroup', null, payload);
  };

  updatePeerGroup = async (payload: PeerPortfolioSegment) => {
    return await apiProcessor.put('updatePeerGroup', null, payload);
  };

  deletePeerGroup = async (payload: PeerPortfolioSegment) => {
    return await apiProcessor.delete('deletePeerGroup', payload?.id);
  };

  // depricated
  createPeerGroupOrPortfolioSegment = async (payload: PeerPortfolioSegment) => {
    return await apiProcessor.post('createAEPeerPortfolio', null, payload);
  };
  // depricated
  updatePeerGroupOrPortfolioSegment = async (
    payload: PeerPortfolioSegment,
    peerPortfolioId: number,
  ): Promise<void> => {
    await apiProcessor.put('getPutAEPeerPortfolio', peerPortfolioId, payload);
  };

  setCdfis = (result: any) => {
    this.cdfis = result;
  };

  getCdfis = async () => {
    this.setCdfis(await apiProcessor.get('getCdfisForPeerGroupOrPortfolio'));
  };

  getCdfisForSelector = async () => {
    this.setCdfis(await apiProcessor.get('getCdfisForSelector'));
  };

  setReportEquations = (result: any) => {
    this.reportEquations = result;
  };

  getReportEquations = async () => {
    this.setReportEquations(await apiProcessor.get('reportEquations'));
  };

  setReportsPageUrlParams = ({
    showCalendarYearView = false,
    allYears = false,
    showInterim = false,
    showIncomplete = false,
  }): void => {
    this.reportsPageUrlParams = {
      showCalendarYearView,
      allYears,
      showInterim,
      showIncomplete,
    };
  };

  setRatingsReport = (result: any) => {
    this.ratingsReport = result;
  };

  getRatingsReport = async (paramId: any) => {
    this.setRatingsReport(await apiProcessor.get('ratingsReport', paramId));
  };

  getPeerAnalysisReport = async (
    paramId: any,
    eqId: number,
    urlParamsObj: any,
  ): Promise<PeerAnalysisReport> => {
    return await apiProcessor.get('peerAnalysisReport', {
      paramId,
      eqId,
      ...urlParamsObj,
    });
  };

  getCompareToCdfiReport = async (
    paramId: any,
    eqId: number,
    compareToCdfiIds: string,
    urlParamsObj: any,
  ): Promise<PeerAnalysisReport> => {
    return await apiProcessor.get('comparisonCDFIReport', {
      paramId,
      eqId,
      compareToCdfiIds,
      ...urlParamsObj,
    });
  };

  getCompareToPeerGroupReport = async (
    paramId: any,
    eqId: number,
    compareToPeerGroupId: number,
    urlParamsObj: any,
    compareAggregation: string | undefined,
  ): Promise<PeerAnalysisReport> => {
    return await apiProcessor.get('comparisonPeerGroupReport', {
      paramId,
      eqId,
      compareToPeerGroupId,
      compareAggregation,
      ...urlParamsObj,
    });
  };

  setComparison = (result: Comparison) => {
    this.comparison = result;
  };

  getComparison = async (id: number) => {
    this.setComparison(await apiProcessor.get('comparison', id));
  };

  setComparisons = (result: ComparisonPermissions[]) => {
    this.comparisons = result;
  };

  getComparisons = async (companyId: number | null = null) => {
    this.setComparisons(await apiProcessor.get('comparisons', companyId));
  };

  createComparison = async (payload: Partial<Comparison>) => {
    return await apiProcessor.post('createComparison', null, payload);
  };

  updateComparison = async (payload: Partial<Comparison>) => {
    return await apiProcessor.put('updateComparison', null, payload);
  };

  deleteComparison = async (id: number) => {
    return await apiProcessor.delete('deleteComparison', id);
  };

  getEquationFilters = async (): Promise<Equation[]> => {
    return apiProcessor.get('explorerFilters').then((data) => {
      return data as Equation[];
    });
  };

  getGlobalCDFIMetrics = async (
    paramId: any,
    cdfiId: number,
    urlParamsObj: any,
  ): Promise<GlobalCdifiWithMetrics> => {
    return await apiProcessor.get('getGlobalCDFIMetrics', {
      paramId,
      cdfiId,
      ...urlParamsObj,
    });
  };

  checkComparisonName = async (payload: ComparisonName) => {
    return await apiProcessor.post('checkComparisonName', null, payload);
  };

  checkPeerGroupName = async (payload: PeerGroupName) => {
    return await apiProcessor.post('checkPeerGroupName', null, payload);
  };
}

decorate(AerisExplorerPeerGroupStore, {
  peerGroupsAndPortfolioSegments: observable,
  cdfis: observable,
  peerGroupOrPortfolioSegment: observable,
  reportEquations: observable,
  reportsPageUrlParams: observable,
  ratingsReport: observable,
  comparison: observable,
  comparisons: observable,
  aerisExplorerHomePath: observable,
  activeKey: observable,
  subscriberFirstVisit: observable,
  compareAggregate: observable,
  getCdfis: action,
  setCdfis: action,
  getCdfisForSelector: action,
  getReportEquations: action,
  setReportsPageUrlParams: action,
  updatePeerGroup: action,
  deletePeerGroup: action,
  getPeerGroups: action,
  refreshGlobalPeerGroups: action,
  getComparison: action,
  getComparisons: action,
  createComparison: action,
  updateComparison: action,
  setComparison: action,
  setPeerGroup: action,
  getEquationFilters: action,
  setAerisExplorerHomePath: action,
  setActiveKey: action,
  setSubscriberFirstVisit: action,
  setCompareAggregate: action,
  checkComparisonName: action,
  checkPeerGroupName: action,
});

export const aerisExplorerPeerGroupStore = new AerisExplorerPeerGroupStore();
