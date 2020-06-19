import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class BaseUrlResolveService {

  constructor(private http: HttpClient, private cookieService: CookieService) {

  }

  getBaseUrl():string{
    if (this.cookieService.get(environment.API_URL)) {
      return this.cookieService.get(environment.API_URL);
    } else {
      return environment.baseUrl;
    }
  }
}
