import { DataSource } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { BehaviorSubject, merge, Observable, of as observableOf } from 'rxjs';


export class TableDataSource<T> extends DataSource<T> {
  private _dataStream = new BehaviorSubject<T[]>( [] );
  private columnsToCompare;
  public set data(v: T[]) { this._dataStream.next(v); }
  public get data(): T[] { return this._dataStream.value; }
  sort: MatSort;

  constructor(columnsToCompare:Array<any>) {
    super();
    this.columnsToCompare = columnsToCompare;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<T[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.data;
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: T[]) {
    // console.log(this.sort.direction);
    // console.log(this.sort.active);
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {

      const isAsc = this.sort.direction === 'asc';
      if (this.columnsToCompare.include(this.sort.active))
        return compare(a[this.sort.active], b[this.sort.active], isAsc);
      return 0;
      // switch (this.sort.active) {
      //   case this.columnsToCompare[0]: return compare(a.name, b.name, isAsc);
      //   case 'id': return compare(+a.id, +b.id, isAsc);
      //   default: return 0;
      // }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
