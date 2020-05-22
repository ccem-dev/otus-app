export interface ProjectContact {
  id?: string;
  objectType: string;
  sender: string;
  title: string;
  message: string;
  creationDate: Date;
  status: string;
  messages?: [];
}
