import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ProjectContact} from '../../model/contact/project-contact';
import {HttpClient} from '@angular/common/http';
import {Message} from '../../model/contact/message/message';

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

  createMessage(message: Message): Observable<any> {
    return this.http.post<Message>('http://localhost:3077/messages', message);
  }

  getLastMessage(contact: ProjectContact): Observable<any> {
    return this.http.get<any>('http://localhost:3077/messages');
  }

  getProjectContactMessages(): Observable<any> {
    return this.http.get<any>('http://localhost:3077/messages');
  }

  addContactMessages(contact: ProjectContact, messages: any): void {
    if(!contact.messages) contact.messages = [];
    contact.messages.push(...messages);
  }

  buildMessage(messageText, contact: ProjectContact) {
    let message = new Message(messageText, contact);
    return message;
  }
}




