import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';
import {ProjectContact} from '../../model/contact/project-contact';

@Injectable({
  providedIn: 'root'
})
export class ProjectContactClientService {
  baseUrl: string;
  issues: string;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    if(this.cookieService.get(environment.API_URL)) {
      this.baseUrl = this.cookieService.get(environment.API_URL) + environment.projectComunication;
    }else{
      this.baseUrl = environment.baseUrl + environment.projectComunication;
    }
  }

  getIssues(projectContacts: ProjectContact[]){
    this.issues = "";
    return this.http.get<any>(`${this.baseUrl}/${this.issues}`)
}

}
