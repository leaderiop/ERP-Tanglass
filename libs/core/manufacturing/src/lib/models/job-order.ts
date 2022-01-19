export interface JobOrder {
  id: number;
  date: Date;
  order_ref: string;
  ref?: string;
  status: string;
  glass_drafts?: JobProduct[];
}

export interface JobProduct {
  id: string;
  consumable_drafts?: Dependency[];
  service_drafts?: Dependency[];
  product_draft?: {
    type?: string;
    label?: string;
    count?: number;
    heigth?: number;
    width?: number;
    product_code: string;
  };
  manufacturing_lines?: ManufacturingLine[];
}

export interface Dependency {
  labelFactory?: string;
  id: string;
}

export interface InsertedJobOrder {
  order_ref: string;
  isReparing?: boolean;
  ids: { id: string }[];
}

export interface InsertedManufacturingLine {
  glass_id: string;
  count: number;
}

export interface ManufacturingLine {
  glass_id: string;
  id: number;
  status: string;
  ref?: string;
  manufacturing_services?: LineService[];
  manufacturing_consumables?: LineService[];
  services?: ManufacturungService[];
}

export interface LineService {
  id: string;
  labelFactory?: string;
}
export interface ManufacturungService {
  labelFactory?: string;
  isReady: boolean;
  id: string;
  type: string;
}

export interface InsertedManufacturingState {
  glass_id:string;
  services: TaskState[];
  consumables: TaskState[];
}

export interface ManufacturingState {
  services: TaskState[];
  consumables: TaskState[];
}


export interface TaskState {
  manufacturing_line_id: number;
  consumable_draft_id?: string;
  service_draft_id?: string;
  line_status?:string ;
  labelFactory?:string
}
