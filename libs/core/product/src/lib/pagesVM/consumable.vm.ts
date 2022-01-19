import { Consumable, DetailedConsumable } from '../models/consumable.model';

//list of Consumables
export interface consumablesVM {
    consumables:Consumable[];
    loading:boolean;
    error?: string;
}


//Consumable  fiche
export interface DetailedConsumableVM{
    consumable:DetailedConsumable;
    loading:boolean;
    error?:string;
}
