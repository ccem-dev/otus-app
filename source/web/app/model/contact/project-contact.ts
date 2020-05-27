export class ProjectContact {
  id?: string;
  objectType: string;
  sender: string;
  title: string;
  message: string;
  creationDate: Date;
  status: string;
  messages?: any


  constructor(form: any, sender: string) {
    this.id = form.id || "";
    this.objectType = 'Issue'
    this.sender = sender;
    this.title = form.title;
    this.message = form.message;
    this.creationDate = new Date();
    this.status = "OPEN";
    this.messages = new Array();
  }

  public fromJSON(contactJson){
    this.id = contactJson.id;
    this.objectType = contactJson.objectType;
    this.sender = contactJson.sender;
    this.title = contactJson.title;
    this.message= contactJson.message;
    this.creationDate= contactJson.creationDate;
    this.status = contactJson.status;
    // this.messages = [];
  }

  public toJSON() {
    return {
      id: this.id,
      objectType: this.objectType,
      sender: this.sender,
      title: this.title,
      message: this.message,
      creationDate: this.creationDate,
      status: this.status
    };
  }



}
