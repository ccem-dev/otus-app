import {ProjectContact} from '../project-contact';

export class Message {
  id?: string;
  objectType: string;
  text: string;
  sender: string;
  creationDate: Date;
  issueId: string;
  senderInfo?: any;

  constructor(text: string, contact:ProjectContact) {
    this.id = '';
    this.objectType = 'IssueMessage';
    this.text = text;
    this.sender = contact.sender;
    this.creationDate = new Date();
    this.issueId = contact.id;
  }

  toJSON() {
    return {
      id: this.id,
      objectType: this.objectType,
      text: this.text,
      sender: this.sender,
      creationDate: this.creationDate,
      issueId: this.issueId
    }
  }
}
