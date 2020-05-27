import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ProjectContact} from '../../model/contact/project-contact';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material';

const url = 'http://localhost:3077/project-contact/';

@Injectable({providedIn: 'root'})
export class ProjectContactService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {
  };

  getProjectContacts(): Observable<ProjectContact[]> {
    return this.http.get<ProjectContact[]>(url);
  }

  createProjectContact(projectContact: ProjectContact): Observable<ProjectContact> {
    console.log(projectContact);
    return this.http.post<ProjectContact>(url, projectContact);
  }

  createAnswer(answerItem: any) {
    console.log(answerItem);
  }

  showMessage(msg: string, isError: boolean = false): void {
    this._snackBar.open(msg, '', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: isError ? ['msg-error'] : ['msg-sucess']
    });
  }


  getLastMessage(contact: ProjectContact): Observable<any> {
    return this.http.get<any>("http://localhost:3077/lastMessage");
  }

  getProjectContactMessages() : Observable<any>{
    return this.http.get<any>("http://localhost:3077/messages");
  }

  // createProjectContactMessage(ProjectContactMessage:any): Observable<any> {
  //   return null;
  // }


  addContactMessages(contact: ProjectContact, message: any) : void {
    contact.messages = []
    contact.messages.push(message)
  }
}




