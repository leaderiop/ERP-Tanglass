
export * from './lib/core-management.module';
//services
export {CompaniesService} from './lib/services/companies.service';
export {SalePointService} from './lib/services/sale-point.service';
export { UserService } from './lib/services/user.service'
// Models
export {Companie,DetailedCompanie} from './lib/models/companies.models';
export {SalePoint,DetailedSalePoint} from './lib/models/sale-point.models';
export {User,DetailedUser,InsertedUser} from './lib/models/user.models';

//Views
export{CompaniesVM,DetailedCompanyVM}from './lib/pagesVM/companies.vm';
export{SalePointsVM,DetailedSalePointVM}from './lib/pagesVM/salesPoint.vm';
export{UsersVM,DetailedUserVM,UserCreationVM}from './lib/pagesVM/users.vm';

//enums

export * from './lib/enums'

export {
    Management_User_Role_Enum,
} from "@tanglass-erp/infrastructure/graphql";