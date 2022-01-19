import { MetaData } from '@tanglass-erp/core/common';
import { InsertedProduct, Product, Substance } from './shared.model';


export interface Glass {

  id?: string;
  type?: string;
  color?: string;
  thickness: number;
  product: Product;
  substance?: Substance;
}


export interface DetailedGlass extends MetaData{

  id: string;
  type?: string;
  color?: string;
  thickness: number;
  product: Product;
  substance?: Substance;
}


export interface InsertedGlass {
  id?: string;
  glass:ShortGlass
  product: InsertedProduct;
  substance?: Substance;
}

 interface ShortGlass{
  type?: string;
  color?: string;
  thickness: number;
}
