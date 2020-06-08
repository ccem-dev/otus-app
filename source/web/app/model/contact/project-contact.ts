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

  constructor(form: any, senderId: string) {
    this.id = form.id || "";
    this.objectType = 'Issue'
    this.sender = senderId;
    this.group = "";
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
      group: this.group,
      title: this.title,
      text: this.text,
      creationDate: this.creationDate,
      status: this.status
    };
  }
}
