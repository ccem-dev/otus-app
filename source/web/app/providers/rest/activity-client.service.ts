import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BaseUrlResolveService} from "./base-url-resolve.service";

@Injectable({
  providedIn: 'root'
})

export class ActivityClientService {

  constructor(private http: HttpClient, private baseUrl:BaseUrlResolveService) {
  }

  getActivity(ActivityId: String) {
    return this.http.get<any>(`${this.baseUrl.getBaseUrl()}${environment.activityBasePath}$/${ActivityId}`);
  }
}
