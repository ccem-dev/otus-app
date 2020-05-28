import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ProjectContact} from '../../model/contact/project-contact';
import {HttpClient} from '@angular/common/http';

const url = 'http://localhost:3077/project-contact/';

@Injectable({providedIn: 'root'})
export class ProjectContactService {

  constructor(
    private http: HttpClient
  ) {
  };

  getProjectContacts(): Observable<ProjectContact[]> {
    return this.http.get<ProjectContact[]>(url);
  }

  createProjectContact(projectContact: ProjectContact): Observable<ProjectContact> {
    return this.http.post<ProjectContact>(url, projectContact);
  }

  createAnswer(answerItem: any) {
    console.log(answerItem);
  }


  getLastMessage(contact: ProjectContact): Observable<any> {
    return this.http.get<any>("http://localhost:3077/lastMessage");
  }

  getProjectContactMessages() : Observable<any>{
    return this.http.get<any>("http://localhost:3077/messages");
  }

  // createProjectContactMessage(ProjectContactMessage:any): Observable<any> {
  //   return null;
  // }


  addContactMessages(contact: ProjectContact, message: any) : void {
    contact.messages = []
    contact.messages.push(message)
  }
}




