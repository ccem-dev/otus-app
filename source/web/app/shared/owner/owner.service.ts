import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor() { }

  public getOwner() {
    return window.sessionStorage.getItem('ownerRn');
  }

  public setOwner(ownerRn: string) {
    window.sessionStorage.setItem('ownerRn', ownerRn);
  }
}
