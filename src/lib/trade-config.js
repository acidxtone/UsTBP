/**
 * Trade configuration. Welder (W) has years 1–3; all others have 1–4.
 * Country is fixed to CA for now (no country selection in UI).
 */

export const TRADES = [
  { code: 'SF', label: 'Steamfitter / Pipefitter' },
  { code: 'E', label: 'Electrician' },
  { code: 'M', label: 'Millwright / Industrial Mechanic' },
  { code: 'W', label: 'Welder' },
];

export const DEFAULT_TRADE = 'SF';
export const DEFAULT_COUNTRY = 'CA';

export function getYearsForTrade(tradeCode) {
  return tradeCode === 'W' ? [1, 2, 3] : [1, 2, 3, 4];
}

export function getTradeLabel(code) {
  return TRADES.find((t) => t.code === code)?.label || code || 'Steamfitter / Pipefitter';
}
