
import React from 'react';
import { Filter, X } from 'lucide-react';

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

interface FilterPanelProps {
  filters: {
    sku: string;
    region: string;
  };
  onFiltersChange: (filters: { sku: string; region: string }) => void;
  triggers: Trigger[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange, triggers }) => {
  const uniqueSkus = Array.from(new Set(triggers.map(t => t.sku))).sort();
  const uniqueRegions = Array.from(new Set(triggers.map(t => t.region))).sort();

  const handleFilterChange = (key: 'sku' | 'region', value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({ sku: '', region: '' });
  };

  const hasActiveFilters = filters.sku || filters.region;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="w-5 h-5 mr-2 text-gray-600" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <X className="w-4 h-4 mr-1" />
            Clear All
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sku-filter" className="block text-sm font-medium text-gray-700 mb-2">
            SKU
          </label>
          <select
            id="sku-filter"
            value={filters.sku}
            onChange={(e) => handleFilterChange('sku', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          >
            <option value="">All SKUs</option>
            {uniqueSkus.map(sku => (
              <option key={sku} value={sku}>
                {sku}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="region-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Region
          </label>
          <select
            id="region-filter"
            value={filters.region}
            onChange={(e) => handleFilterChange('region', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          >
            <option value="">All Regions</option>
            {uniqueRegions.map(region => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.sku && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200">
              SKU: {filters.sku}
              <button
                onClick={() => handleFilterChange('sku', '')}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.region && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 border border-green-200">
              Region: {filters.region}
              <button
                onClick={() => handleFilterChange('region', '')}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
