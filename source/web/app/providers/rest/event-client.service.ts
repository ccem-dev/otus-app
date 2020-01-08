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
export class EventClientService {
  baseUrl: String;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    if (this.cookieService.get(environment.API_URL)) {
      this.baseUrl = this.cookieService.get(environment.API_URL) + environment.basePath;
    } else {
      this.baseUrl = environment.baseUrl + environment.basePath;
    }
  }

  getEvents(OwnerRn: String) {
    const b = new BehaviorSubject(
      {
        data: {
          eventList: [
            {
              _id: '789',
              objectType: 'ActivityAutoFillEvent',
              activityId: 123,
              participant: 456,
              name: 'ACTIMETRIA ATIVAÇÃO',
              acronym: 'ACT',
              description: 'description',
              status: {
                objectType: 'StatusEvent',
                label: 'WAITING',
                statusDate: '2019-12-11T18:01:15.129Z'
              }
            }
          ]
        }
      }
    );
    const obs = b.asObservable();
    return obs;
    // return this.http.delete<any>(`${this.baseUrl}${environment.logoutUrl}`).subscribe(() => clearLocalStorage());
  }
}
