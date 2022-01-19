import { Sales_Product_Type_Enum } from '@tanglass-erp/core/sales';
import {
  JobProduct,
  JobOrder,
  ManufacturingLine,
  ManufacturingState,
  TaskState,
} from '@tanglass-erp/core/manufacturing';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
export function JobOrderGlassesAdapter(glasses: JobProduct[]) {
  let result = glasses.map((glass) => ({
    ...glass,
    manufacturing_lines: glass.manufacturing_lines?.map((line) => ({
      ...line,
      services: [
        ...(line?.manufacturing_services ?? []).map((service) => ({
          ...service,
          isReady: true,
          type: Sales_Product_Type_Enum.Service,
        })),
        ...(line?.manufacturing_consumables ?? []).map((consumable) => ({
          ...consumable,
          isReady: true,
          type: Sales_Product_Type_Enum.Consommable,
        })),
        ...glass.service_drafts
          .filter((service) => {
            let services = line?.manufacturing_services?.map((data) => data.id);
            return !services?.includes(service.id);
          })
          .map((service) => ({
            id: service.id,
            labelFactory: service.labelFactory,
            isReady: false,
            type: Sales_Product_Type_Enum.Service,
          })),
        ...glass.consumable_drafts
          .filter((service) => {
            let services = line?.manufacturing_consumables?.map(
              (data) => data.id
            );
            return !services?.includes(service.id);
          })
          .map((consumable) => ({
            id: consumable.id,
            labelFactory: consumable.labelFactory,
            isReady: false,
            type: Sales_Product_Type_Enum.Consommable,
          })),
      ],
    })),
  }));

  return result;
}

export function ProductionLinesAdapter(
  manufacturingLines: ManufacturingLine[]
) {
  let services = [];
  let consumables = [];
  manufacturingLines.map((line) => {
    line.services.map((task) => {
      task.isReady
        ? task.type == Sales_Product_Type_Enum.Service
          ? services.push({
              manufacturing_line_id: line.id,
              service_draft_id: task.id,
            })
          : consumables.push({
              manufacturing_line_id: line.id,
              consumable_draft_id: task.id,
            })
        : null;
    });
  });
  let glass_id = manufacturingLines[0].glass_id;
  return { services, consumables, glass_id };
}

export function GlassesUpdating(
  glasses: JobProduct[],
  selectedGlass: JobProduct,
  lines: ManufacturingState
): JobProduct[] {
  let glassIndex = glasses.findIndex((glass) => glass.id == selectedGlass.id);

  let services = groupBy('manufacturing_line_id', lines.services);
  let consumables = groupBy('manufacturing_line_id', lines.consumables);
  let newlines = glasses[glassIndex].manufacturing_lines?.map((line) => ({
    ...line,
    manufacturing_services: services[line.id]?.map((data) => ({
      id: data.service_draft_id,
      labelFactory: data.labelFactory,
    })),
    manufacturing_consumables: consumables[line.id]?.map((data) => ({
      id: data.consumable_draft_id,
      labelFactory: data.labelFactory,
    })),
  }));
  let newGlasses: JobProduct[] = JSON.parse(JSON.stringify(glasses));
  newGlasses[glassIndex].manufacturing_lines = newlines;
  return JobOrderGlassesAdapter(newGlasses);
}

export function selectedJobOrderAdapter(
  selectedJobOrder: Observable<JobOrder>
) {
  return selectedJobOrder.pipe(
    map((jobOrder) => {
      return {
        ...jobOrder,
        items: jobOrder?.glass_drafts?.map((item) => {
          return {
            id: item.id,
            item: (
              item.product_draft.label +
              ' :  ' +
              item.service_drafts.reduce(
                (accumulator, product) =>
                  product.labelFactory + ' + ' + accumulator,
                ''
              ) +
              item.consumable_drafts.reduce(
                (accumulator, product) =>
                  product.labelFactory + ' + ' + accumulator,
                ''
              )
            ).slice(0, -2),
            count: item.product_draft.count,
            dimensions:
              item.product_draft.heigth + ' X ' + item.product_draft.width,
          };
        }),
      };
    })
  );
}

function groupBy(
  key: string,
  array: TaskState[]
): { [key: string]: TaskState[] } {
  return array.reduce(
    (objectsByKeyValue, obj) => ({
      ...objectsByKeyValue,
      [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj),
    }),
    {}
  );
}
