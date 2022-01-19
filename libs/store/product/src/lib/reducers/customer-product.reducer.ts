import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as customerProductsActions from '../actions/customer-product.actions';
import { CustomerProduct } from '@tanglass-erp/core/product';
import * as ProductsActions from '../actions/product.actions';

export const CUSTOMER_PRODUCT_FEATURE_KEY = 'customerProducts';


export interface State extends EntityState<CustomerProduct> {
  selectedCustomerProduct: CustomerProduct
  loaded: boolean; // has the CustomerProduct list been loaded
  error?: string | null; // last known error (if any)
}

export interface customerProductPartialState {
  readonly [CUSTOMER_PRODUCT_FEATURE_KEY]: State;
}

export const customerProductAdapter: EntityAdapter<CustomerProduct> = createEntityAdapter<
CustomerProduct
>(
  {
    selectId: (product: CustomerProduct) => product.product.code,
  }
);

export const initialState: State = customerProductAdapter.getInitialState({
  // set initial required properties
  selectedCustomerProduct: null,
  colors: [],
  types: [],
  loaded: false,
  error: null,
});

const CustomerProductReducer = createReducer<State>(
  initialState,
  on( customerProductsActions.loadCustomerProductsSuccess,
      (state, action)  => customerProductAdapter.setAll(action.customerProduct,
        {
         ...state,
         loaded: true
        })
  ),

  on( customerProductsActions.loadCustomerProductByIdSuccess,
    (state, action)  => (
      {
        ...state,
        error: null,
        selectedCustomerProduct: action.customerProduct,
      }
    )
),
  on(customerProductsActions.addCustomerProductSuccess,
    (state, action) => customerProductAdapter.addOne(action.customerProduct, state)
  ),
  on(customerProductsActions.updateCustomerProductuccess, (state, action) =>
  customerProductAdapter.upsertOne(action.customerProduct, state)
  ),
  on(customerProductsActions.removeCustomerProductuccess, (state, action) =>
  customerProductAdapter.removeOne(action.customerProductId, state)
  ),
  on(ProductsActions.removeManyProductsSuccess, (state, action) =>
  customerProductAdapter.removeMany(action.codes, state)
  ),
  on(customerProductsActions.loadCustomerProductsFailure,
    customerProductsActions.loadCustomerProductByIdFailure,
    customerProductsActions.addCustomerProductFailure,
    customerProductsActions.removeCustomerProductFailure,
    ProductsActions.removeManyProductsFailure,
    (state, { error }) => ({
   ...state,
   error,
 }))
);

export function reducer(state: State | undefined, action: Action) {
  return CustomerProductReducer(state, action);
}
