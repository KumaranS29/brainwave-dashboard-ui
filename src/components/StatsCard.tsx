
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: 'emerald' | 'rose' | 'amber' | 'blue';
  trend?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color, trend }) => {
  const colorStyles = {
    emerald: {
      bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      border: 'border-emerald-200',
      icon: 'text-emerald-600',
      iconBg: 'bg-emerald-100',
      text: 'text-emerald-900',
      trend: trend?.startsWith('+') ? 'text-emerald-600' : 'text-emerald-500'
    },
    rose: {
      bg: 'bg-gradient-to-br from-rose-50 to-rose-100',
      border: 'border-rose-200',
      icon: 'text-rose-600',
      iconBg: 'bg-rose-100',
      text: 'text-rose-900',
      trend: trend?.startsWith('+') ? 'text-rose-600' : 'text-rose-500'
    },
    amber: {
      bg: 'bg-gradient-to-br from-amber-50 to-amber-100',
      border: 'border-amber-200',
      icon: 'text-amber-600',
      iconBg: 'bg-amber-100',
      text: 'text-amber-900',
      trend: trend?.startsWith('+') ? 'text-amber-600' : 'text-amber-500'
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      iconBg: 'bg-blue-100',
      text: 'text-blue-900',
      trend: trend?.startsWith('+') ? 'text-blue-600' : 'text-blue-500'
    }
  };

  const styles = colorStyles[color];

  return (
    <div className={`${styles.bg} ${styles.border} border-2 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`${styles.iconBg} rounded-full p-3 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-6 h-6 ${styles.icon}`} />
        </div>
        {trend && (
          <span className={`text-sm font-semibold ${styles.trend} bg-white/50 px-2 py-1 rounded-full`}>
            {trend}
          </span>
        )}
      </div>
      
      <div>
        <h3 className={`text-sm font-medium ${styles.text} mb-1 opacity-80`}>
          {title}
        </h3>
        <p className={`text-3xl font-bold ${styles.text} group-hover:scale-105 transition-transform duration-300`}>
          {value.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
