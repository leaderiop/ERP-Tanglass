import { InsertedProduct, Product } from './shared.model';
import { MetaData } from '@tanglass-erp/core/common';

// services collection

export interface ServiceConfig {

  id: string;
  name: string;
  params?: string;
  labelFactory: string;

}
export interface DetailedServiceConfig extends MetaData {

  id: string;
  name: string;
  params?:string;
  services?:Service[];
  labelFactory: string;

}

export interface InsertedServiceConfig extends MetaData {

  name: string;
  params?: string;
  services?:Service[];
  labelFactory: string;

}


export interface Service {
  id?: string;
  serviceConfig?: ServiceConfig;
  product?: Product;
  paramValues?:any;
}



export interface DetailedService extends MetaData{
  id: string;
  serviceConfig: ServiceConfig;
  product: Product;
  paramValues?: any;

}



export interface InsertedService extends MetaData{
  service:ShortService,
  product: InsertedProduct;

}
export interface ShortService
{
  serviceConfigid: string;
  paramValues?:string;

}

