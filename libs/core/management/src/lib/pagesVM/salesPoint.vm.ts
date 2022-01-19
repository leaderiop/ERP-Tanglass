import { DetailedSalePoint, SalePoint } from '../models/sale-point.models';

//list of sales Points
export interface SalePointsVM {
    salePoints:SalePoint[];
    loading:boolean;
    error?: string;
}


//Sale Point  fiche
export interface DetailedSalePointVM{
    salePoint:DetailedSalePoint;
    loading:boolean;
    error?:string;
}
