import { flattenObj } from '@tanglass-erp/core/common';
import { GetAccessoryWarehousesByIdQuery, GetTransferOrderByIdQuery } from '@tanglass-erp/infrastructure/graphql';
import { SubstanceStocksDetails } from '../models/shared.models';


export function AdaptOrderedItems(obj) {
  return Object.assign({}, {
    fromwarehouse: obj.transfer_order.fromwarehouse.name,
    towarehouse: obj.transfer_order.towarehouse.name,
    id: obj.id,
    date: obj.transfer_order.date,
    deadline: obj.transfer_order.deadline,
    item: flattenObj(obj.substance),
    quantity: obj.quantity,
    status: obj.status
  })
}


export function AdaptSubstanceStockDetails(obj: GetAccessoryWarehousesByIdQuery): SubstanceStocksDetails {
  return {
    sum_quantity: obj.stock_warehouse_substance_aggregate.aggregate.sum.quantity,
    max_quantity: obj.stock_warehouse_substance_aggregate.aggregate.max.quantity,
    min_quantity: obj.stock_warehouse_substance_aggregate.aggregate.min.quantity,
    count: obj.stock_warehouse_substance_aggregate.aggregate.count,
    code: obj.stock_warehouse_substance_aggregate.nodes[0].substance.productAccessory.code,
    label: obj.stock_warehouse_substance_aggregate.nodes[0].substance.productAccessory.label,
    price: obj.stock_warehouse_substance_aggregate.nodes[0].substance.productAccessory.price,
    unit: obj.stock_warehouse_substance_aggregate.nodes[0].substance.productAccessory.unit,

    stocks: obj.stock_warehouse_substance_aggregate.nodes.map(o =>
      Object.assign({}, { quantity: o.quantity, name: o.warehouse.name, quantity_min: o.quantity_min }))
  }
}

export function AdaptTransferOrderDetails(obj: GetTransferOrderByIdQuery) {
  return {
    id:obj.stock_transfer_order_by_pk.id,
    date: obj.stock_transfer_order_by_pk.date,
    deadline: obj.stock_transfer_order_by_pk.deadline,
    createdAt: obj.stock_transfer_order_by_pk.createdAt,
    createdBy: obj.stock_transfer_order_by_pk.createdBy,
    updatedAt: obj.stock_transfer_order_by_pk.updatedAt,
    updatedBy: obj.stock_transfer_order_by_pk.updatedBy,
    status: obj.stock_transfer_order_by_pk.status,
    fromwarehouse:obj.stock_transfer_order_by_pk.fromwarehouse,
    towarehouse:obj.stock_transfer_order_by_pk.towarehouse,
    items_count: obj.stock_transfer_order_by_pk.order_items_aggregate.aggregate.count,
    items_sum: obj.stock_transfer_order_by_pk.order_items_aggregate.aggregate.sum.quantity,
    order_items: obj.stock_transfer_order_by_pk.order_items_aggregate.nodes.map(item =>
      Object.assign({},
        {
          id: item.id,
          quantity: item.quantity,
          status: item.status,
          substance: flattenObj(item.substance),
          total_deliveries: item.item_tranfers_aggregate.aggregate.sum.quantity,
          deliveries: item.item_tranfers_aggregate.nodes
        }))


  }
}

