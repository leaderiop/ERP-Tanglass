import { InsertedProduct, Product, Substance } from './shared.model';
import { Service } from './service.model';
import { MetaData } from '@tanglass-erp/core/common';
import { Product_ConsumableCategory_Enum } from '@tanglass-erp/infrastructure/graphql';

export interface Consumable {
  id: string;
  category:string;  // row material or consumable (enum consoCategory)
  Substance?: Substance;
  product: Product;
  labelFactory ?:string;
}


export interface DetailedConsumable extends MetaData{

  id: string;
  category:string;  // row material or consumable (enum consoCategory)
  Substance?: Substance;
  product: Product

}

export interface InsertedConsumable extends MetaData {
  id?: string;
  consumable:ShortConsumable
  Substance?: Substance;
  product: InsertedProduct;
  labelFactory ?:string;
}

export interface ShortConsumable{
  category:Product_ConsumableCategory_Enum;  // row material or consumable (enum consoCategory)

}

export interface ServiceConsumable {

  id?: string;
  quota: number;
  consumable: Consumable;
  service: Service;

}
