
interface Trigger {
  id: string;
  sku: string;
  region: string;
  trigger_type: 'low_margin' | 'stockout' | 'competitor_drop';
  margin?: number;
  threshold?: number;
  stock?: number;
  discount?: number;
  price_gap?: number;
  timestamp: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
  }

  async getTriggers(): Promise<Trigger[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/triggers`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API call failed, using mock data:', error);
      // Return mock data when API is not available
      return this.getMockTriggers();
    }
  }

  private getMockTriggers(): Trigger[] {
    const mockTriggers: Trigger[] = [
      {
        id: '1',
        sku: 'SKU-001',
        region: 'North America',
        trigger_type: 'low_margin',
        margin: 15.2,
        threshold: 20,
        timestamp: new Date(Date.now() - 300000).toISOString() // 5 minutes ago
      },
      {
        id: '2',
        sku: 'SKU-002',
        region: 'Europe',
        trigger_type: 'stockout',
        stock: 0,
        timestamp: new Date(Date.now() - 600000).toISOString() // 10 minutes ago
      },
      {
        id: '3',
        sku: 'SKU-003',
        region: 'Asia Pacific',
        trigger_type: 'competitor_drop',
        price_gap: 12.5,
        discount: 8.3,
        timestamp: new Date(Date.now() - 900000).toISOString() // 15 minutes ago
      },
      {
        id: '4',
        sku: 'SKU-004',
        region: 'Latin America',
        trigger_type: 'low_margin',
        margin: 18.7,
        threshold: 22,
        timestamp: new Date(Date.now() - 1200000).toISOString() // 20 minutes ago
      },
      {
        id: '5',
        sku: 'SKU-005',
        region: 'Europe',
        trigger_type: 'competitor_drop',
        price_gap: 8.2,
        discount: 5.5,
        timestamp: new Date(Date.now() - 1500000).toISOString() // 25 minutes ago
      },
      {
        id: '6',
        sku: 'SKU-006',
        region: 'North America',
        trigger_type: 'stockout',
        stock: 2,
        timestamp: new Date(Date.now() - 1800000).toISOString() // 30 minutes ago
      },
      {
        id: '7',
        sku: 'SKU-007',
        region: 'Asia Pacific',
        trigger_type: 'low_margin',
        margin: 14.1,
        threshold: 18,
        timestamp: new Date(Date.now() - 2100000).toISOString() // 35 minutes ago
      },
      {
        id: '8',
        sku: 'SKU-008',
        region: 'Middle East',
        trigger_type: 'competitor_drop',
        price_gap: 15.3,
        discount: 12.1,
        timestamp: new Date(Date.now() - 2400000).toISOString() // 40 minutes ago
      }
    ];

    return mockTriggers;
  }
}

export const apiService = new ApiService();
