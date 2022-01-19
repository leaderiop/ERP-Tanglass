import { Adjustment, AdjustmentDB, DetailedSubstanceWarehouseDB } from '../models/adjustment.model';

export function AdaptStockAdjustment(obj: AdjustmentDB): Adjustment {
  return {
    ...obj,
    createdBy: obj?.userProfile?.username,
    role: obj?.userProfile?.role,
    product:
      obj.warehouse_substance.substance.productConsumable ??
      obj.warehouse_substance.substance.productAccessory ??
      obj.warehouse_substance.substance.productGlass,
    type: obj.warehouse_substance.substance.type,
    substanceid: obj.warehouse_substance.substance.id,
    warehouseid: obj.warehouse_substance.warehouse.id,
    warehouseName: obj.warehouse_substance.warehouse.name,
    companyName: obj.warehouse_substance.warehouse.company.name,
  };
}

export function AdaptInsertedStockAdjustment(
  obj: DetailedSubstanceWarehouseDB
): Adjustment {
  var adjustment = obj.stock_adjustments.pop();
  return {
    id: adjustment.id,
    ref: adjustment.ref,
    date: adjustment.date,
    newQuantity: adjustment.newQuantity,
    oldQuantity: adjustment.oldQuantity,
    reason: adjustment.reason,
    createdBy: adjustment.userProfile.username,
    role: adjustment.userProfile.role,
    product:
      obj.substance.productConsumable ??
      obj.substance.productGlass ??
      obj.substance.productAccessory,
    type: obj.substance.type,
    substanceid: obj.substance.id,
    warehouseid: obj.warehouse.id,
    warehouseName: obj.warehouse.name,
    companyName: obj.warehouse.company.name,
  };
}
