import {ProjectContact} from '../project-contact';

export class Message {
  _id?: string;
  objectType: string;
  text: string;
  sender: string;
  creationDate: Date;
  issueId: string;
  senderInfo?: any;

  constructor(text: string, contact:ProjectContact) {
    this._id = '';
    this.objectType = 'IssueMessage';
    this.text = text;
    this.sender = contact.sender;
    this.creationDate = new Date();
    this.issueId = contact._id;
  }

  toJSON() {
    return {
      _id: this._id,
      objectType: this.objectType,
      text: this.text,
      sender: this.sender,
      creationDate: this.creationDate,
      issueId: this.issueId
    }
  }
}
