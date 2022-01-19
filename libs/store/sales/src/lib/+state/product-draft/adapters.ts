import { Product_draft } from '@tanglass-erp/core/sales';
import { Product } from './products-draft.models';

export function groupeByCode(data: Product[]): Product[] {
  return data
    .map((item) =>
      data
        .filter((value) => item.product_code === value.product_code)
        .reduce(function (accumulator, product: Product) {
          data = data.filter((val) => item.product_code !== val.product_code);
          return {
            ...product,
            quantity: product.quantity + accumulator.quantity,
            total_price: product.total_price + accumulator.total_price,
            m2: product.m2 + accumulator.total_price,
            ml: product.ml + accumulator.ml,
          };
        }, new Product())
    )
    .filter((row) => row.product_code)
    .map((product) => ({
      ...product,
      quantity: parseFloat(product.quantity.toFixed(2)),
      total_price: parseFloat(product.total_price.toFixed(2)),
      m2: parseFloat(product.m2.toFixed(2)),
      ml: parseFloat(product.ml.toFixed(2)),
    }));
}

export function roundDimensions(glasses: Product_draft[]) {
  var dimensions = glasses.reduce(
    function (acc, val) {
      return {
        selectedM2: acc.selectedM2 + val.m2,
        selectedML: acc.selectedML + val.ml,
      };
    },
    { selectedM2: 0, selectedML: 0 }
  );
  dimensions.selectedM2 = parseFloat(dimensions.selectedM2.toFixed(2));
  dimensions.selectedML = parseFloat(dimensions.selectedML.toFixed(2));
  return dimensions;
}
