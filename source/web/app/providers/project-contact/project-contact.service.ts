import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ProjectContact} from '../../model/contact/project-contact';
import {HttpClient} from '@angular/common/http';

const url = 'http://localhost:3077/project-contact/';

@Injectable({providedIn: 'root'})
export class ProjectContactService {

  constructor(private http: HttpClient) {
  }

  getProjectContacts(): Observable<ProjectContact[]> {
    return this.http.get<ProjectContact[]>(url) ;
  }

  // getProjectContactMessages() : Observable<any>{
  //   return null;
  // }

  createProjectContact(projectContact: ProjectContact): Observable<ProjectContact>{
    console.log(projectContact);
    // this.Mock.projectContacts.push(projectContact);
    return new Observable<ProjectContact>();
  }

  // createProjectContactMessage(ProjectContactMessage:any): Observable<any> {
  //   return null;
  // }

}




