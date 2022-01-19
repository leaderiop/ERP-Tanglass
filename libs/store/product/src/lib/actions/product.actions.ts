import { createAction, props } from '@ngrx/store';


/****************************************************************** */
/*****REMOVE MANY PRODUCTS ** */
/****************************************************************** */


export const removeManyProducts = createAction(
    '[List Products ] Delete Products',
    props<{ codes: string[] }>()
  );
  export const removeManyProductsSuccess = createAction(
    '[Products ] Delete Products Success',
    props<{codes: string[]   }>()
  );
  export const removeManyProductsFailure = createAction(
    '[Products ] Delete Products failure',
    props<{ error: any }>()
  );
