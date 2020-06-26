import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseUrlResolveService} from "../base-url-resolve.service";
import {environment} from "../../../../environments/environment";
import {Report} from "../../../model/exam-results/report";

@Injectable({
  providedIn: 'root'
})
export class ExamClientService {

  constructor(private http: HttpClient, private baseUrl: BaseUrlResolveService) { }

  getReportByParticipant(ownerRn: string){
    return this.http.get<Report[]>(`${this.baseUrl.getBaseUrl()}${environment.reportBasePath}/participant/list/${ownerRn}`)
  }
  getFullReport(ownerRn: string, reportId: string){
    return this.http.get<any>(`${this.baseUrl.getBaseUrl()}${environment.reportBasePath}/participant/${ownerRn}/${reportId}`)
  }
}
