import { SalePoint } from '../models/sale-point.models';
import { DetailedUser, User } from '../models/user.models';

//list of Users
export interface UsersVM {
    users:User[];
    loading:boolean;
    error?: string;
}


//User  fiche
export interface DetailedUserVM{
    user:DetailedUser;
    loading:boolean;
    error?:string;
}


//User fiche Creation or editing

export interface UserCreationVM{

    salesPoints:SalePoint[];
    loading:boolean;
    error?:string;

}
