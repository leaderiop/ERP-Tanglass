import { DetailedProvider, Provider } from '../models/provider.models';
import { PartialContact } from '../models/shared.models';

//list of Providers
export interface ProvidersVM {
    providers:Provider[];
    loading:boolean;
    error?: string;
}


//Provider fiche
export interface DetailedProviderVM{
    provider:DetailedProvider;
    loading:boolean;
    error?:string;
}


//Provider  Creation or editing

export interface ProviderCreationVM{

    contacts:PartialContact[];
    loading:boolean;
    error?:string;

}
