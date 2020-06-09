import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ProjectContact} from '../../model/contact/project-contact';
import {HttpClient} from '@angular/common/http';
import {Message} from '../../model/contact/message/message';
import {ProjectContactClientService} from '../rest/project-contact-client.service';
import {ProjectContactValues} from '../../components/project-contact/project-contact-values';

@Injectable({providedIn: 'root'})
export class ProjectContactService {

  constructor(
    private http: HttpClient,
    private projectContactClientService: ProjectContactClientService) {
  };

  getProjectContacts(): Observable<ProjectContact[]> {
    return this.projectContactClientService
      .getIssues(ProjectContactValues.resources.issues);
  }

  createProjectContact(projectContact: ProjectContact): Observable<ProjectContact> {
    return this.projectContactClientService
      .createIssue(ProjectContactValues.resources.issues, projectContact);
  }

  getProjectContactMessages(projectContactId): Observable<any> {
    return this.projectContactClientService
      .getMessages(`${ProjectContactValues.resources.issues}/${projectContactId}/${ProjectContactValues.resources.messages}`);
  }

  getLastMessage(projectContactId): Observable<any> {
    return this.projectContactClientService
      .getLastMessage(`${ProjectContactValues.resources.issues}/${projectContactId}/${ProjectContactValues.resources.messages}/1`);
  }

  createMessage(projectContactId, message: Message): Observable<any> {
    return this.projectContactClientService.createMessage(`${ProjectContactValues.resources.issues}/${projectContactId}/${ProjectContactValues.resources.messages}`, message);
  }

  addLastMessage(projectContact: ProjectContact, lastMessage: Message): void {
    projectContact.messages = [];
    projectContact.messages.push(lastMessage);
  }

  buildMessage(messageText, contact: ProjectContact) {
    return new Message(messageText, contact);
  }

  getSender(messages: Message[]) {
    messages.forEach((message)=> {
      this.projectContactClientService.getSender(`${ProjectContactValues.resources.senders}/${message.sender}`)
        .subscribe((sender) => {
          message.senderInfo = {};
          message.senderInfo.objectType = sender.objectType;
          message.senderInfo.name = sender.name;
        })
    });
  }
}
