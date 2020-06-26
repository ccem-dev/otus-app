import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {BaseUrlResolveService} from "../base-url-resolve.service";

@Injectable({
  providedIn: 'root'
})
export class EventClientService {

  constructor(private http: HttpClient, private baseUrl:BaseUrlResolveService) {

  }

  getEvents(OwnerRn: String) {
    return this.http.get<any>(`${this.baseUrl.getBaseUrl()}${environment.followUpBasePath}${environment.getEvents}/${OwnerRn}`);
  }

  accomplishEvent(EventId: String) {
    return this.http.put<any>(`${this.baseUrl.getBaseUrl()}${environment.followUpBasePath}${environment.accomplishEvent}/${EventId}`,{});
  }
}
