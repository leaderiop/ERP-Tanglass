
export function productAdapter(product) {
    if (product.service_draft) {
      return {
        ...product,
        dependent_id: product.service_draft.dependent_id,
      };
    } else if (product.consumable_draft) {
      return {
        ...product,
        dependent_id: product.consumable_draft.dependent_id,
      };
    } else return product;
  }