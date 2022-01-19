import { DetailedGlass, Glass } from '../models/glass.model';

//list of Glasses
export interface GlassesVM {
    glasses:Glass[];
    loading:boolean;
    error?: string;
}


//Glass  fiche
export interface DetailedGlassVM{
    glass:DetailedGlass;
    loading:boolean;
    error?:string;
}
