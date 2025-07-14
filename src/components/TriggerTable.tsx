
import React from 'react';
import { Clock, MapPin, Package2 } from 'lucide-react';

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

interface TriggerTableProps {
  triggers: Trigger[];
}

const TriggerTable: React.FC<TriggerTableProps> = ({ triggers }) => {
  const getBadgeStyles = (triggerType: string) => {
    switch (triggerType) {
      case 'low_margin':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'stockout':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'competitor_drop':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTriggerType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Package2 className="w-5 h-5 mr-2 text-gray-600" />
          Recent Triggers ({triggers.length})
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Region
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trigger Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {triggers.slice(0, 10).map((trigger, index) => (
              <tr key={trigger.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{trigger.sku}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                    {trigger.region}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getBadgeStyles(trigger.trigger_type)}`}>
                    {formatTriggerType(trigger.trigger_type)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {trigger.trigger_type === 'low_margin' && (
                    <div>
                      <span className="font-medium">Margin:</span> {trigger.margin}%
                      {trigger.threshold && (
                        <span className="text-gray-400 ml-2">
                          (Threshold: {trigger.threshold}%)
                        </span>
                      )}
                    </div>
                  )}
                  {trigger.trigger_type === 'stockout' && (
                    <div>
                      <span className="font-medium">Stock:</span> {trigger.stock || 0} units
                    </div>
                  )}
                  {trigger.trigger_type === 'competitor_drop' && (
                    <div>
                      {trigger.price_gap && (
                        <div>
                          <span className="font-medium">Price Gap:</span> ${trigger.price_gap}
                        </div>
                      )}
                      {trigger.discount && (
                        <div className="text-xs text-gray-500">
                          Discount: {trigger.discount}%
                        </div>
                      )}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatTimestamp(trigger.timestamp)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {triggers.length === 0 && (
          <div className="text-center py-12">
            <Package2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No triggers found</p>
            <p className="text-gray-400 text-sm">Adjust your filters or wait for new data</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TriggerTable;
