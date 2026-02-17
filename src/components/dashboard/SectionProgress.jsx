import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus, AlertCircle } from "lucide-react";
import { getSectionsForTradeYear } from '@/lib/trade-config';

export default function SectionProgress({ sectionStats = {}, trade = 'SF', year = 1 }) {
  const tradeCode = trade || 'SF';
  const yearNum = year != null && !Number.isNaN(Number(year)) ? Number(year) : 1;
  const sectionInfo = getSectionsForTradeYear(tradeCode, yearNum);
  
  // Normalize to plain object with string keys (API may return numeric keys from JSONB)
  const normalized = typeof sectionStats === 'object' && sectionStats !== null
    ? Object.fromEntries(
        Object.entries(sectionStats).map(([k, v]) => [String(k), v && typeof v === 'object' ? v : { attempted: 0, correct: 0 }])
      )
    : {};
  
  const sections = Object.entries(sectionInfo).map(([num, info]) => {
    const stats = normalized[num] || normalized[String(num)] || { attempted: 0, correct: 0 };
    const percentage = stats.attempted > 0 
      ? Math.round((stats.correct / stats.attempted) * 100) 
      : 0;
    const status = percentage >= 70 ? "passing" : percentage > 0 ? "needs_work" : "not_started";
    
    return {
      section: num,
      ...info,
      ...stats,
      percentage,
      status
    };
  });

  const getStatusIcon = (status, percentage) => {
    if (status === "not_started") return <Minus className="h-4 w-4 text-slate-400" />;
    if (percentage >= 70) return <TrendingUp className="h-4 w-4 text-emerald-500" />;
    return <TrendingDown className="h-4 w-4 text-rose-500" />;
  };

  const getStatusBadge = (status, percentage) => {
    if (status === "not_started") return { text: "Not Started", class: "bg-slate-100 text-slate-600" };
    if (percentage >= 85) return { text: "Excellent", class: "bg-emerald-100 text-emerald-700" };
    if (percentage >= 70) return { text: "Passing", class: "bg-blue-100 text-blue-700" };
    if (percentage >= 50) return { text: "Needs Work", class: "bg-amber-100 text-amber-700" };
    return { text: "Focus Area", class: "bg-rose-100 text-rose-700" };
  };

  const getProgressBarColor = (color) => {
    const colorMap = {
      blue: "bg-blue-500",
      purple: "bg-purple-500",
      orange: "bg-orange-500",
      teal: "bg-teal-500",
      pink: "bg-pink-500",
      green: "bg-green-500",
      indigo: "bg-indigo-500",
      red: "bg-red-500"
    };
    return colorMap[color] || "bg-slate-500";
  };

  const getProgressBgColor = (color) => {
    const colorMap = {
      blue: "bg-blue-100",
      purple: "bg-purple-100",
      orange: "bg-orange-100",
      teal: "bg-teal-100",
      pink: "bg-pink-100",
      green: "bg-green-100",
      indigo: "bg-indigo-100",
      red: "bg-red-100"
    };
    return colorMap[color] || "bg-slate-100";
  };

  if (Object.keys(sectionInfo).length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            Section Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-slate-500">No sections available for this trade and year combination.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-blue-500" />
          Section Progress - Year {yearNum}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sections.map((section) => {
            const statusBadge = getStatusBadge(section.status, section.percentage);
            const progressColor = getProgressBarColor(section.color);
            const progressBgColor = getProgressBgColor(section.color);
            
            return (
              <div key={section.section} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-700">
                      {section.section}: {section.name}
                    </span>
                    <Badge variant="secondary" className={cn("text-xs", statusBadge.class)}>
                      {statusBadge.text}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">
                      {section.percentage}% ({section.correct}/{section.attempted})
                    </span>
                    {getStatusIcon(section.status, section.percentage)}
                  </div>
                </div>
                
                <div className="relative">
                  <div className={cn("w-full rounded-full h-2", progressBgColor)}>
                    <div
                      className={cn("h-2 rounded-full transition-all duration-300", progressColor)}
                      style={{ width: `${Math.min(section.percentage, 100)}%` }}
                    />
                  </div>
                  <div className="absolute -top-1 right-0 text-xs text-slate-500">
                    Target: {section.target}%
                  </div>
                </div>
              
              {section.status !== "not_started" && (
                <p className="text-xs text-slate-500 text-right">
                  {section.correct}/{section.attempted} correct ({section.percentage}%)
                </p>
              )}
            </div>
          );
        })}

        {Object.values(normalized).every(s => !s?.attempted) && (
          <div className="flex items-center gap-2 p-4 bg-slate-50 rounded-xl text-sm text-slate-600">
            <AlertCircle className="h-4 w-4" />
            Start practicing to track your progress by section
          </div>
        )}
        </div>
      </CardContent>
    </Card>
  );
}