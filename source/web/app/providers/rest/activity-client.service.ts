import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class ActivityClientService {
  baseUrl: String;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    if (this.cookieService.get(environment.API_URL)) {
      this.baseUrl = this.cookieService.get(environment.API_URL) + environment.activityBasePath;
    } else {
      this.baseUrl = environment.baseUrl + environment.activityBasePath;
    }
  }

  getActivity(ActivityId: String) {
    return this.http.get<any>(`${this.baseUrl}/${ActivityId}`);
  }
}
