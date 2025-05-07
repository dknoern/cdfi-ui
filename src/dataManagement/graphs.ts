import { uiStore } from 'store';
import { apiProcessor } from 'tools';
import { Portfolio, Investment, Company } from "types";
import {
  GraphMeta,
  GraphPreview,
  GraphPreviewRequestData,
  GraphPreviewView,
  GraphSaveData,
} from 'types/graphs';
import { StoreData } from 'forms/ChartCreate/types';
import { reportedDataConverters } from 'dataConverters/reportedData';

type GetGraphsParams = {
  portfolioId?: Portfolio['id'] | null;
  investmentId?: Investment['id'] | null;
} | null;

// here Company is Investment
export class Graphs {
  getGraphs = (params: GetGraphsParams): Promise<GraphMeta[]> => {
    const requestParams = { ...params };

    // Exclude null and undefined values from request params
    Object.keys(requestParams).forEach((key) => {
      const value = requestParams[key as keyof typeof requestParams];

      if (value === null || value === undefined)
        delete requestParams[key as keyof typeof requestParams];
    });

    return apiProcessor.get('graphs', requestParams);
  };

  create = (data: GraphSaveData): Promise<GraphMeta[]> => {
    const OPERATION = 'CREATE_GRAPH';

    uiStore.addLoading(OPERATION);

    return apiProcessor.post('graphCreate', null, data).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  loadTemplate = (
    templateId: GraphMeta['id'],
    portfolioId: Portfolio['id'] | null,
  ): Promise<StoreData> => {
    const OPERATION = 'LOAD_GRAPH_TEMPLATE';

    uiStore.addLoading(OPERATION);

    return apiProcessor
      .get('graphTemplate', {
        id: templateId,
        portfolioId,
      })
      .finally(() => {
        uiStore.endLoading(OPERATION);
      });
  };

  edit = (
    graphId: GraphMeta['id'],
    data: GraphSaveData,
  ): Promise<GraphMeta> => {
    const OPERATION = 'graphUpdate';

    uiStore.addLoading(OPERATION);

    return apiProcessor.patch(OPERATION, graphId, data).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  delete = (graphId: GraphMeta['id']): Promise<void> => {
    const OPERATION = 'graphDelete';

    uiStore.addLoading(OPERATION);

    return apiProcessor.delete(OPERATION, graphId).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  deleteForCompany = (
    graphId: GraphMeta['id'],
    companyId: Investment['id'],
  ): Promise<void> => {
    const OPERATION = 'graphDeleteForCompany';

    uiStore.addLoading(OPERATION);

    return apiProcessor
      .delete(OPERATION, { graphId, companyId })
      .finally(() => {
        uiStore.endLoading(OPERATION);
      });
  };

  handleGraphResponse = (graphData: GraphPreview): GraphPreviewView =>
    reportedDataConverters.server2Client(graphData);

  handleAerisGraphResponse = (graphData: GraphPreview): GraphPreviewView =>
    reportedDataConverters.server2Client(graphData);

  getGraphForCompany = (
    graphId: number,
    companyId?: Investment['id'],
  ): Promise<GraphPreviewView> => {
    return apiProcessor
      .get('reportedDataV2GraphForCompany', { graphId, pcId: companyId })
      .then(this.handleGraphResponse);
  };

  getGraphForForPortfolio = (
    graphId: number,
    portfolioId?: Portfolio['id'],
  ): Promise<GraphPreviewView> => {
    return apiProcessor
      .get('reportedDataV2GraphForPortfolio', { graphId, portfolioId })
      .then(this.handleGraphResponse);
  };

  getGraphPreviewByCompany = (
    companyId: Investment['id'],
    data: GraphPreviewRequestData,
  ): Promise<GraphPreviewView> => {
    return apiProcessor
      .post('reportedDataV2ForCompany', companyId, data)
      .then(this.handleGraphResponse);
  };

  getGraphPreviewByCompanies = (
    companyIds: Investment['id'][],
    data: GraphPreviewRequestData,
  ): Promise<GraphPreviewView> => {
    return apiProcessor
      .post('reportedDataV2ForCompanies', companyIds.join(','), data)
      .then(this.handleGraphResponse);
  };

  getGraphForCDFI = (
    graphId: number,
    companyId?: Company['id'],
  ): Promise<GraphPreviewView> => {
    return apiProcessor
      .get('aerisGraphForCdfi', { graphId, companyId })
      .then(this.handleAerisGraphResponse);
  };
}

export const graphs = new Graphs();
