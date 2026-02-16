import React from 'react';
import { useAuth } from '@/lib/AuthContext';
import { Link } from 'react-router-dom';
import { Home, Calendar } from 'lucide-react';
import YearIndicator from '@/components/YearIndicator';
import { createPageUrl } from '@/utils';
import { getTradeLabel } from '@/lib/trade-config';

const YearHeader = () => {
  const { user } = useAuth();
  const trade = user?.selected_trade || 'SF';
  if (!user?.selected_year) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 hover:text-blue-100 transition-colors">
            <Home className="h-4 w-4" />
            <span className="text-sm font-bold tracking-tight">TradeBenchPrep</span>
          </Link>
          <span className="text-blue-200 opacity-50">•</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-blue-100">{getTradeLabel(trade)}</span>
            <span className="text-blue-200 opacity-50">·</span>
            <YearIndicator year={user.selected_year} />
            <Link to={createPageUrl('YearSelection')} className="text-[10px] uppercase tracking-wider font-bold bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded transition-colors flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Change
            </Link>
          </div>
        </div>
        <div className="hidden sm:block text-xs font-medium text-blue-100 uppercase tracking-widest opacity-80">
          {getTradeLabel(trade)} Prep
        </div>
      </div>
    </div>
  );
};

export default YearHeader;
