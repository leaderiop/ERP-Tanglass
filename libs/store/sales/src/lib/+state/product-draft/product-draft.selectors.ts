import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PRODUCT_FEATURE_KEY, productAdapter, ProductState } from './product-draft.reducer';

// Lookup the 'Product' feature state managed by NgRx
export const getProductState = createFeatureSelector<
  ProductState
>(PRODUCT_FEATURE_KEY);

const { selectAll, selectEntities } = productAdapter.getSelectors();

export const getProductLoaded = createSelector(
  getProductState,
  (state: ProductState) => state.loaded
);

export const getProductError = createSelector(
  getProductState,
  (state: ProductState) => state.error
);

export const getAllProduct = createSelector(
  getProductState,
  (state: ProductState) => selectAll(state)
);

export const getProductEntities = createSelector(
  getProductState,
  (state: ProductState) => selectEntities(state)
);

export const getSelectedIdProduct = createSelector(
  getProductState,
  (state: ProductState) => state.selectedId
);
export const getSelectedProducts = createSelector(
  getProductState,
  (state: ProductState) => state.selectedProducts
);

export const getSelectedGlasses = createSelector(
  getProductState,
  (state: ProductState) => state.selectedGlasses
);

export const getDimensions = createSelector(
  getProductState,
  (state: ProductState) => state.dimensions
);
export const getSelectedProduct = createSelector(
  getProductEntities,
  getSelectedIdProduct,
  (entities, selectedId) => selectedId && entities[selectedId]
);
