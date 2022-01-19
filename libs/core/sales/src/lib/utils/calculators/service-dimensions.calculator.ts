import { InsertedService } from '../../models';
export function calculateServicesDimensions(createdItems: InsertedService) {
  let items = [];
  let { glasses, ...service } = createdItems;
  const GlassesTotalDimension = glasses.reduce(
    function (acc, val) {
      return {
        M2: acc.M2 + val.m2,
        ML: acc.ML + val.ml,
      };
    },
    { M2: 0, ML: 0 }
  );
  switch (createdItems.quantity) {
    case GlassesTotalDimension.M2:
      glasses.map((glass) => {
        items?.push({
          ...service,
          dependent_id: glass.glass_draft.id,
          quantity: glass.m2,
          total_price: parseFloat((glass.m2 * service.price).toFixed(2)),
        });
      });
      break;
    case GlassesTotalDimension.ML:
      glasses.map((glass) => {
        items?.push({
          ...service,
          dependent_id: glass.glass_draft.id,
          quantity: glass.ml,
          total_price: parseFloat((glass.ml * service.price).toFixed(2)),
        });
      });
      break;
    default:
      glasses.map((glass) => {
        items?.push({
          ...service,
          dependent_id: glass.glass_draft.id,
          quantity: service.quantity,
          total_price: parseFloat(
            (service.quantity * service.price).toFixed(2)
          ),
        });
      });
      break;
  }
  return items.map((product) => {
    let { dependent_id, labelFactory, ...data } = product;
    return {
      dependent_id: product?.dependent_id,
      labelFactory: product?.labelFactory,
      product_draft: { data },
    };
  });
}
