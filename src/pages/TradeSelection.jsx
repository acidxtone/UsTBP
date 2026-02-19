import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from '@/lib/AuthContext';
import { TRADES } from '@/lib/trade-config';
import AnonymousSession from '@/lib/AnonymousSession';
import { BannerAd, InContentAd } from '@/components/ads/AdSense';

export default function TradeSelection() {
  const { user, updateMe, checkAppState } = useAuth();
  const [selectedTrade, setSelectedTrade] = useState(user?.selected_trade || null);
  const [name, setName] = useState(user?.full_name && !user.full_name.startsWith('User') ? user.full_name : '');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleNameBlur = () => {
    if (name.trim()) {
      AnonymousSession.updateUserName(name.trim());
      checkAppState?.();
    }
  };

  const handleContinue = async () => {
    if (!selectedTrade) return;
    setSaving(true);
    try {
      await updateMe({ selected_trade: selectedTrade, selected_year: null });
      navigate(createPageUrl('YearSelection'));
    } catch (error) {
      console.error('TradeSelection: Failed to save:', error);
      navigate(createPageUrl('YearSelection'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col p-4">
      <section aria-label="Advertisement" className="flex-shrink-0 py-2">
        <BannerAd position="top" />
      </section>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-4xl mx-auto flex-1 flex items-center justify-center">
        <div className="w-full text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mb-4">
            <Briefcase className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Which trade are you studying?</h1>
          <p className="text-slate-300 text-lg mb-4">Select your trade to access the right materials and track your progress</p>
          <div className="max-w-xs mx-auto mb-6">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleNameBlur}
              className="w-full px-3 py-2 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-slate-400 text-center text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 w-full">
            {TRADES.map((trade) => (
              <motion.div key={trade.code} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card
                  className={`cursor-pointer transition-all ${selectedTrade === trade.code ? 'ring-4 ring-white bg-white' : 'bg-white/90 hover:bg-white'}`}
                  onClick={() => setSelectedTrade(trade.code)}
                >
                  <CardContent className="p-6 relative">
                    {selectedTrade === trade.code && (
                      <div className="absolute top-4 right-4">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                    )}
                    <div className="text-xl font-semibold text-slate-800">{trade.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <section aria-label="Advertisement" className="my-6 flex justify-center">
            <InContentAd position="middle" />
          </section>
          <div className="text-center">
            <Button onClick={handleContinue} disabled={!selectedTrade || saving} size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-12 py-6 text-lg font-semibold">
              {saving ? 'Saving...' : 'Continue'}
            </Button>
          </div>
        </div>
      </motion.div>
      <section aria-label="Advertisement" className="flex-shrink-0 py-2">
        <BannerAd position="bottom" />
      </section>
    </div>
  );
}
