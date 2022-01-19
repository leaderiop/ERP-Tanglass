import { Product_draft, InsertedGlassDB, BasicGlass } from '../../models';
import { Sales_Product_Type_Enum } from '@tanglass-erp/infrastructure/graphql';

export function bisAdapter(products: Product_draft[]) {
  let item = products?.find((item) => {
    return (
      (item?.type == Sales_Product_Type_Enum.Verre ||
        item?.type == Sales_Product_Type_Enum.ArticleClient) &&
      !item?.isRepeated
    );
  });
  const {
    status,
    delivered,
    isLaunched,
    id,
    glass_draft,
    consumable_draft,
    service_draft,
    ...glassItem
  } = item;
  let glass = {
    ...glassItem,
    isRepeated: true,
    type: item?.type as Sales_Product_Type_Enum,
  };
  let services = products
    .filter((item) => item?.type == Sales_Product_Type_Enum.Service)
    ?.map((service) => {
      const {
        status,
        glass_draft,
        delivered,
        isLaunched,
        id,
        dependent_id,
        consumable_draft,
        service_draft,
        ...serviceItem
      } = service;
      return {
        labelFactory: service_draft?.labelFactory,
        product_draft: {
          data: {
            ...serviceItem,
            isRepeated: true,
            type: serviceItem?.type as Sales_Product_Type_Enum,
          },
        },
      };
    });

  let consumables = products
    .filter((item) => item?.type == Sales_Product_Type_Enum.Consommable)
    ?.map((consu) => {
      const {
        status,
        glass_draft,
        delivered,
        isLaunched,
        id,
        consumable_draft,
        service_draft,
        dependent_id,
        ...consuItem
      } = consu;
      return {
        labelFactory: consumable_draft?.labelFactory,
        product_draft: {
          data: {
            ...consuItem,
            isRepeated: true,
            type: consuItem?.type as Sales_Product_Type_Enum,
          },
        },
      };
    });

  let bisItem: InsertedGlassDB = {
    product_draft: { data: glass as BasicGlass },
    service_drafts: { data: services },
    consumable_drafts: { data: consumables },
  };
  return bisItem;
}
