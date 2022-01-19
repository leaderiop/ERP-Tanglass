import { MetaData } from '@tanglass-erp/core/common';
import { InsertedProduct, Product, Substance } from './shared.model';
import { Product_AccessoryTypes_Enum } from '@tanglass-erp/infrastructure/graphql';

//for displaying the accessory grid
export interface Accessory {

  id?: string;
  category?: string;// enum for affecting types (accessory/apparent)
  quota?: number;
  substance?: Substance;
  product?: Product;
}


//for displaying accessory fiche and editing

export interface DetailedAccessory  extends MetaData{
  id:string
  category: string;
  quota?: number;
  substance?: Substance;
  product: Product;
}
//for inserting an accessory

export interface insertedAccessory {
  id?: string;
  substance?: Substance;
  product: InsertedProduct;
  accessory:ShortAccessory
}
export interface ShortAccessory{
  category: Product_AccessoryTypes_Enum;
  quota?: number;
}
