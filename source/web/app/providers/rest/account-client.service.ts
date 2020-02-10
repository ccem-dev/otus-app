import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {User} from '../../model';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AccountClientService {
  baseUrl: String;
  MODE: String = "participant";

  constructor(private http: HttpClient, private cookieService: CookieService) {
    if (this.cookieService.get(environment.API_URL)) {
      this.baseUrl = this.cookieService.get(environment.API_URL) + environment.authBasePath;
    } else {
      this.baseUrl = environment.baseUrl + environment.authBasePath;
    }
  }

  public login(email: string, password: string, setCurrentUser: CallableFunction): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${environment.loginUrl}`, {email, password, mode: this.MODE})
      .pipe(map(result => {
        const resultData: Object = {user: result.data, token: result.data.token};
        setCurrentUser(resultData);
        return resultData;
      }));
  }

  public logout(email: string, clearLocalStorage: CallableFunction): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${environment.logoutUrl}`, {email})
      .pipe(map(result => {
        clearLocalStorage();
      }));
  }

  public register(email: String, password: String): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${environment.registerPasswordUrl}`, {email, password})
      .pipe(map(result => {
        return result;
      }));
  }
}
