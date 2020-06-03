import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ProjectContact} from '../../model/contact/project-contact';
import {HttpClient} from '@angular/common/http';
import {Message} from '../../model/contact/message/message';
import {ProjectContactClientService} from '../rest/project-contact-client.service';
import {projectContactValues} from '../../components/project-contact/project-contact-values';

@Injectable({providedIn: 'root'})
export class ProjectContactService {

  constructor(
    private http: HttpClient,
    private projectContactClientService: ProjectContactClientService
  ) {
  };

  getProjectContacts(): Observable<ProjectContact[]> {
    return this.projectContactClientService
      .getIssues(projectContactValues.resources.issues);
  }

  createProjectContact(projectContact: ProjectContact): Observable<ProjectContact> {
    return this.projectContactClientService
      .createIssue(projectContactValues.resources.issues, projectContact);
  }

  getProjectContactMessages(projectContactId): Observable<any> {
    return this.projectContactClientService
      .getMessages( `${projectContactValues.resources.issues}/${projectContactId}/${projectContactValues.resources.messages}`);
  }

  getLastMessage(projectContactId): Observable<any> {
    return this.projectContactClientService
      .getLastMessage(`${projectContactValues.resources.issues}/${projectContactId}/${projectContactValues.resources.messages}/1`);
  }


  createMessage(message: Message): Observable<any> {
    return this.http.post<Message>('http://localhost:3077/messages', message);
  }


  addLastMessage(contact: ProjectContact, lastMessage: any): void {
    if (!contact.messages) {
      contact.messages = [];
    }
    contact.messages.push(...lastMessage);
  }

  buildMessage(messageText, contact: ProjectContact) {
    let message = new Message(messageText, contact);
    return message;
  }
}




