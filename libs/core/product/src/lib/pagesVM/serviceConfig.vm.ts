import { DetailedServiceConfig, ServiceConfig } from '../models/service.model';

//list of service collections
export interface ServicesConfigVM {
    services:ServiceConfig[];
    loading:boolean;
    error?: string;
}


//Service  fiche
export interface DetailedServiceVM{
    service:DetailedServiceConfig;
    loading:boolean;
    error?:string;
}
