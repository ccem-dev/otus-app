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

  constructor(private http: HttpClient, private cookieService: CookieService) {
    if (this.cookieService.get(environment.API_URL)) {
      this.baseUrl = this.cookieService.get(environment.API_URL) + environment.basePath;
    } else {
      this.baseUrl = environment.baseUrl + environment.basePath;
    }
  }

  public login(email: string, password: string, setCurrentUser: CallableFunction): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${environment.loginUrl}`, {email, password})
      .pipe(map(result => {
        result.data.user = {name: result.data.name, email: result.data.email};
        setCurrentUser(result.data);
        return result.data;
      }));
  }

  public logout(email: string, clearLocalStorage: CallableFunction): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${environment.logoutUrl}`, {email: "email"})
      .pipe(map(result => {
        clearLocalStorage();
      }));
  }

  public register(email: String, password: String): Observable<any> {
    const b = new BehaviorSubject([{name: 'Adriano'}]);
    const obs = b.asObservable();
    return obs;
    // return this.http.post<any>(`${this.baseUrl}${environment.createAccountUrl}`, user)
    //   .pipe(map(result => {
    //     return result;
    //   }));
  }

  public verify(email: String, password: String): Observable<any> {
    const b = new BehaviorSubject([{name: 'Adriano'}]);
    const obs = b.asObservable();
    return obs;
    // return this.http.post<any>(`${this.baseUrl}${environment.createAccountUrl}`, user)
    //   .pipe(map(result => {
    //     return result;
    //   }));
  }
}
