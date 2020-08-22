import { IActivity } from './activity.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private baseActivityUrl = environment.apiUrl + 'activities';

  constructor(private http: HttpClient) {}

  getAll(): Observable<IActivity[]> {
    return this.http.get<IActivity[]>(this.baseActivityUrl);
  }

  getById(id: string): Observable<IActivity> {
    return this.http.get<IActivity>(`${this.baseActivityUrl}/${id}`);
  }

  create(activity: IActivity): Observable<IActivity> {
    return this.http.post<IActivity>(this.baseActivityUrl, activity);
  }

  update(activity: IActivity): Observable<IActivity> {
    return this.http.put<IActivity>(
      `${this.baseActivityUrl}/${activity.id}`,
      activity
    );
  }

  delete(id: string): Observable<{}> {
    return this.http.delete(`${this.baseActivityUrl}/${id}`);
  }
}
