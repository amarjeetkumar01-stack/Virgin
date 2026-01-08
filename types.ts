
export type Classification = 'VIRGIN' | 'NON-VIRGIN' | 'TRANSGENDER';

export interface MemeResult {
  category: Classification;
  roast: string;
  verdict: string;
  memeUrl: string;
}
