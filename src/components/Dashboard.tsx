
import React, { useState, useEffect } from 'react';
import StatsCard from './StatsCard';
import TriggerTable from './TriggerTable';
import FilterPanel from './FilterPanel';
import { apiService } from '../services/api';
import { AlertTriangle, TrendingDown, Package, Zap } from 'lucide-react';

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

const Dashboard = () => {
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const [filteredTriggers, setFilteredTriggers] = useState<Trigger[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sku: '',
    region: ''
  });

  const fetchTriggers = async () => {
    try {
      const data = await apiService.getTriggers();
      setTriggers(data);
      setFilteredTriggers(data);
    } catch (error) {
      console.error('Error fetching triggers:', error);
      // Mock data for demo
      const mockData: Trigger[] = [
        {
          id: '1',
          sku: 'SKU-001',
          region: 'North America',
          trigger_type: 'low_margin',
          margin: 15.2,
          threshold: 20,
          timestamp: new Date().toISOString()
        },
        {
          id: '2',
          sku: 'SKU-002',
          region: 'Europe',
          trigger_type: 'stockout',
          stock: 0,
          timestamp: new Date().toISOString()
        },
        {
          id: '3',
          sku: 'SKU-003',
          region: 'Asia Pacific',
          trigger_type: 'competitor_drop',
          price_gap: 12.5,
          discount: 8.3,
          timestamp: new Date().toISOString()
        }
      ];
      setTriggers(mockData);
      setFilteredTriggers(mockData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTriggers();
    const interval = setInterval(fetchTriggers, 60000); // Auto-refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let filtered = triggers;
    if (filters.sku) {
      filtered = filtered.filter(trigger => 
        trigger.sku.toLowerCase().includes(filters.sku.toLowerCase())
      );
    }
    if (filters.region) {
      filtered = filtered.filter(trigger => 
        trigger.region.toLowerCase().includes(filters.region.toLowerCase())
      );
    }
    setFilteredTriggers(filtered);
  }, [filters, triggers]);

  const stats = {
    totalAlerts: triggers.length,
    lowMarginCount: triggers.filter(t => t.trigger_type === 'low_margin').length,
    stockoutsCount: triggers.filter(t => t.trigger_type === 'stockout').length,
    competitorDropsCount: triggers.filter(t => t.trigger_type === 'competitor_drop').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            RetailOps Brain
          </h1>
          <p className="text-gray-600 text-lg">
            Real-time KPI monitoring and alert system
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Alerts"
            value={stats.totalAlerts}
            icon={AlertTriangle}
            color="emerald"
            trend="+5%"
          />
          <StatsCard
            title="Low Margin"
            value={stats.lowMarginCount}
            icon={TrendingDown}
            color="rose"
            trend="-2%"
          />
          <StatsCard
            title="Stockouts"
            value={stats.stockoutsCount}
            icon={Package}
            color="amber"
            trend="+12%"
          />
          <StatsCard
            title="Competitor Drops"
            value={stats.competitorDropsCount}
            icon={Zap}
            color="blue"
            trend="+8%"
          />
        </div>

        {/* Filter Panel */}
        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          triggers={triggers}
        />

        {/* Triggers Table */}
        <TriggerTable triggers={filteredTriggers} />
      </div>
    </div>
  );
};

export default Dashboard;
