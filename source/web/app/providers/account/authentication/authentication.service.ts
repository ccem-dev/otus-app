import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../../../model';
import {AccountClientService} from '../../rest/account-client.service';
import {CookieService} from 'ngx-cookie-service';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private client: AccountClientService, private cookieService: CookieService) {
    const userJSON = JSON.parse(localStorage.getItem('currentUser'));
    if (userJSON) {
      const user: User = new User();
      user.fromJSON(userJSON);
      this.currentUserSubject = new BehaviorSubject<User>(user);
    } else {
      this.currentUserSubject = new BehaviorSubject<User>(null);
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get CurrentUser(): Observable<User> {
    return this.currentUser;
  }

  public get authToken() {
    return this.cookieService.get('authToken');
  }

  login(username, password) {
    return this.client.login(username, password, (resultJson) => {
      localStorage.setItem('currentUser', JSON.stringify(resultJson.user));
      this.cookieService.set('authToken', resultJson.token);
      const user: User = new User();
      user.fromJSON(resultJson.user);
      this.currentUserSubject.next(user);
    });
  }

  logout() {
    return this.client.logout(this.currentUserValue.email, () => {
      this.clearLocalStorage();
    });
  }

  clearLocalStorage() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.cookieService.deleteAll();
    this.currentUserSubject.next(null);
  }
}
