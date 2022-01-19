import { InsertedGlass } from '../../models';
export function calculatePoductDimensions(items: InsertedGlass) {
  let glasses = [];
  items.dimensions.map((dimension) => {
    let { dimensions, ...glass } = items;
    glasses.push({
      product_draft: {
        data: {
          ...glass,
          count: dimension.count,
          heigth: dimension.heigth,
          width: dimension.width,
          quantity: parseFloat(
            (dimension.heigth * dimension.width * dimension.count).toFixed(2)
          ),
          m2: parseFloat(
            (dimension.heigth * dimension.width * dimension.count).toFixed(2)
          ),
          ml: parseFloat(
            (
              2 *
              (dimension.heigth + dimension.width) *
              dimension.count
            ).toFixed(2)
          ),
          total_price: parseFloat(
            (
              dimension.heigth *
              dimension.width *
              dimension.count *
              items.price
            ).toFixed(2)
          ),
        },
      },
    });
  });
  return glasses;
}
