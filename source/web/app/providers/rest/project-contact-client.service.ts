import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';
import {ProjectContact} from '../../model/contact/project-contact';

const mockUrl = 'http://localhost:3077';

@Injectable({
  providedIn: 'root'
})
export class ProjectContactClientService {
  baseUrl: string;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    if (this.cookieService.get(environment.API_URL)) {
      this.baseUrl = this.cookieService.get(environment.API_URL) + environment.projectComunication;
    } else {
      this.baseUrl = environment.baseUrl + environment.projectComunication;
    }
    this.baseUrl = mockUrl
  }

  getIssues(resource) {
    return this.http.get<ProjectContact[]>(`${this.baseUrl}/${resource}`);
  }

  createIssue(resource, projectContact) {
    return this.http.post<ProjectContact>(`${this.baseUrl}/${resource}`, projectContact);
  }

  getMessages() {

  }

  getLastMessage() {

  }

  createMessage() {

  }

}
