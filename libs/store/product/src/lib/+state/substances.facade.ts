import { Injectable } from '@angular/core';

import { Action, select, Store } from '@ngrx/store';

import * as fromSubstances from '../reducers/substances.reducer';
import * as SubstancesSelectors from '../selectors/substances.selectors';
import * as SubstanceActions from '../actions/substances.actions';

@Injectable()
export class SubstancesFacade {
  loaded$ = this.store.pipe(select(SubstancesSelectors.getSubstancesLoaded));
  allSubstances$ = this.store.pipe(
    select(SubstancesSelectors.getAllSubstances)
  );
  selectedSubstances$ = this.store.pipe(
    select(SubstancesSelectors.getSelected)
  );

  constructor(private store: Store<fromSubstances.SubstancesPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
  loadAllSubstances(){
    this.dispatch(SubstanceActions.loadSubstances());
  }
}
