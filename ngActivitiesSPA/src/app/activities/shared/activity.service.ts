import { IActivity } from './activity.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  sleep = timer(1000);
  private baseActivityUrl = environment.apiUrl + 'activities';

  constructor(private http: HttpClient) {}

  // addDelay(request: Observable<IActivity[] | IActivity | {}>): Observable<IActivity[] | IActivity | {}> {
  //   return this.sleep.pipe(
  //     concatMap(() => request)
  //   );
  // }

  getAll(): Observable<IActivity[]> {
    return this.sleep.pipe(
      concatMap(() => this.http.get<IActivity[]>(this.baseActivityUrl))
    );
  }

  getById(id: string): Observable<IActivity> {
    return this.sleep.pipe(
      concatMap(() => this.http.get<IActivity>(`${this.baseActivityUrl}/${id}`))
    );
  }

  create(activity: IActivity): Observable<IActivity> {
    return this.sleep.pipe(
      concatMap(() => this.http.post<IActivity>(this.baseActivityUrl, activity))
    );
  }

  update(activity: IActivity): Observable<IActivity> {
    return this.sleep.pipe(
      concatMap(() =>
        this.http.put<IActivity>(
          `${this.baseActivityUrl}/${activity.id}`,
          activity
        )
      )
    );
  }

  delete(id: string): Observable<{}> {
    return this.sleep.pipe(
      concatMap(() => this.http.delete(`${this.baseActivityUrl}/${id}`))
    );
  }
}
