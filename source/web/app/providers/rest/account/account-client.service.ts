import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {BaseUrlResolveService} from '../base-url-resolve.service'
@Injectable({
  providedIn: 'root'
})
export class AccountClientService {
  MODE: String = "participant";

  constructor(private http: HttpClient, private baseUrl:BaseUrlResolveService) {
  }

  public login(email: string, password: string, setCurrentUser: CallableFunction): Observable<any> {
    return this.http.post<any>(`${this.baseUrl.getBaseUrl()}${environment.authBasePath}${environment.loginUrl}`, {email, password, mode: this.MODE})
      .pipe(map(result => {
        const resultData: Object = {user: result.data, token: result.data.token};
        setCurrentUser(resultData);
        return resultData;
      }));
  }

  public logout(email: string, clearLocalStorage: CallableFunction): Observable<any> {
    return this.http.post<any>(`${this.baseUrl.getBaseUrl()}${environment.authBasePath}${environment.logoutUrl}`, {email})
      .pipe(map(result => {
        clearLocalStorage();
      }));
  }

  public register(token: String, password: String): Observable<any> {
    return this.http.post<any>(`${this.baseUrl.getBaseUrl()}${environment.registerPasswordUrl}`, {token, password})
      .pipe(map(result => {
        return result;
      }));
  }

  public resetPassword(email: String): Observable<any>{
    return this.http.post<any>(`${this.baseUrl.getBaseUrl()}${environment.resetPassword}`, {userEmail: email})
      .pipe(map(result => result));
  }
}
