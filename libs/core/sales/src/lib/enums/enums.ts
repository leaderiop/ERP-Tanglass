export enum DeliveryStatus {
  INVOICED = 'Facturé',
  NOT_INVOICED = 'Non Facturé'
}


export enum OrderDeliveryStatus {
  DELIVERED = "livré",
  NOT_DELIVERED = "non livré",
  PARTIAL_DELIVERED = "partiellement livré"
}

export enum PaymentMethod {
  CHECK = 'Chèque',
  CASH = 'Espèce',
  TRANSFER = 'Virement',
  INSTRUMENT='Effet'
}


export enum OrderPaymentStatus {
  PAID = "payé",
  PARTIALLY = "partiellement payé",
  UNPAID = "non payé"
}
