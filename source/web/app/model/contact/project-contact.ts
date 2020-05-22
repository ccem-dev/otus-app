export class ProjectContact {
  _id?: string;
  objectType: string;
  sender: string;
  title: string;
  message: string;
  creationDate: Date;
  status: string;
  messages?: []

  constructor(form: any, sender: string) {
    this.objectType = 'Issue'
    this.sender = sender;
    this.title = form.title;
    this.message = form.message;
    this.creationDate = new Date();
    this.status = "OPEN";
    this.messages = [];
  }

  public fromJSON(contactJson){
    this._id = contactJson._id;
    this.objectType = contactJson.objectType;
    this.sender = contactJson.sender;
    this.title = contactJson.title;
    this.message= contactJson.message;
    this.creationDate= contactJson.creationDate;
    this.status = contactJson.status;
    this.messages = [];
  }

  public toJSON() {
    return {
      _id: this._id,
      objectType: this.objectType,
      sender: this.sender,
      title: this.title,
      message: this.message,
      creationDate: this.creationDate,
      status: this.status
    };
  }



}
