import { Transfert, TransformedQuotation } from '../../models';
import { Sales_Product_Type_Enum } from '@tanglass-erp/infrastructure/graphql';

export function transfertQuotationAdapter(
  data: TransformedQuotation
): Transfert {
  let { quotation, ...order } = data;
  let glassesQuotaion = data.quotation.products.filter(
    (product) => product.glass_draft?.id
  );
  let servicesQuotation = data.quotation.products.filter(
    (product) =>
      product.dependent_id && product.type == Sales_Product_Type_Enum.Service
  );
  let consumablesQuotation = data.quotation.products.filter(
    (product) =>
      product.dependent_id &&
      product.type == Sales_Product_Type_Enum.Consommable
  );
  let glasses = glassesQuotaion.map((glass) => {
    let { id, consumable_draft, service_draft, glass_draft, ...data } = glass;
    let services = servicesQuotation.filter(
      (service) => service.dependent_id == glass_draft.id
    );
    let consumablesAsService = consumablesQuotation.filter(
      (consu) => consu.dependent_id == glass_draft.id
    );
    return {
      product_draft: {
        data: {
          ...data,
          type: data.type as Sales_Product_Type_Enum,
          draft_id: order.copierDraft_id,
        },
      },
      service_drafts: {
        data: services.map((data) => {
          const {
            id,
            service_draft,
            glass_draft,
            consumable_draft,
            dependent_id,
            ...service
          } = data;
          return {
            labelFactory: service_draft.labelFactory,
            product_draft: {
              data: {
                ...service,
                type: data.type as Sales_Product_Type_Enum,
                draft_id: order.copierDraft_id,
              },
            },
          };
        }),
      },
      consumable_drafts: {
        data: consumablesAsService.map((data) => {
          const {
            id,
            service_draft,
            glass_draft,
            consumable_draft,
            dependent_id,
            ...consumable
          } = data;
          return {
            labelFactory: consumable_draft.labelFactory,
            product_draft: {
              data: {
                ...consumable,
                type: data.type as Sales_Product_Type_Enum,
                draft_id: order.copierDraft_id,
              },
            },
          };
        }),
      },
    };
  });
  let consumablesDB = data.quotation.products.filter(
    (product) =>
      product.type == Sales_Product_Type_Enum.Consommable &&
      !product.dependent_id
  );
  let consumables = consumablesDB.map((data) => {
    const {
      id,
      service_draft,
      glass_draft,
      consumable_draft,
      dependent_id,
      ...consumable
    } = data;
    return {
      product_draft: {
        data: {
          ...consumable,
          draft_id: order.copierDraft_id,
          type: data.type as Sales_Product_Type_Enum,
        },
      },
    };
  });
  let accessoriesDB = data.quotation.products.filter(
    (product) => product.type == Sales_Product_Type_Enum.Accessoire
  );
  let accessories = accessoriesDB.map((data) => {
    const {
      id,
      service_draft,
      glass_draft,
      consumable_draft,
      dependent_id,
      ...accessory
    } = data;
    return {
      product_draft: {
        data: {
          ...accessory,
          draft_id: order.copierDraft_id,
          type: data.type as Sales_Product_Type_Enum,
        },
      },
    };
  });

  return {
    ...order,
    draft_id: quotation.draft_id,
    glasses,
    accessories,
    consumables,
  };
}

export function GlassesDependencies(products) {
  // let glasses = products.map((glass) => {
  //   let { id, consumable_draft, service_draft, glass_draft, ...data } = glass;
  //   let services = servicesQuotation.filter(
  //     (service) => service.dependent_id == glass_draft.id
  //   );
  //   let consumablesAsService = consumablesQuotation.filter(
  //     (consu) => consu.dependent_id == glass_draft.id
  //   );
  //   return {
  //     product_draft: {
  //       data: {
  //         ...data,
  //         type: data.type as Sales_Product_Type_Enum,
  //         draft_id: order.copierDraft_id,
  //       },
  //     },
  //     service_drafts: {
  //       data: services.map((data) => {
  //         const {
  //           id,
  //           service_draft,
  //           glass_draft,
  //           consumable_draft,
  //           dependent_id,
  //           ...service
  //         } = data;
  //         return {
  //           labelFactory: service_draft.labelFactory,
  //           product_draft: {
  //             data: {
  //               ...service,
  //               type: data.type as Sales_Product_Type_Enum,
  //               draft_id: order.copierDraft_id,
  //             },
  //           },
  //         };
  //       }),
  //     },
  //     consumable_drafts: {
  //       data: consumablesAsService.map((data) => {
  //         const {
  //           id,
  //           service_draft,
  //           glass_draft,
  //           consumable_draft,
  //           dependent_id,
  //           ...consumable
  //         } = data;
  //         return {
  //           labelFactory: consumable_draft.labelFactory,
  //           product_draft: {
  //             data: {
  //               ...consumable,
  //               type: data.type as Sales_Product_Type_Enum,
  //               draft_id: order.copierDraft_id,
  //             },
  //           },
  //         };
  //       }),
  //     },
  //   };
  // });
}
