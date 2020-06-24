import {Form} from '@angular/forms';

export class ProjectContact {
  _id?: string;
  objectType: string;
  sender: string;
  group?: string;
  title: string;
  text: string;
  creationDate: Date;
  status: string;
  messages?: any

  constructor(form) {
    this._id = "";
    this.objectType = 'Issue'
    this.sender = "";
    this.group = "";
    this.title = form.title;
    this.text = form.text;
    this.creationDate = new Date();
    this.status = "OPEN";
    this.messages = new Array();
  }

  public toJSON() {
    return {
      _id: this._id,
      objectType: this.objectType,
      sender: this.sender,
      group: this.group,
      title: this.title,
      text: this.text,
      creationDate: this.creationDate,
      status: this.status
    };
  }
}
