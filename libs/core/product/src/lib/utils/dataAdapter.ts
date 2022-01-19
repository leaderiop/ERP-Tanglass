import { insertedAccessory } from '../models/accessory.model';
import { InsertedConsumable } from '../models/consumable.model';
import { InsertedGlass } from '../models/glass.model';
import { InsertedService } from '../models/service.model';


export interface product_companies {
    data: AffectedCompany[]
};
interface AffectedCompany {
    companyid: string
}

type objToAdapt=insertedAccessory|InsertedConsumable|InsertedGlass|InsertedService

export function adaptProduct(Item: objToAdapt,type:string) {
    const product_companies = {
        data: Item.product.product_companies.map((id) =>
        ({
            companyid: id
        }
        )
        )
    }
    return { ...Item[type], product: { ...Item.product, product_companies } }

}


export function adaptProductToUpdate(Item: objToAdapt,type:string) {

  let {product_companies, ...product} = Item.product;

  product_companies = product_companies.map(e => ({companyid: e, productcode: product.code})) as any[];


    return { ...Item[type], product, companies: product_companies, code: product.code }

}


