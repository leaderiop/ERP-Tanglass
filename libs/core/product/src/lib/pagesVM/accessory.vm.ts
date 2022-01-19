import { Accessory, DetailedAccessory } from '../models/accessory.model';

//list of accessories
export interface AccesoriesVM {
    accessories:Accessory[];
    loading:boolean;
    error?: string;
}


//Accessory  fiche
export interface DetailedAccessoryVM{
    accessory:DetailedAccessory;
    loading:boolean;
    error?:string;
}



