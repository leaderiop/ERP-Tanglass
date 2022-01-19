import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class SearchService {
  public searchTerm: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public searchTerm$: Observable<string> = this.searchTerm.asObservable();

  constructor() {}
}
