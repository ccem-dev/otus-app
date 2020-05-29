import {ProjectContact} from '../project-contact';

export class Message {
  id?: string;
  objectType: string;
  text: string;
  sender: string;
  creationDate: Date;
  contactId: string;

  constructor(text: string, contact:ProjectContact) {
    this.id = '';
    this.objectType = 'IssueMessage';
    this.text = text;
    this.sender = contact.sender;
    this.creationDate = new Date();
    this.contactId = contact.id;
  }

  toJSON() {
    return {
      id: this.id,
      objectType: this.objectType,
      text: this.text,
      sender: this.sender,
      creationDate: this.creationDate,
      contactId: this.contactId
    }
  }
}
