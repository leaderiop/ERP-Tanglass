import { Injectable } from '@angular/core';
import {
  GenerateBarCodesGQL,
  GetAllJobsOrdersGQL,
  GetJobOrderByIdGQL,
  InsertJobOrderGQL,
  UpdateManufacturingProgressGQL,
} from '@tanglass-erp/infrastructure/graphql';
import {
  InsertedJobOrder,
  InsertedManufacturingLine,
  InsertedManufacturingState,
  ManufacturingLine,
} from '@tanglass-erp/core/manufacturing';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobOrderService {
  constructor(
    private getAllJobOrdersGQL: GetAllJobsOrdersGQL,
    private InsertJobOrderGQL: InsertJobOrderGQL,
    private getJobOrderByIdGQL: GetJobOrderByIdGQL,
    private GenerateBarCodesGQL: GenerateBarCodesGQL,
    private updateManufacturingProgress: UpdateManufacturingProgressGQL
  ) {}

  getAll() {
    return this.getAllJobOrdersGQL.watch().valueChanges;
  }
  insertOne(jobOrder: InsertedJobOrder) {
    return this.InsertJobOrderGQL.mutate(jobOrder);
  }

  getOneById(id: number) {
    return this.getJobOrderByIdGQL.fetch({ id });
  }

  generateManufacturingLines(
    linesParams: InsertedManufacturingLine[]
  ): Observable<ManufacturingLine[]> {
    let lines = [];
    linesParams.map((e) => {
      for (let i = 0; i < e.count; i++) {
        lines.push({
          glass_id: e.glass_id,
        });
      }
    });
    return this.GenerateBarCodesGQL.mutate({ objects: lines }).pipe(
      map((data) =>
        data.data.insert_manufacturing_manufacturing_line.returning.map(
          (line) => ({
            ...line,
            manufacturing_services: line.manufacturing_services.map((data) => ({
              labelFactory: data.service_draft.labelFactory,
              id: data.service_draft.id,
            })),
            manufacturing_consumables: line.manufacturing_consumables.map(
              (data) => ({
                labelFactory: data.consumable_draft.labelFactory,
                id: data.consumable_draft.id,
              })
            ),
          })
        )
      )
    );
  }

  updateManufacturingState(obj: InsertedManufacturingState) {
    let response = this.updateManufacturingProgress.mutate(obj).pipe(
      map((data) => ({
        services: data.data.insert_manufacturing_manufacturing_service.returning.map(
          (service) => ({
            manufacturing_line_id: service.manufacturing_line_id,
            service_draft_id: service.service_draft_id,
            line_status: service.manufacturing_line.status,
            labelFactory: service.service_draft.labelFactory,
          })
        ),
        consumables: data.data.insert_manufacturing_manufacturing_consumable.returning.map(
          (consumable) => ({
            manufacturing_line_id: consumable.manufacturing_line_id,
            consumable_draft_id: consumable.consumable_draft_id,
            line_status: consumable.manufacturing_line.status,
            labelFactory: consumable.consumable_draft.labelFactory,
          })
        ),
      }))
    );
    return response;
  }
}
