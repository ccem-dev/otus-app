import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ContactProjectService {

  constructor() { }

  getContactProject(){
     return ['resposta 1', 'resposta 2'];
  }

}
