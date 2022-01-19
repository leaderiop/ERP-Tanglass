 export class OrderPrint {
  client_id:string='0001';
  client_name:string='INOXI';
  client_address:string='address';
  client_phone:string='3516545456';
  order_id:string='0001';
  order_date:string='10/10/10';
  processedMaterial:Processed_Material[] =[new Processed_Material()];
  salesData:SaleData[]=[new SaleData()];
  total_Amount:Companie_Amount=new Companie_Amount();
  companiesAmounts:Companie_Amount[]=[new Companie_Amount()];
  }

  export class  Companie_Amount{
  companie_name:string='Tanglass';
  total_HT: number=0;
  tva: number=0;
  discount: number=0;
  total_TTC: number=0;
  total_Net:number=0;
  }
  export class Processed_Material{
    code:string='VC3';
    NumberOf_pieces:number=0;
    width:number=0;
    height:number=0;
    m2:number=0;
    ml:number=0;
  }
  export class SaleData{
    item_designation:string='VERRE CLAIR 3MM';
    quantity:number=1;
    unit_price:number=0;
    total_price:number=0;
  }


