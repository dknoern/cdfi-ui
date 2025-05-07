import { apiProcessor } from 'tools';

// Service functions to interact with the backend API
export const cdfiServices = {
  // Fetch the top performing CDFIs
  getTopCdfis: async () => {
    try {
      // This would use the actual API endpoint when implemented
      // For now, using mock data since the endpoint doesn't exist yet
      // When ready, we'd use something like:
      // const data = await apiProcessor.get('topCdfis');
      // return data;
      
      // Using mock data for now
      return getMockData();
    } catch (error) {
      console.error('Error fetching top CDFIs:', error);
      return getMockData();
    }
  }
};

// Mock data for development/testing purposes
const getMockData = () => [
  {
    id: 1,
    name: 'Community First Financial',
    location: 'San Francisco, CA',
    totalRevenue: 12500000,
    loansReceivable: 85000000,
    numberOfLoans: 3250,
    growthRate: 24.5,
    impactScore: 92,
    description: 'Leading CDFI focused on affordable housing with exceptional portfolio performance and community impact.',
    highlightMetric: 'Funded 500+ affordable housing units in 2024',
    badgeType: 'success',
  },
  {
    id: 2,
    name: 'Equitable Finance Partners',
    location: 'Chicago, IL',
    totalRevenue: 9800000,
    loansReceivable: 62000000,
    numberOfLoans: 2800,
    growthRate: 18.7,
    impactScore: 88,
    description: 'Innovative CDFI with strong focus on small business lending in underserved communities.',
    highlightMetric: 'Created 1,200+ jobs through small business loans',
    badgeType: 'processing',
  },
  {
    id: 3,
    name: 'Rural Development Fund',
    location: 'Denver, CO',
    totalRevenue: 7500000,
    loansReceivable: 43000000,
    numberOfLoans: 1950,
    growthRate: 21.2,
    impactScore: 85,
    description: 'Specialized in agricultural and rural development lending with exceptional outreach programs.',
    highlightMetric: 'Supported 350+ small farms and agricultural businesses',
    badgeType: 'warning',
  }
];
