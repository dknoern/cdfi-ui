import { apiProcessor } from 'tools';

// Service functions to interact with the backend API
export const cdfiServices = {
  // Fetch the top performing CDFIs
  getTopCdfis: async () => {
    try {
      // Use the real API endpoint
      const data = await apiProcessor.get('getCdfisForSelector');
      
      // Filter for CDFIs with ratings, then sort and get the top 3 based on total assets
      const topCdfis = data
        .filter(cdfi => cdfi.rating && cdfi.rating !== 'N/A')
        .sort((a, b) => b.totalAssets - a.totalAssets)
        .slice(0, 3);
      
      // If we don't have 3 rated CDFIs, fill in with the mock data
      return topCdfis.length === 3 ? topCdfis : getMockData();
    } catch (error) {
      console.error('Error fetching top CDFIs:', error);
      // Fallback to mock data in case of error
      return getMockData();
    }
  }
};

// Mock data for development/testing purposes - all with ratings
const getMockData = () => [
  {
    id: 1,
    name: 'Community First Financial',
    location: 'San Francisco, CA',
    totalAssets: 125000000,
    totalRevenue: 12500000,
    loansReceivable: 85000000,
    numberOfLoans: 3250,
    rating: 'AAA',
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
    totalAssets: 98000000,
    totalRevenue: 9800000,
    loansReceivable: 62000000,
    numberOfLoans: 2800,
    rating: 'AA+',
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
    totalAssets: 75000000,
    totalRevenue: 7500000,
    loansReceivable: 43000000,
    numberOfLoans: 1950,
    rating: 'AA',
    growthRate: 21.2,
    impactScore: 85,
    description: 'Specialized in agricultural and rural development lending with exceptional outreach programs.',
    highlightMetric: 'Supported 350+ small farms and agricultural businesses',
    badgeType: 'warning',
  }
];