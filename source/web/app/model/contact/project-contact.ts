export class ProjectContact {
  id?: string;
  objectType: string;
  sender: string;
  group?: string;
  title: string;
  text: string;
  creationDate: Date;
  status: string;
  messages?: any

  constructor(form: any, sender: string) {
    this.id = form.id || "";
    this.objectType = 'Issue'
    this.sender = sender;
    this.title = form.title;
    this.text = form.text;
    this.creationDate = new Date();
    this.status = "OPEN";
    this.messages = new Array();
  }

  public toJSON() {
    return {
      id: this.id,
      objectType: this.objectType,
      sender: this.sender,
      title: this.title,
      message: this.text,
      creationDate: this.creationDate,
      status: this.status
    };
  }



}
