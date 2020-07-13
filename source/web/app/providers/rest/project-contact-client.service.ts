import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';
import {ProjectContact} from '../../model/contact/project-contact';
import {Message} from '../../model/contact/message/message';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BaseUrlResolveService} from './base-url-resolve.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectContactClientService {
  constructor(
    private http: HttpClient, private baseUrl:BaseUrlResolveService
  ) {}

  getIssues(resource): Observable<ProjectContact[]> {
    return this.http.get<ProjectContact[]>(`${this.baseUrl.getBaseUrl()}${environment.projectComunication}/${resource}`)
      .pipe(map(({ data }: any) => data));
  }

  createIssue(resource, projectContact) {
    return this.http.post<ProjectContact>(`${this.baseUrl.getBaseUrl()}${environment.projectComunication}/${resource}`, projectContact);
  }

  getMessages(resource) {
    return this.http.get<any>(`${this.baseUrl.getBaseUrl()}${environment.projectComunication}/${resource}`)
      .pipe(map(messages => messages['data']));
  }

  getLastMessage(resource) {
    return this.http.get<any>(`${this.baseUrl.getBaseUrl()}${environment.projectComunication}/${resource}`);
  }

  createMessage(resource, message) {
    return this.http.post<Message>(`${this.baseUrl.getBaseUrl()}${environment.projectComunication}/${resource}`, message);
  }

  getSender(resource) {
    return this.http.get<any>(`${this.baseUrl.getBaseUrl()}${environment.projectComunication}/${resource}`)
      .pipe(map(({ data }: any) => data));
  }
}
