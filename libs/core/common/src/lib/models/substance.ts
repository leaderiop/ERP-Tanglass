export interface Substance {
  quantity: number;
  code: string;
  label: string;
  substanceid: string;
  unit: string;
}

export interface ShortSubstance {
  code: string;
  label: string;
  substanceid: string;
  price: number;
  priceMax: number;
  priceMin: number;
}
