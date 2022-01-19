import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as ProductActions from './product-draft.actions';
import { Product_draft } from '@tanglass-erp/core/sales';
import { roundDimensions } from './adapters';
export const PRODUCT_FEATURE_KEY = 'product';

export interface ProductState extends EntityState<Product_draft> {
  selectedId?: string; // which Product record has been selected
  selectedProducts?: Product_draft[];
  selectedGlasses?: Product_draft[];
  dimensions?: { selectedM2?: number; selectedML?: number };
  loaded: boolean; // has the Product list been loaded
  error?: string | null; // last known error (if any)
}

export interface ProductPartialState {
  readonly [PRODUCT_FEATURE_KEY]: ProductState;
}

export const productAdapter: EntityAdapter<Product_draft> = createEntityAdapter<
  Product_draft
>();

export const initialProductState: ProductState = productAdapter.getInitialState(
  {
    // set initial required properties
    selectedId: null,
    selectedProducts: [],
    loaded: false,
    error: null,
  }
);

const productReducer = createReducer(
  initialProductState,

  on(ProductActions.setProductsState, (state, { products }) =>
    productAdapter.setAll(products, { ...state, loaded: true })
  ),
  on(ProductActions.clearProducts, (state) =>
    productAdapter.setAll([], { ...state, loaded: true })
  ),
  on(ProductActions.addGlassSuccess, (state, action) =>
    productAdapter.addOne<ProductState>(action.glass, state)
  ),
  on(ProductActions.editGlassSuccess, (state, action) =>
    productAdapter.upsertMany<ProductState>(action.products, state)
  ),
  on(ProductActions.addManyGlassesSuccess, (state, action) =>
    productAdapter.addMany<ProductState>(action.glasses, state)
  ),
  on(ProductActions.addManyServicesSuccess, (state, action) =>
    productAdapter.addMany<ProductState>(action.services, state)
  ),
  on(ProductActions.addAccessorySuccess, (state, action) =>
    productAdapter.addOne<ProductState>(action.accessory, state)
  ),
  on(ProductActions.addServiceSuccess, (state, action) =>
    productAdapter.addOne<ProductState>(action.service, state)
  ),

  on(ProductActions.removeProductsSuccess, (state, action) =>
    productAdapter.removeMany<ProductState>(action.ids, state)
  ),
  on(ProductActions.selectManyGlasses, (state, action) => ({
    ...state,
    selectedGlasses: action.glasses,
    dimensions: roundDimensions(action.glasses),
    error: null,
  })),
  on(ProductActions.clearSelectedGlasses, (state, action) => ({
    ...state,
    selectedGlasses: [],
    error: null,
  })),
  on(ProductActions.addReparationProductsSuccess, (state, action) =>
    productAdapter.addMany<ProductState>(action.item, state)
  ),
  on(
    ProductActions.loadProductsFailure,
    ProductActions.addGlassFailure,
    ProductActions.addAccessoryFailure,
    ProductActions.addServiceFailure,
    ProductActions.removeProductsFailure,
    ProductActions.addManyGlassesFailure,
    ProductActions.addManyServicesFailure,
    ProductActions.editGlassFailure,
    ProductActions.addReparationProductsFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  )
);

export function reducerProduct(
  state: ProductState | undefined,
  action: Action
) {
  return productReducer(state, action);
}
