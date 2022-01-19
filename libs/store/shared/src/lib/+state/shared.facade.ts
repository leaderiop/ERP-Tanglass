import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import * as ShortWarehouseSelectors from './warehouse/short-warehouse.selectors';
import * as ShortWarehouseActions from './warehouse/short-warehouse.actions';
import * as ShortCompanySelectors from './company/short-company.selectors';
import * as ShortCompaniesActions from './company/short-company.actions';
import * as ShortProductSelectors from './product/short-product.selectors';
import * as ShortProductsActions from './product/short-product.actions';
import * as ShortProviderActions from './provider/short-provider.actions';
import * as ClientOrdersActions from './orders-client/orders-client.actions';
import * as ShortProviderSelectors from './provider/short-provider.selectors';
import * as ShortEmployeesActions from './employees/employees.actions';
import * as ShortEmployeesSelectors from './employees/employees.selectors';
import * as OrdersSalepointActions from './orders-salepoint/orders-salepoint.actions';
import * as OrdersSalepointSelectors from './orders-salepoint/orders-salepoint.selectors';
import * as ShortSalePointActions from './salePoint/short-salePoint.actions';
import * as ShortSalePointSelectors from './salePoint/short-salePoint.selectors';
import * as WarehouseAccessoryActions from './warehouse-substance/warehouse-accessory.actions';
import * as WarehouseAccessorySelectors from './warehouse-substance/warehouse-accessory.selectors';
import * as WarehouseGlassActions from './warehouse-substance/warehouse-glass.actions';
import * as WarehouseGlassSelectors from './warehouse-substance/warehouse-glass.selectors';
import * as ClientOrdersSelectors from './orders-client/orders-client.selectors';
import { AuthFacadeService } from '@tanglass-erp/store/app';
import { ROLES } from '@tanglass-erp/store/app';
import {
  PartialPOS,
  ShortWarehouse,
  UserProfile,
} from '@tanglass-erp/core/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SharedFacade {
  allShortEmployees$ = this.store.pipe(
    select(ShortEmployeesSelectors.getAllEmployees)
  );

  getAllClientOrders$ = this.store.pipe(
    select(ClientOrdersSelectors.getAllCLientOrders)
  );

  allOrdersSalepoint$ = this.store.pipe(
    select(OrdersSalepointSelectors.getAllOrdersSalepoint)
  );

  allShortCompany$ = this.store.pipe(
    select(ShortCompanySelectors.getAllShortCompany)
  );
  selectedShortCompany$ = this.store.pipe(
    select(ShortCompanySelectors.getSelected)
  );
  allShortProduct$ = this.store.pipe(
    select(ShortProductSelectors.getAllShortProduct)
  );
  selectedShortProduct$ = this.store.pipe(
    select(ShortProductSelectors.getSelected)
  );
  allShortProvider$ = this.store.pipe(
    select(ShortProviderSelectors.getAllShortProvider)
  );
  selectedShortProvider$ = this.store.pipe(
    select(ShortProviderSelectors.getSelected)
  );
  allShortSalePoint$ = this.store.pipe(
    select(ShortSalePointSelectors.getAllShortSalePoint)
  );
  selectedShortSalePoint$ = this.store.pipe(
    select(ShortSalePointSelectors.getSelected)
  );
  allShortWarehouse$ = this.store.pipe(
    select(ShortWarehouseSelectors.getAllShortWarehouse)
  );
  selectedShortWarehouse$ = this.store.pipe(
    select(ShortWarehouseSelectors.getSelected)
  );
  allWarehouseAccessory$ = this.store.pipe(
    select(WarehouseAccessorySelectors.getAllWarehouseAccessory)
  );
  selectedWarehouseAccessory$ = this.store.pipe(
    select(WarehouseAccessorySelectors.getSelected)
  );
  allWarehouseGlass$ = this.store.pipe(
    select(WarehouseGlassSelectors.getAllWarehouseGlass)
  );
  selectedWarehouseGlass$ = this.store.pipe(
    select(WarehouseGlassSelectors.getSelected)
  );
  constructor(private store: Store) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
  loadAllOrdersSalepoint(salepoint_id: string) {
    this.dispatch(OrdersSalepointActions.loadOrdersSalepoint({ salepoint_id }));
  }
  loadAllShortCompanies() {
    this.dispatch(ShortCompaniesActions.loadShortCompany());
  }
  loadAllEmployees() {
    this.dispatch(ShortEmployeesActions.loadEmployees());
  }
  loadAllShortProduct() {
    this.dispatch(ShortProductsActions.loadShortProduct());
  }
  loadAllShortProvider() {
    this.dispatch(ShortProviderActions.loadShortProvider());
  }

  loadAllShortSalePoint(ids?: string[]) {
    this.dispatch(ShortSalePointActions.loadShortSalePoint({ ids }));
  }
  loadAllShortWarehouses() {
    this.dispatch(ShortWarehouseActions.loadShortWarehouse());
  }
  loadAllWarehouseAccessories(warehouseID: string) {
    this.dispatch(
      WarehouseAccessoryActions.loadWarehouseAccessory({ id: warehouseID })
    );
  }
  loadAllWarehouseGlasses(warehouseID: string) {
    this.dispatch(
      WarehouseGlassActions.loadWarehouseGlasses({ id: warehouseID })
    );
  }

  loadClientOrders(clientId: string) {
    this.dispatch(ClientOrdersActions.loadClientOrders({ client: clientId }));
  }
  getSalesPointAsPerUserRole(user: UserProfile): Observable<PartialPOS[]> {
    if (user.role == ROLES.admin || user.role == ROLES.comptable) {
      return this.allShortSalePoint$;
    }
    if (
      user.role == ROLES.commercial ||
      user.role == ROLES.responsable_pv ||
      user.role == ROLES.magazinier
    ) {
      return this.getPricipalePos().pipe(
        map((accessiblePOS) => [user.SalesPoint, ...accessiblePOS])
      );
    }
    return;
  }
  getWarehousesAsPerUserRole(user: UserProfile): Observable<ShortWarehouse[]> {
    if (user.role == ROLES.admin || user.role == ROLES.comptable) {
      return this.allShortWarehouse$;
    }
    if (
      user.role == ROLES.commercial ||
      user.role == ROLES.responsable_pv ||
      user.role == ROLES.magazinier
    ) {
      return this.getPricipaleWarehouses().pipe(
        map((warehouses) => {
          return [...user?.SalesPoint?.warehouses, ...warehouses];
        })
      );
    }
    return;
  }

  getPricipalePos(): Observable<PartialPOS[]> {
    return this.allShortSalePoint$.pipe(
      map((Pos) => {
        return Pos.filter((salePoint) => salePoint.isPrincipale == true);
      })
    );
  }

  getPricipaleWarehouses(): Observable<ShortWarehouse[]> {
    return this.getPricipalePos().pipe(
      map((Pos) => {
        let warehouses: ShortWarehouse[];
        Pos.map((salePoint) => (warehouses = [...salePoint.warehouses]));
        return warehouses;
      })
    );
  }
}
