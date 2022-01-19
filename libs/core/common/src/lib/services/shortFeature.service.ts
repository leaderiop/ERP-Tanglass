import { Injectable } from '@angular/core';
import { flattenObj } from '../utils/flatteningAdapter';
import {
  GeShortSalePointsGQL,
  GetAccessoriesSubstancesGQL,
  GetGlassesSubstancesGQL,
  GetOrdersBySalepointGQL,
  GetProductsGQL,
  GetShortCompaniesGQL,
  GetShortEmployeesGQL,
  GetShortProvidersGQL,
  GetShortSubstancesGQL,
  GetShortWArehousesGQL,
  GetClientOrdersGQL,
} from '@tanglass-erp/infrastructure/graphql';
import { map } from 'rxjs/operators';
import { ShortSubstance, Substance } from '../models/substance';

@Injectable({
  providedIn: 'root',
})
export class ShortFeatureService {
  constructor(
    private getShortCompaniesGQL: GetShortCompaniesGQL,
    private getShortSalePointsGQL: GeShortSalePointsGQL,
    private getShortWArehousesGQL: GetShortWArehousesGQL,
    private getProductsGQL: GetProductsGQL,
    private getAccessoriesSubstancesGQL: GetAccessoriesSubstancesGQL,
    private getGlassesSubstancesGQL: GetGlassesSubstancesGQL,
    private getShortSubstancesGQL: GetShortSubstancesGQL,
    private getShortProvidersGQL: GetShortProvidersGQL,
    private getOrdersBySalepointGQL: GetOrdersBySalepointGQL,
    private getShortEmployeesGQL: GetShortEmployeesGQL,
    private getClientOrdersGQL: GetClientOrdersGQL
  ) {}

  getClientOrders(client: string) {
    return this.getClientOrdersGQL.watch({ client }).valueChanges;
  }

  getAllOrdersBySalepoint(salepoint_id: string) {
    return this.getOrdersBySalepointGQL.fetch({ salepoint_id });
  }

  getAllCompanies() {
    return this.getShortCompaniesGQL.watch().valueChanges;
  }

  getAllEmployees() {
    return this.getShortEmployeesGQL.fetch();
  }

  getAllSalePoints(ids?: string[]) {
    return this.getShortSalePointsGQL.watch({ ids: ids ? { _in: ids } : {} })
      .valueChanges;
  }

  getAllWarehouses() {
    return this.getShortWArehousesGQL.watch().valueChanges;
  }
  getProducts() {
    return this.getProductsGQL.watch().valueChanges;
  }
  getAccessoriesSubstances(id: string) {
    return this.getAccessoriesSubstancesGQL
      .fetch({ id })
      .pipe(
        map((data) =>
          data.data.stock_warehouse_substance.map(
            (obj) => flattenObj(obj) as Substance
          )
        )
      );
  }

  getShortSubstance() {
    return this.getShortSubstancesGQL
      .watch()
      .valueChanges.pipe(
        map((data) =>
          data.data.product_product.map(
            (obj) => flattenObj(obj) as ShortSubstance
          )
        )
      );
  }

  getGlassesSubstances(id: string) {
    return this.getGlassesSubstancesGQL
      .fetch({ id })
      .pipe(
        map((data) =>
          data.data.stock_warehouse_substance.map(
            (obj) => flattenObj(obj) as Substance
          )
        )
      );
  }

  getShortProviders() {
    return this.getShortProvidersGQL.watch().valueChanges;
  }
}
