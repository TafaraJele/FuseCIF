import { Injectable } from '@angular/core';
import { Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'app/mock-api/store';
import { Observable, of } from 'rxjs';
import { filter, finalize, first, tap } from 'rxjs/operators';
import { loadFiles } from '../store/actions/files.actions';
import { areFilesLoaded } from '../store/selectors/files.selector'

@Injectable({
  providedIn: 'root'
})
export class FilesResolver implements Resolve<any> {
  loading = false
  constructor(private store: Store<AppState>) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, ): Observable<any> {
    return this.store.pipe(
      select(areFilesLoaded),
      tap(filesLoaded => {
        if (!this.loading && !filesLoaded) {
          this.loading = true
          this.store.dispatch(loadFiles())
        }
      }),
      filter(() => true),
      first(),
      finalize(() => {
        this.loading = false
      }),
    )
  }
}
