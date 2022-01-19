import { EditGlassDB, EditGlassUI } from '../../models';

export function EditGlassAdapter(product: EditGlassUI) {
  let { services, oldGlass, ...glass } = product;
  let newM2 = parseFloat((glass.count * glass.heigth * glass.width).toFixed(2));
  let newMl = parseFloat(
    (glass.count * (glass.heigth + glass.width) * 2).toFixed(2)
  );
  let { glass_draft, ...infoGlass } = oldGlass;
  let newglass = {
    ...infoGlass,
    ...glass,
    m2: newM2,
    ml: newMl,
    quantity: newM2,
    total_price: parseFloat((newM2 * glass.price).toFixed(2)),
  };

  let newServices = services
    .map((elem) => {
      let service;
      let {
        glass_draft,
        service_draft,
        consumable_draft,
        dependent_id,
        ...oldService
      } = elem;
      switch (elem.quantity) {
        case oldGlass.m2:
          service = {
            ...oldService,
            quantity: newM2,
          };
          break;
        case oldGlass.ml:
          service = {
            ...oldService,
            quantity: newMl,
          };
          break;
        default:
          break;
      }
      return service;
    })
    .filter((obj) => !!obj);

  return [newglass, ...newServices];
}
