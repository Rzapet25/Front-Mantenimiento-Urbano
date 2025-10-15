import { ChevronRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  color: 'orange' | 'blue' | 'green';
  onViewDetails?: () => void;
}

export default function StatsCard({ title, value, color, onViewDetails }: StatsCardProps) {
  const colorClasses = {
    orange: 'bg-orange-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-3 h-3 ${colorClasses[color]} rounded-full`}></div>
        <span className="text-sm text-gray-500">{title}</span>
      </div>
      <div className="text-4xl font-bold text-gray-800 mb-2">{value}</div>
      {onViewDetails && (
        <button
          onClick={onViewDetails}
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          Ver detalles <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
